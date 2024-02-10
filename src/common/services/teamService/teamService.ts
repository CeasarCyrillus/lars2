import {SocketService} from "../socketService/socketService";
import {Observable} from "rxjs";
import {TeamDTO} from "@backend/dto/TeamDTO";

type TeamService = {
  allTeams$: () => Observable<TeamDTO[]>
}

type TeamServiceDependencies = {
  socketService: SocketService
}
export const createTeamService = (dependencies: TeamServiceDependencies): TeamService => {
  const {socketService} = dependencies
  return {allTeams$: socketService.allTeams$}
}