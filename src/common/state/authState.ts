import {bind} from "@react-rxjs/core";
import {authService} from "../services/authService/api";
import {firstValueFrom} from "rxjs";
import {LoginFormModel} from "../components/login/LoginFormModel";

export const login = (loginFormModel: LoginFormModel) => firstValueFrom(
  authService.login$(loginFormModel.username, loginFormModel.password)
);
export const [useIsAuthenticated] = bind(() => authService.isAuthenticated$())

export const useLogout = () => authService.logout
