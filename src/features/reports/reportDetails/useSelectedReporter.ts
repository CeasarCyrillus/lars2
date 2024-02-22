import {useReportDetails} from "../../../common/state/reportDetailsState";
import {useReportId} from "../useReportId";

export const useSelectedReport = () => {
  const reportId = useReportId()
  return useReportDetails(reportId)
}