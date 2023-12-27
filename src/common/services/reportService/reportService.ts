import {Observable} from "rxjs";
import {SocketService} from "../socketService/socketService";
import {Report} from "../../../../../lars2_backend/src/sharedTypes/dto/Report";

export type ReportService = {
  reports$: () => Observable<Report[]>
}

type ReportServiceDependencies = {
  socketService: SocketService,
}

export const createReportService = (dependencies: ReportServiceDependencies): ReportService => {
  const {socketService} = dependencies
  return {
    reports$: socketService.reports$
  }
}