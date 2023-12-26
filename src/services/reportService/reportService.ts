import {Observable, switchMap} from "rxjs";
import {SocketService} from "../socketService/socketService";
import {AuthService} from "../authService/authService";
import {ReportDTO} from "../../domain/ReportDTO";

export type Report = {
  id: number,
  teamId: number,
  period: Date,
  reporter: number,
  created: Date,
  revisions: number
}

export type ReportService = {
  reports$: () => Observable<ReportDTO[]>
}

type ReportServiceDependencies = {
  socketService: SocketService,
  authService: AuthService
}

export const createReportService = (dependencies: ReportServiceDependencies): ReportService => {
  const {socketService, authService} = dependencies
  const reports$ = () => authService.user$().pipe(
    switchMap((user) => {
      return socketService.listen$<ReportDTO[]>("reports")
    })
  )
  return {
    reports$
  }
}