import {io, ManagerOptions, Socket, SocketOptions} from "socket.io-client";
import Config from "../../../configuration.local.json"
import {fromEventPattern, map, Observable, shareReplay} from "rxjs";

import {NodeEventHandler} from "rxjs/internal/observable/fromEvent";

import {LoginDetails} from "@backend/dto/LoginDetails";
import {Authentication} from "@backend/dto/Authentication";
import {ClientToServerEvents, EventName, ServerToClientEvents} from "@backend/socket/Socket";
import {Response} from "@backend/socket/response/Response";
import {isErrorResponse} from "../response";
import {User} from "@backend/dto/User";
import {Report} from "@backend/dto/Report";
import {Team} from "@backend/dto/Team";
import {AllErrors} from "@backend/error/AllErrors";
import {handleError} from "../../state/errorState";

export type SocketService = {
  connected$: () => Observable<void>
  connectionError$: () => Observable<void>
  user$: () => Observable<User>
  validateAuthentication$: (authentication: Authentication) => Observable<boolean>
  reports$: () => Observable<Report[]>
  login$: (loginDetails: LoginDetails) => Observable<Authentication>
  teams$: () => Observable<Team[]>
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

const subscribeToEvent = (socket: Socket) => <T>(eventName: EventName): Observable<T> =>
  fromEventPattern<Response<T, AllErrors>>((handler: NodeEventHandler) => {
    socket.on(eventName, handler)
  }).pipe(
    map(response => {
      if (isErrorResponse(response)) {
        handleError(response)
        throw response.payload
      }
      return response.payload;
    }),
    shareReplay({refCount: false, bufferSize: 1}),
  )

export const createSocketService = (): SocketService => {
  const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(Config.websocketURL, ioOptions)
  const subscribeToEvent$ = subscribeToEvent(socket)
  const setSocketAuth = (auth: Authentication) => {
    socket.auth = auth;
  }
  return {
    setSocketAuthentication: setSocketAuth,
    connected$: () => subscribeToEvent$<void>("connect"),
    connectionError$: () => subscribeToEvent$("connect_error"),

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