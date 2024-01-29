import {ReportDTO} from "@backend/dto/ReportDTO";
import {QueryRequest} from "@backend/socket/request/QueryRequest";
import {QueryResponse} from "@backend/socket/response/QueryResponse";
import {Observable} from "rxjs";
import {SocketService} from "../socketService/socketService";

export type ReportService = {
  reports$: (request: QueryRequest<ReportDTO>) => Observable<QueryResponse<ReportDTO[]>>
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