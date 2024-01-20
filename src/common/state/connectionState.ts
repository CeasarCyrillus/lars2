import {distinctUntilChanged, filter, map, Observable, scan, shareReplay} from "rxjs";
import {socketService} from "../services/socketService/api";
import {mergeWithKey} from "@react-rxjs/utils";
import {Observed} from "../lib/Observed";
import {produce} from "immer";
import {assertNever} from "../lib/assertNever";
import {bind} from "@react-rxjs/core";


const maxReconnectionAttempts = 4
type ConnectionStatus = "connecting" | "connected" | "re-connecting" | "re-connected" | "error" | "fatal-error"
export type ConnectionState = {
  status: ConnectionStatus
  reconnectionAttempts: number
}

type Signal = Observed<typeof signals$>
const signals$ = mergeWithKey({
  isConnected: socketService.connected$(),
  isError: socketService.connectionError$()
})

const connectionStateReducer = (current: ConnectionState, signal: Signal): ConnectionState =>
  produce(current, draft => {
      if (current.status === "fatal-error") {
        return current
      }

      const stillConnected = current.status === "connected" && signal.type === "isConnected";
      const stillError = current.status === "error" && signal.type === "isError"
      if (stillConnected || stillError) {
        return current
      }

      switch (signal.type) {
        case "isConnected":
          if (current.status === "connecting") {
            draft.status = "connected"
          } else {
            draft.status = "re-connected"
          }
          draft.reconnectionAttempts = 0
          break
        case "isError":
          if (current.status === "connecting") {
            draft.status = "fatal-error"
            break
          }

          const attempts = current.reconnectionAttempts + 1
          draft.reconnectionAttempts = attempts
          if (attempts < maxReconnectionAttempts) {
            draft.status = "re-connecting";
          } else {
            draft.status = "error";
          }

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

export const connectionState$: Observable<ConnectionState> = signals$.pipe(
  scan(connectionStateReducer, initialState),
  distinctUntilChanged(),
  shareReplay(),
)

export const [useIsConnectionError] = bind(connectionState$.pipe(
  map(state => state.status === "error")
))

const isFatalError$ = connectionState$.pipe(
  map(state => state.status === "fatal-error"),
  shareReplay({bufferSize: 1, refCount: false})
)

const isConnected$ = connectionState$.pipe(
  map(state => state.status === "connected"),
  shareReplay({bufferSize: 1, refCount: false})
)

export const [useIsFatalError] = bind(mergeWithKey({
  isFatalError: isFatalError$,
  isConnected: isConnected$.pipe(filter(Boolean))
}).pipe(
  map((status => {
    if (status.type === "isFatalError") {
      return status.payload
    }
    return false
  })),
  distinctUntilChanged(),
  shareReplay({bufferSize: 1, refCount: false})
))


export const [useIsReConnected] = bind(connectionState$.pipe(
  map(state => state.status === "re-connected"),
  distinctUntilChanged()
))

export const [useIsReConnecting] = bind(connectionState$.pipe(
  map(state => state.status === "re-connecting"),
  distinctUntilChanged()
))