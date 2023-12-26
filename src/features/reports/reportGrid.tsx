import {AgGridReact} from "ag-grid-react";
import {colDefs} from "./ReportGridModel";
import {Box} from "@chakra-ui/react";
import {useReports} from "../../common/state/reportState";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

export const ReportGrid = () => {
  const reports = useReports()
  return <Box sx={{width: "100%", height: "100%"}}>
    <AgGridReact
      autoSizeStrategy={{type: "fitGridWidth"}}
      rowData={reports}
      columnDefs={colDefs}
      className={"ag-theme-quartz"}/>
  </Box>
}