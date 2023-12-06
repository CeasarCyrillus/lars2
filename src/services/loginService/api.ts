import {sessionService} from "../sessionService/api";
import {createLoginService} from "./loginService";

export const loginService = createLoginService({sessionService})