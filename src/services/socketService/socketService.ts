import {io} from "socket.io-client";
import Config from "../../configuration.local.json"

export type MessageType = "login"
export type SocketService = {
  send: (type: MessageType, message: any) => void,
  question: (type: MessageType, message: any) => Promise<any>
}

export const createSocketService = (): SocketService => {
  const socket = io(Config.websocketURL, {autoConnect: true})
  socket.onAny(console.log)
  const question = (type: MessageType, message: any) => new Promise((resolve, reject) => {
    const listener = (response: any) => {
      if (response.result === "success") {
        resolve(response);
      } else {
        reject(response.error)
      }
    };
    socket.once(type, listener)
    socket.emit(type, message);
  })
  const send = (type: MessageType, message: any) => socket.emit(type, message);
  return {
    send,
    question
  };
}