import {io, ManagerOptions, Socket, SocketOptions} from "socket.io-client";
import Config from "../../../configuration.local.json"
import {fromEventPattern, map, Observable, scan, shareReplay, startWith, tap} from "rxjs";
import {createSignal, mergeWithKey} from "@react-rxjs/utils";
import {Observed} from "../../lib/Observed";
import {assertNever} from "../../lib/assertNever";
import {produce} from "immer";

import {NodeEventHandler} from "rxjs/internal/observable/fromEvent";

import {LoginDetails} from "@backend/dto/LoginDetails";
import {Authentication} from "@backend/dto/Authentication";
import {User} from "@backend/dto/User";
import {Report} from "@backend/dto/Report";
import {ClientToServerEvents, EventName, ServerToClientEvents} from "@backend/socket/Socket";
import {Response} from "@backend/socket/Response";

export type SocketService = {
  connected$: () => Observable<boolean>
  connectionError$: () => Observable<boolean>
  user$: () => Observable<User>
  validateAuthentication$: (authentication: Authentication) => Observable<boolean>
  reports$: () => Observable<Report[]>
  login$: (loginDetails: LoginDetails) => Observable<Authentication>
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

export const createSocketService = (): SocketService => {
  const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(Config.websocketURL, ioOptions)

  const subscribeToEvent$ = <T>(eventName: "connect" | "connect_error" | EventName) => fromEventPattern<Response<T>>((handler: NodeEventHandler) => {
    socket.on(eventName, handler)
  }).pipe(shareReplay({bufferSize: 1, refCount: false}))

  const setAuthHeader = (auth: Authentication) => {
    socket.auth = auth;
  }
  return {
    connected$: () => {
      socket.connect()
      return subscribeToEvent$<void>("connect")
        .pipe(
          tap(() => {
            console.log("CC: CONNECTED!");
          }),
          map(() => true),
          startWith(false)
        );
    },

    connectionError$: () => subscribeToEvent$<boolean>("connect_error")
      .pipe(
        tap(console.error),
        startWith(false)
      ),


    user$: () => {
      socket.emit(userEvent)
      return subscribeToEvent$<User>(userEvent).pipe(
        map(response => response.payload)
      );
    },

    reports$: () => {
      socket.emit(reportsEvent)
      return subscribeToEvent$<Report[]>(reportsEvent).pipe(
        map(response => response.payload)
      )
    },

    validateAuthentication$: (authentication: Authentication) => {
      socket.emit(validateAuthenticationEvent, authentication)
      return subscribeToEvent$<boolean>(validateAuthenticationEvent).pipe(
        map(response => response.payload),
        tap(token => setAuthHeader(authentication))
      );
    },

    login$: (loginDetails: LoginDetails) => {
      socket.emit(loginEvent, loginDetails)
      return subscribeToEvent$<Authentication>(loginEvent).pipe(
        map(response => response.payload),
        tap((authentication) => setAuthHeader(authentication))
      )
    },
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