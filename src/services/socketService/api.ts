import {createSocketService} from "./socketService";
import {loginService} from "../loginService/api";

export const socketService = createSocketService({loginService})