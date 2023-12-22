import {bind} from "@react-rxjs/core";
import {useMutation} from "../lib/useMutation";
import {loginService} from "../services/loginService/api";
import {authService} from "../services/authService/api";
import {map} from "rxjs";


export const useLogin = () => useMutation(loginService.login)
export const [useIsLoggedIn] = bind(loginService.token$.pipe(
  map(token => token !== null)
))

export const [useUser] = bind(authService.user$)
