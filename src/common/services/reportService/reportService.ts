import {Observable} from "rxjs";
import {SocketService} from "../socketService/socketService";
import {Report} from "../dto/Report";

export type ReportService = {
  reports$: () => Observable<Report[]>
}

type ReportServiceDependencies = {
  socketService: SocketService,
}

export const createReportService = (dependencies: ReportServiceDependencies): ReportService => {
  const {socketService} = dependencies
  const reports$ = () => socketService.listen$<Report[]>("reports")
  return {
    reports$
  }
}