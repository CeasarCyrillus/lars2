import {bind} from "@react-rxjs/core";
import {authService} from "../services/authService/api";
import {firstValueFrom} from "rxjs";
import {LoginFormModel} from "../components/login/LoginFormModel";
import {token_key} from "../services/sessionService/sessionService";
import {sessionService} from "../services/sessionService/api";

export const login = (loginFormModel: LoginFormModel) => firstValueFrom(
  authService.login$(loginFormModel.username, loginFormModel.password)
);

export const logout = () => {
  sessionService.remove(token_key)
  window.location.reload()
}

export const [useIsAuthenticated] = bind(() => authService.isAuthenticated$())

export const useLogout = () => authService.logout
