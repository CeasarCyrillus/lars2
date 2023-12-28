import {bind} from "@react-rxjs/core";
import {teamService} from "../services/teamService/api";

// TODO: this might be specific for PROVA and not for LARS
export const [useTeams] = bind(() => teamService.teams$())