import {io, ManagerOptions, Socket, SocketOptions} from "socket.io-client";
import Config from "../../../configuration.local.json"
import {fromEventPattern, map, Observable, scan, shareReplay, startWith} from "rxjs";
import {createSignal, mergeWithKey} from "@react-rxjs/utils";
import {Observed} from "../../lib/Observed";
import {assertNever} from "../../lib/assertNever";
import {produce} from "immer";

import {NodeEventHandler} from "rxjs/internal/observable/fromEvent";

import {LoginDetails} from "@backend/dto/LoginDetails";
import {Authentication} from "@backend/dto/Authentication";
import {ClientToServerEvents, EventName, ServerToClientEvents} from "@backend/socket/Socket";
import {Response} from "@backend/socket/response/Response";
import {ConnectionError} from "@backend/error/ConnectionError";
import {isErrorResponse} from "../response";
import {User} from "@backend/dto/User";
import {Report} from "@backend/dto/Report";
import {Team} from "@backend/dto/Team";
import {AllErrors} from "@backend/error/AllErrors";

export type SocketService = {
  connected$: () => Observable<"connect">
  connectionError$: () => Observable<ConnectionError>
  user$: () => Observable<User>
  validateAuthentication$: (authentication: Authentication) => Observable<boolean>
  reports$: () => Observable<Report[]>
  login$: (loginDetails: LoginDetails) => Observable<Authentication>
  teams$: () => Observable<Team[]>
  setSocketAuthentication: (authentication: Authentication) => void
}

const ioOptions: Partial<ManagerOptions & SocketOptions> = {
  closeOnBeforeunload: true,
  autoConnect: false,
  rememberUpgrade: true,
  reconnection: true,
}

const userEvent: EventName = "user"
const validateAuthenticationEvent: EventName = "validateAuthentication"
const reportsEvent: EventName = "reports"
const loginEvent: EventName = "login"
const teamsEvent: EventName = "teams"

const subscribeToEvent$2 = (socket: Socket) => <T>(eventName: EventName): Observable<T> =>
  fromEventPattern<Response<T, AllErrors>>((handler: NodeEventHandler) => {
    socket.connect()
    socket.on(eventName, handler)
  }).pipe(
    map(response => {
      if (isErrorResponse(response)) {
        throw response.payload
      }
      return response.payload;
    }),
    shareReplay({refCount: false, bufferSize: 1})
  )

export const createSocketService = (): SocketService => {
  const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(Config.websocketURL, ioOptions)
  const subscribeToEvent$ = subscribeToEvent$2(socket)
  const setSocketAuth = (auth: Authentication) => {
    socket.auth = auth;
  }
  return {
    setSocketAuthentication: setSocketAuth,
    connected$: () => {
      socket.connect()
      return subscribeToEvent$("connect").pipe(
        map(() => "connect")
      )
    },

    connectionError$: () => subscribeToEvent$("connect_error")
      .pipe(
        map(() => "connectionError")
      ),

    user$: () => {
      socket.emit(userEvent)
      return subscribeToEvent$<User>(userEvent);
    },

    reports$: () => {
      socket.emit(reportsEvent)
      return subscribeToEvent$<Report[]>(reportsEvent)
    },

    validateAuthentication$: (authentication: Authentication) => {
      socket.emit(validateAuthenticationEvent, authentication)
      return subscribeToEvent$<boolean>(validateAuthenticationEvent);
    },

    login$: (loginDetails: LoginDetails) => {
      socket.emit(loginEvent, loginDetails)
      return subscribeToEvent$<Authentication>(loginEvent)
    },

    teams$: () => {
      socket.emit(teamsEvent)
      return subscribeToEvent$<Team[]>(teamsEvent)
    }
  };
}


const maxReconnectionAttempts = 3
const [retryConnection$, retryConnection] = createSignal<void>()
const [connected$, connected] = createSignal<void>()
type ConnectionStatus = "connecting" | "connected" | "re-connecting" | "re-connected" | "error"
export type ConnectionState = {
  status: ConnectionStatus
  reconnectionAttempts: number
}


type Signal = Observed<typeof signals$>
const signals$ = mergeWithKey({
  retryConnection: retryConnection$,
  connected: connected$
})

const connectionStateReducer = (current: ConnectionState, signal: Signal): ConnectionState =>
  produce(current, draft => {
      switch (signal.type) {
        case "connected":
          draft.status = current.status !== "connecting" ?
            "re-connected" :
            "connected"
          draft.reconnectionAttempts = 0
          break
        case "retryConnection":
          const attempts = current.reconnectionAttempts + 1
          draft.reconnectionAttempts = attempts
          draft.status = attempts >= maxReconnectionAttempts ?
            "error" :
            "re-connecting";
          break
        default:
          assertNever(signal)
      }
    }
  )

const initialState: ConnectionState = {
  status: "connecting",
  reconnectionAttempts: 0
}

const connectionState$: Observable<ConnectionState> = signals$.pipe(
  scan(connectionStateReducer, initialState),
  startWith(initialState),
)