import {Observable} from "rxjs";
import {SocketService} from "../socketService/socketService";
import {ReportDTO} from "@backend/dto/ReportDTO";

export type ReportService = {
  reports$: () => Observable<ReportDTO[]>
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