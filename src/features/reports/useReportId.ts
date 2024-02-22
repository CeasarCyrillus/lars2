import {useNavigate, useParams} from "react-router-dom";
import {paths} from "../../common/lib/navigation/navigation";

export const useReportId = () => {
  const params = useParams();
  const navigate = useNavigate()
  if (params.reportId === undefined || isNaN(parseInt(params.reportId))) {
    navigate(paths.reports.root)
    throw new Error("Report id is not number!")
  }

  return parseInt(params.reportId)
}