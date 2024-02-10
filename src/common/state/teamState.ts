import {bind} from "@react-rxjs/core";
import {teamService} from "../services/teamService/api";

export const [useAllTeams] = bind(teamService.allTeams$)