import {SocketService} from "../socketService/socketService";
import {Observable} from "rxjs";
import {TeamDTO} from "@backend/dto/TeamDTO";

type TeamService = {
  teams$: () => Observable<TeamDTO[]>
}

type TeamServiceDependencies = {
  socketService: SocketService
}
export const createTeamService = (dependencies: TeamServiceDependencies): TeamService => {
  const {socketService} = dependencies
  const teams$ = () => socketService.teams$()
  return {teams$}
}