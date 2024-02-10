import {ReportFilter} from "@backend/dto/filter/ReportFilter";
import {ReportDTO} from "@backend/dto/ReportDTO";
import {QueryModel} from "@backend/socket/request/QueryModel";
import {QueryResponse} from "@backend/socket/response/QueryResponse";
import {Observable} from "rxjs";
import {SocketService} from "../socketService/socketService";

export type ReportService = {
  reports$: (query: QueryModel<ReportFilter>) => Observable<QueryResponse<ReportDTO[]>>
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