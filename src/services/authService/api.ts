import {socketService} from "../socketService/api";
import {createAuthService} from "./authService";
import {sessionService} from "../sessionService/api";

export const authService = createAuthService({socketService, sessionService})