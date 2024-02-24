import {Observable} from "rxjs";
import {SocketService} from "../socketService/socketService";
import {AdminDTO} from "@backend/dto/AdminDTO";

export type UserService = {
  user$: (userId: number) => Observable<AdminDTO>
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