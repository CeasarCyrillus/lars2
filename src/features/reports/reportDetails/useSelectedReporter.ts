import {getId} from "../../../common/lib/useId";
import {Path} from "../../../common/lib/navigation";
import {useReportDetails} from "../../../common/state/reportDetailsState";

const useReportId = getId(Path.Reports)
export const useSelectedReport = () => {
  const reportId = useReportId()
  return useReportDetails(reportId)
}