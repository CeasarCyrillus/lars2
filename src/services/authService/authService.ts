import {Observable} from "rxjs";
import {SocketService} from "../socketService/socketService";
import {createSignal} from "@react-rxjs/utils";
import {startWith} from "rxjs/operators";

export type User = {
  name: string,
  email: string,
  jwt: string
}

export type AuthService = {
  login: (email: string, password: string) => Promise<void>
  user$: Observable<User | null>
}

export type AuthServiceDependencies = {
  socketService: SocketService
}
export const createAuthService = (dependencies: AuthServiceDependencies): AuthService => {
  const {socketService} = dependencies
  const [user$, setUser] = createSignal<User>()
  const login = async (email: string, password: string) => {
    const user = await socketService.question("login", {email, password});
    setUser(user)
  }
  return {
    login,
    user$: user$.pipe(
      startWith(null)
    ),
  }
}