import {Observable, switchMap, tap} from "rxjs";
import {SocketService} from "../socketService/socketService";
import {AuthService} from "../authService/authService";

export type Report = {
  id: number,
  teamId: number,
  period: Date,
  reporter: number,
  created: Date,
  revisions: number
}

export type ReportService = {
  reports$: () => Observable<Report[]>
}

type ReportServiceDependencies = {
  socketService: SocketService,
  authService: AuthService
}

export const createReportService = (dependencies: ReportServiceDependencies): ReportService => {
  const {socketService, authService} = dependencies
  const reports$ = () => authService.user$().pipe(
    tap((user) => {
      console.log("CC: user!!!", user)
    }),
    switchMap((user) => {
      return socketService.listen$<Report[]>("reports")
    })
  )
  return {
    reports$
  }
}