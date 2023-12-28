import {colDefs} from "./ReportGridModel";
import {useReports} from "../../common/state/reportState";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import {Grid} from "../../common/components/grid/Grid";

export const ReportGrid = () => {
  const reports = useReports()
  return <Grid rows={reports} columnDefs={colDefs}/>
}