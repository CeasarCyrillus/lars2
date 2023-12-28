import {SocketService} from "../socketService/socketService";
import {Observable} from "rxjs";
import {Team} from "@backend/dto/Team";

type TeamService = {
  teams$: () => Observable<Team[]>
}

type TeamServiceDependencies = {
  socketService: SocketService
}
export const createTeamService = (dependencies: TeamServiceDependencies): TeamService => {
  const {socketService} = dependencies
  const teams$ = () => socketService.teams$()
  return {teams$}
}