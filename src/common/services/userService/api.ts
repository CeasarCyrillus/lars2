import {socketService} from "../socketService/api";
import {createUserService} from "./userService";

export const userService = createUserService({socketService})