import {Observable} from "rxjs";
import {SocketService} from "../socketService/socketService";
import {UserDTO} from "@backend/dto/UserDTO";

export type UserService = {
  user$: (userId: number) => Observable<UserDTO>
}

export type UserServiceDependencies = {
  socketService: SocketService,
}
export const createUserService = (dependencies: UserServiceDependencies): UserService => {
  const {socketService} = dependencies
  return {
    user$: socketService.user$
  }
}