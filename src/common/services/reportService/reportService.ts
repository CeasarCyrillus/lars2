import {Observable} from "rxjs";
import {SocketService} from "../socketService/socketService";
import {Report} from "@backend/dto/Report";

export type ReportService = {
  reports$: () => Observable<Report[]>
}

type ReportServiceDependencies = {
  socketService: SocketService,
}

export const createReportService = (dependencies: ReportServiceDependencies): ReportService => {
  const {socketService} = dependencies
  const reports$ = () => socketService.reports$()

  return {
    reports$
  }
}