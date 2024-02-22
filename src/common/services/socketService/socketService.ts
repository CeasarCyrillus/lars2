import {io, ManagerOptions, Socket, SocketOptions} from "socket.io-client";
import Config from "../../../configuration.local.json"
import {filter, fromEventPattern, map, Observable} from "rxjs";

import {NodeEventHandler} from "rxjs/internal/observable/fromEvent";

import {LoginDetails} from "@backend/dto/LoginDetails";
import {Authentication} from "@backend/dto/Authentication";
import {ClientToServerEvents, EventName, ServerToClientEvents} from "@backend/socket/Socket";
import {Response, SuccessResponse} from "@backend/socket/response/Response";
import {isErrorResponse} from "../response";
import {TeamDTO} from "@backend/dto/TeamDTO";
import {AllErrors} from "@backend/error/AllErrors";
import {handleError} from "../../state/errorState";
import {QueryModel} from "@backend/socket/request/QueryModel";
import {ReportDTO} from "@backend/dto/ReportDTO";
import {QueryResponse} from "@backend/socket/response/QueryResponse";
import {uid} from "uid/single";
import {ReportFilter} from "@backend/dto/filter/ReportFilter";
import {ReportDetailsDTO} from "@backend/dto/ReportDetailsDTO";
import {IdRequestPayload} from "@backend/socket/request/IdRequestPayload";
import {UserDTO} from "@backend/dto/UserDTO";

export type SocketService = {
  connected$: () => Observable<void>
  connectionError$: () => Observable<void>
  validateAuthentication$: (authentication: Authentication) => Observable<boolean>
  reports$: (filter: QueryModel<ReportFilter>) => Observable<QueryResponse<ReportDTO[]>>
  login$: (loginDetails: LoginDetails) => Observable<Authentication>
  allTeams$: () => Observable<TeamDTO[]>
  setSocketAuthentication: (authentication: Authentication) => void
  reportDetails$: (reportId: number) => Observable<ReportDetailsDTO>;
  user$: (userId: number) => Observable<UserDTO>
}

const ioOptions: Partial<ManagerOptions & SocketOptions> = {
  closeOnBeforeunload: true,
  autoConnect: true,
  rememberUpgrade: true,
  reconnection: true,
}

const subscribeToEvent = (socket: Socket) => <T>(eventName: EventName): Observable<SuccessResponse<T>> =>
  fromEventPattern<Response<T, AllErrors>>((handler: NodeEventHandler) => {
    socket.on(eventName, handler)
  }).pipe(
    map(response => {
      if (isErrorResponse(response)) {
        handleError(response)
        return
      }
      return response;
    }),
    filter(Boolean),
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

    reports$: (reportQuery) => {
      const request = withTrace(reportQuery)
      socket.emit("getReports", request)
      return subscribeToEvent$<QueryResponse<ReportDTO[]>>("getReports").pipe(
        filter(response => response.trace === request.trace),
        map(response => response.payload)
      )
    },

    reportDetails$: (reportId: number) => {
      const request = withTrace<IdRequestPayload>({id: reportId})
      socket.emit("getReportDetails", request)
      return subscribeToEvent$<ReportDetailsDTO>("getReportDetails").pipe(map(r => r.payload))
    },

    validateAuthentication$: (authentication: Authentication) => {
      const request = withTrace(authentication)
      socket.emit("validateAuthentication", request)
      return subscribeToEvent$<boolean>("validateAuthentication").pipe(map(r => r.payload));
    },

    login$: (loginDetails: LoginDetails) => {
      const request = withTrace(loginDetails)
      socket.emit("login", request)
      return subscribeToEvent$<Authentication>("login").pipe(map(r => r.payload));
    },

    allTeams$: () => {
      socket.emit("getAllTeams", withTrace(undefined))
      return subscribeToEvent$<TeamDTO[]>("getAllTeams").pipe(map(r => r.payload));
    },

    user$: (userId: number) => {
      socket.emit("getUser", withTrace({id: userId}))
      return subscribeToEvent$<UserDTO>("getUser").pipe(map(r => r.payload))
    }
  };
}