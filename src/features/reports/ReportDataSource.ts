import {IDatasource} from "ag-grid-community";
import {firstValueFrom} from "rxjs";
import {socketService} from "../../common/services/socketService/api";
import {QueryModel} from "@backend/socket/request/QueryModel"
import {ReportFilter} from "@backend/dto/filter/ReportFilter";

export const ReportDataSource: IDatasource = {
  getRows: async (params) => {
    if (!params) {
      return
    }
    const queryModel: QueryModel<ReportFilter> = {
      page: {startRow: params.startRow, endRow: params.endRow},
      filter: params.filterModel
    }
    const response = await firstValueFrom(socketService.reports$(queryModel))
    params.successCallback(response.data, response.count)
  },
}