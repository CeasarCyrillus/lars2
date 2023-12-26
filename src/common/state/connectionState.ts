import {distinctUntilChanged, first, map, pairwise} from "rxjs";
import {bind} from "@react-rxjs/core";
import {socketService} from "../services/socketService/api";


export const [useIsReconnecting] = bind(socketService.connectionState$.pipe(
  map(state => state.status === "re-connecting"),
  distinctUntilChanged()
))

export const [useIsReconnected] = bind(socketService.connectionState$.pipe(
  map(state => state.status === "re-connected"),
  distinctUntilChanged()
))

export const [useIsConnectionError] = bind(socketService.connectionState$.pipe(
  map(state => state.status === "error"),
  distinctUntilChanged()
))

export const [useHasFailedInitialConnection] = bind(socketService.connectionState$.pipe(
  map(state => state.status),
  pairwise(),
  first(),
  map(([firstStatus, nextStatus]) => firstStatus === "connecting" && nextStatus !== "connected")
))