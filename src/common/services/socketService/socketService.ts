import {io, ManagerOptions, SocketOptions} from "socket.io-client";
import Config from "../../../configuration.local.json"
import {Observable, scan, startWith, Subject, tap} from "rxjs";
import {AuthHeader} from "../dto/AuthHeader";
import {createSignal, mergeWithKey} from "@react-rxjs/utils";
import {Observed} from "../../lib/Observed";
import {assertNever} from "../../lib/assertNever";
import {produce} from "immer";

export const Success = "Success"
export const Failure = "Failure"
export type Response<T> = {
  status: typeof Success | typeof Failure
  message?: T
}

export type MessageType = "user" | "connection" | "validateAuthentication" | "reports" | "login"
export const isSuccess = <T>(response: Response<T>) => response.status === Success

export type SocketService = {
  listen$: <T>(type: MessageType, message?: any) => Observable<T>
  setAuthHeader: (auth: AuthHeader) => void
  connectionState$: Observable<ConnectionState>
}

const ioOptions: Partial<ManagerOptions & SocketOptions> = {
  closeOnBeforeunload: true,
  autoConnect: false,
  rememberUpgrade: true,
  reconnection: true,
}


export const createSocketService = (): SocketService => {
  const socket = io(Config.websocketURL, ioOptions)
  const onError = () => {
    retryConnection()
  }

  const onConnect = () => {
    connected()
  }

  socket.on("connect", onConnect)
  socket.on('connect_error', onError)

  const setAuthHeader = (auth: AuthHeader) => {
    socket.auth = auth;
  }

  const listen$ = <T>(type: MessageType, request: any) => {
    const subject$ = new Subject<T>()
    console.log(`request "${type}"`, request, "with auth:", socket.auth ?? "NONE")
    const listener = (response: Response<T>) => {
      console.log(`response "${type}"`, response.message ?? "NONE")
      if (isSuccess(response) && response.message !== undefined) {
        subject$.next(response.message)
      } else {
        subject$.error(response.message)
      }
    };

    socket.on(type, listener)
    socket.emit(type, request)
    return subject$
  }

  return {
    listen$,
    setAuthHeader,
    connectionState$:
      connectionState$.pipe(
        tap(() => socket.connect())
      )
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