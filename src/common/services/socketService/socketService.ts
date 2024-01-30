import {io, ManagerOptions, Socket, SocketOptions} from "socket.io-client";
import Config from "../../../configuration.local.json"
import {filter, fromEventPattern, map, Observable, shareReplay} from "rxjs";

import {NodeEventHandler} from "rxjs/internal/observable/fromEvent";

import {LoginDetails} from "@backend/dto/LoginDetails";
import {Authentication} from "@backend/dto/Authentication";
import {ClientToServerEvents, EventName, ServerToClientEvents} from "@backend/socket/Socket";
import {Response, SuccessResponse} from "@backend/socket/response/Response";
import {isErrorResponse} from "../response";
import {TeamDTO} from "@backend/dto/TeamDTO";
import {AllErrors} from "@backend/error/AllErrors";
import {handleError} from "../../state/errorState";
import {AdminDTO} from "@backend/dto/AdminDTO";
import {QueryRequest} from "@backend/socket/request/QueryRequest";
import {ReportDTO} from "@backend/dto/ReportDTO";
import {QueryResponse} from "@backend/socket/response/QueryResponse";
import {uid} from "uid/single";

export type SocketService = {
  connected$: () => Observable<void>
  connectionError$: () => Observable<void>
  user$: () => Observable<AdminDTO>
  validateAuthentication$: (authentication: Authentication) => Observable<boolean>
  reports$: (filter: QueryRequest<ReportDTO>) => Observable<QueryResponse<ReportDTO[]>>
  login$: (loginDetails: LoginDetails) => Observable<Authentication>
  teams$: () => Observable<TeamDTO[]>
  setSocketAuthentication: (authentication: Authentication) => void
}

const ioOptions: Partial<ManagerOptions & SocketOptions> = {
  closeOnBeforeunload: true,
  autoConnect: true,
  rememberUpgrade: true,
  reconnection: true,
}

const userEvent: EventName = "user"
const validateAuthenticationEvent: EventName = "validateAuthentication"
const reportsEvent: EventName = "reports"
const loginEvent: EventName = "login"
const teamsEvent: EventName = "teams"

const subscribeToEvent = (socket: Socket) => <T>(eventName: EventName): Observable<SuccessResponse<T>> =>
  fromEventPattern<Response<T, AllErrors>>((handler: NodeEventHandler) => {
    socket.on(eventName, handler)
  }).pipe(
    map(response => {
      if (isErrorResponse(response)) {
        handleError(response)
        throw response.payload
      }
      return response;
    }),
    shareReplay({refCount: false, bufferSize: 1}),
  )

const withTrace = <T>(payload: T) => ({
  trace: uid(),
  payload
})

export const createSocketService = (): SocketService => {
  const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(Config.websocketURL, ioOptions)
  const subscribeToEvent$ = subscribeToEvent(socket)
  const setSocketAuth = (auth: Authentication) => {
    socket.auth = auth;
  }
  return {
    setSocketAuthentication: setSocketAuth,
    connected$: () => subscribeToEvent$<void>("connect").pipe(map(r => r.payload)),
    connectionError$: () => subscribeToEvent$<void>("connect_error").pipe(map(r => r.payload)),

    user$: () => {
      socket.emit(userEvent)
      return subscribeToEvent$<AdminDTO>(userEvent).pipe(map(r => r.payload));
    },

    reports$: (reportQuery) => {
      const request = withTrace(reportQuery)
      socket.emit(reportsEvent, request)
      return subscribeToEvent$<QueryResponse<ReportDTO[]>>(reportsEvent).pipe(
        filter(response => response.trace === request.trace),
        map(response => response.payload)
      )
    },

    validateAuthentication$: (authentication: Authentication) => {
      const request = withTrace(authentication)
      socket.emit(validateAuthenticationEvent, request)
      return subscribeToEvent$<boolean>(validateAuthenticationEvent).pipe(map(r => r.payload));
    },

    login$: (loginDetails: LoginDetails) => {
      const request = withTrace(loginDetails)
      socket.emit(loginEvent, request)
      return subscribeToEvent$<Authentication>(loginEvent).pipe(map(r => r.payload));
    },

    teams$: () => {
      socket.emit(teamsEvent)
      return subscribeToEvent$<TeamDTO[]>(teamsEvent).pipe(map(r => r.payload));
    }
  };
}