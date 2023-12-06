import {bind} from "@react-rxjs/core";
import {useMutation} from "../lib/useMutation";
import {loginService} from "../services/loginService/api";
import {map} from "rxjs";
import {authService} from "../services/authService/api";


export const useLogin = () => useMutation(loginService.login)

export const [useIsAuthenticated] = bind(loginService.token$.pipe(
  map(token => token !== null)
))

export const [useUser] = bind(() => authService.user$())


/**
 export const withAuth = async <TParams extends any[], TReturns>(func: (jwt: string, ...params: TParams) => TReturns) => {
  const jwt = await firstValueFrom(jwt$())
  return (...args: TParams): TReturns => func(jwt, ...args);
}; **/