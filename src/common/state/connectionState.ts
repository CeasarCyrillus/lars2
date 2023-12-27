import {map, merge, pairwise, tap} from "rxjs";
import {bind} from "@react-rxjs/core";
import {socketService} from "../services/socketService/api";


export const [useIsReconnecting] = bind(
  merge(socketService.connected$(), socketService.connectionError$()).pipe(
    pairwise(),
    map(([first, second]) => first && second)
  ))

export const [useIsReconnected] = bind(
  merge(socketService.connected$(), socketService.connectionError$()).pipe(
    pairwise(),
    map(([first, second]) => second && !first)
  ))

export const [useIsConnectionError] = bind(socketService.connectionError$())

export const [useHasFailedInitialConnection] = bind(merge(socketService.connectionError$(), socketService.connected$()).pipe(
  tap((x) => console.log("CC: here", x)),
  pairwise(),
  map(([first, second]) => first && second)
))