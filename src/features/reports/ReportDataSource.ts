import {ReportDTO} from "@backend/dto/ReportDTO";
import {QueryRequest} from "@backend/socket/request/QueryRequest";
import {IDatasource} from "ag-grid-community";
import {firstValueFrom} from "rxjs";
import {socketService} from "../../common/services/socketService/api";

export const ReportDataSource: IDatasource = {
  getRows: async (params) => {
    if (!params) {
      return
    }
    const queryModel: QueryRequest<ReportDTO> = {
      page: {startRow: params.startRow, endRow: params.endRow},
      filter: params.filterModel
    }
    const response = await firstValueFrom(socketService.reports$(queryModel))
    params.successCallback(response.data, response.count)
  },
}