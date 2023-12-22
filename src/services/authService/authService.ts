import {Observable} from "rxjs";
import {SocketService} from "../socketService/socketService";

export type User = {
  name: string,
  email: string,
}

export type AuthService = {
  user$: () => Observable<User>
  isAuthenticated$: () => Observable<boolean>
}

export type AuthServiceDependencies = {
  socketService: SocketService
}
export const createAuthService = (dependencies: AuthServiceDependencies): AuthService => {
  const {socketService} = dependencies

  const isAuthenticated$ = () => socketService.listen$<boolean>("authentication")
  const user$ = () => socketService.listen$<User>("user")

  return {
    user$,
    isAuthenticated$
  }
}