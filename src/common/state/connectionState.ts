import {map, Observable, scan, shareReplay, startWith} from "rxjs";
import {socketService} from "../services/socketService/api";
import {mergeWithKey} from "@react-rxjs/utils";
import {Observed} from "../lib/Observed";
import {produce} from "immer";
import {assertNever} from "../lib/assertNever";
import {bind} from "@react-rxjs/core";


const maxReconnectionAttempts = 4
type ConnectionStatus = "connecting" | "connected" | "re-connecting" | "re-connected" | "error"
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
      switch (signal.type) {
        case "isConnected":
          draft.status = current.status !== "connecting" ?
            "re-connected" :
            "connected"
          draft.reconnectionAttempts = 0
          break
        case "isError":
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
  shareReplay(),
)

export const [useIsConnectionError] = bind(connectionState$.pipe(
  map(state => state.status === "error")
))

export const [useIsConnected] = bind(connectionState$.pipe(
  map(state => state.status === "connected")
))

export const [useIsReConnected] = bind(connectionState$.pipe(
  map(state => state.status === "re-connected")
))

export const [useIsReConnecting] = bind(connectionState$.pipe(
  map(state => state.status === "re-connecting")
))