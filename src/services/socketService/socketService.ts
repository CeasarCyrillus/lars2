import {io, ManagerOptions, SocketOptions} from "socket.io-client";
import Config from "../../configuration.local.json"
import {Observable, scan, startWith, Subject, tap} from "rxjs";
import {handleError} from "../../state/errorState";
import {AuthHeader} from "../../sharedTypes/AuthHeader";
import {createSignal, mergeWithKey} from "@react-rxjs/utils";
import {Observed} from "../../state/Observed";
import {assertNever} from "../../state/assertNever";

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
  socket.onAny(console.log)
  const onError = () => {
    console.log("CC: connect error!")
    retryConnection()
  }

  const onConnect = () => {
    console.log("CC: connected!!")
    connected()
  }

  socket.on("connect", onConnect)
  socket.on('connect_error', onError)

  const setAuthHeader = (auth: AuthHeader) => {
    socket.auth = auth;
  }

  const listen$ = <T>(type: MessageType, request: any) => {
    const subject$ = new Subject<T>()
    console.log(`CC: request "${type}"`, request, "with auth:", socket.auth)
    const listener = (response: Response<T>) => {
      console.log(`CC: response "${type}"`, response.message)
      if (isSuccess(response) && response.message !== undefined) {
        subject$.next(response.message)
      } else {
        handleError(response)
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

// TODO: use immer
const connectionStateReducer = (current: ConnectionState, signal: Signal): ConnectionState => {
  switch (signal.type) {
    case "connected":
      if (current.status !== "connecting") {
        return {
          status: "re-connected",
          reconnectionAttempts: 0
        }
      }
      return {
        status: "connected",
        reconnectionAttempts: 0
      }
    case "retryConnection":
      const attempt = current.reconnectionAttempts + 1
      if (attempt >= maxReconnectionAttempts) {
        return {
          status: "error",
          reconnectionAttempts: attempt
        }
      }
      return {
        status: "re-connecting",
        reconnectionAttempts: current.reconnectionAttempts + 1
      }
    default:
      assertNever(signal)
  }

  return initialState
}

const initialState: ConnectionState = {
  status: "connecting",
  reconnectionAttempts: 0
}

const connectionState$: Observable<ConnectionState> = signals$.pipe(
  scan(connectionStateReducer, initialState),
  startWith(initialState),
  tap((state) => console.log("CC: state is", state.status))
)