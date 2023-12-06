import {io} from "socket.io-client";
import Config from "../../configuration.local.json"
import {LoginService} from "../loginService/loginService";
import {filter, firstValueFrom, Observable} from "rxjs";
import {createSignal} from "@react-rxjs/utils";

export type MessageType = "user"
export type SocketService = {
  send: (type: MessageType, message: any) => void,
  listen$: <T>(type: MessageType, message?: any) => Observable<T>
}

type SocketServiceDependencies = {
  loginService: LoginService
}

export const createSocketService = (dependencies: SocketServiceDependencies): SocketService => {
  const {loginService} = dependencies
  const socket = io(Config.websocketURL, {autoConnect: false})

  socket.onAny(console.log)
  const listen$ = <T>(type: MessageType, message: any) => {
    const [signal$, setSignal] = createSignal<T>()
    const listener = (response: any) => {
      if (response.result === "success") {
        setSignal(response.data)
      } else {
        setSignal(response.error) // TODO: throw
      }
    };
    socket.on(type, listener)
    send(type, message);
    return signal$
  }

  const send = async (type: MessageType, message: any) => {
    if (!socket.connected) {
      const token = await firstValueFrom(loginService.token$.pipe(
        filter(Boolean))
      )
      socket.auth = {token}
      socket.connect()
    }
    return socket.emit(type, message);
  };

  return {
    send,
    listen$
  };
}