import {socketService} from "../socketService/api";
import {createAuthService} from "./authService";

export const authService = createAuthService({socketService})