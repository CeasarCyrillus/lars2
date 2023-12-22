import {io} from "socket.io-client";
import Config from "../../configuration.local.json"
import {LoginService} from "../loginService/loginService";
import {filter, firstValueFrom, Observable, shareReplay} from "rxjs";
import {createSignal} from "@react-rxjs/utils";
import {handleError, unknownFatalError} from "../../state/errorState";

export const Success = "Success"
export const Failure = "Failure"
export type Response<T> = {
  status: typeof Success | typeof Failure
  message?: T
}

export type MessageType = "user" | "connection" | "authentication" | "reports"
export const isSuccess = <T>(response: Response<T>) => response.status === Success

export type SocketService = {
  send: (type: MessageType, message: any) => void,
  listen$: <T>(type: MessageType, message?: any) => Observable<T>
  isConnected$: Observable<boolean>
}

type SocketServiceDependencies = {
  loginService: LoginService
}

export const createSocketService = (dependencies: SocketServiceDependencies): SocketService => {
  const {loginService} = dependencies
  const socket = io(Config.websocketURL, {autoConnect: true})
  const handleConnectionError = (err?: Error) => {
    handleError(unknownFatalError);
    console.log("CC: not connected", err)
    setIsConnected(false)
  }
  const [isConnected$, setIsConnected] = createSignal<boolean>()
  socket.on('connect_error', handleConnectionError)
  socket.on('connect_failed', handleConnectionError)
  socket.on("connect", () => setIsConnected(true))

  const listen$ = <T>(type: MessageType, message: any) => {
    const [signal$, setSignal] = createSignal<T>()
    const listener = (response: any) => {
      console.log(`CC: response "${type}"`, response.message)
      if (isSuccess(response)) {
        console.log("CC: is success", type)
        setSignal(response.message)
      } else {
        console.log("CC: is error", type)
        handleError(response.message)
      }
    };
    socket.on(type, listener)
    send(type, message);
    return signal$.pipe(shareReplay({bufferSize: 1, refCount: false}))
  }

  const send = async (type: MessageType, message: any) => {
    const token = await firstValueFrom(loginService.token$.pipe(
      filter(Boolean))
    )
    return socket.emit(type, {token, message});
  };

  return {
    send,
    listen$,
    isConnected$
  };
}