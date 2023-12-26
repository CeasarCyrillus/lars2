import {bind} from "@react-rxjs/core";
import {useMutation} from "../lib/useMutation";
import {authService} from "../services/authService/api";
import {firstValueFrom} from "rxjs";

export const useLogin = () => useMutation((username: string, password: string) => firstValueFrom(authService.login$(username, password)))
export const [useUser] = bind(authService.user$)
export const [useIsAuthenticated, isAuthenticated$] = bind(authService.isAuthenticated$)
