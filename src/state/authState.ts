import {authService} from "../services/authService/api";
import {bind} from "@react-rxjs/core";
import {map} from "rxjs/operators";
import {useMutation} from "../lib/useMutation";


export const useLogin = () => useMutation(authService.login)

export const [useIsAuthenticated] = bind(() => authService.user$
  .pipe(map(user => user !== null))
)