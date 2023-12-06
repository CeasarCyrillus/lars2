import {Observable} from "rxjs";
import {SocketService} from "../socketService/socketService";

export type User = {
  name: string,
  email: string,
}

export type AuthService = {
  user$: () => Observable<User>
}

export type AuthServiceDependencies = {
  socketService: SocketService
}
export const createAuthService = (dependencies: AuthServiceDependencies): AuthService => {
  const {socketService} = dependencies
  const user$ = () => socketService.listen$<User>("user")
  return {
    user$,
  }
}