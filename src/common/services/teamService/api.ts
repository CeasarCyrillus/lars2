import {createTeamService} from "./teamService";
import {socketService} from "../socketService/api";

export const teamService = createTeamService({socketService})