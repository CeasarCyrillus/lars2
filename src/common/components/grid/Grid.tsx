import {AgGridReact} from "ag-grid-react";
import {Box} from "@chakra-ui/react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import {ColDef} from "ag-grid-community";

type GridProps<T> = {
  rows: T[]
  columnDefs: ColDef<T>[]
}
export const Grid = <T, >(props: GridProps<T>) => {
  const {rows, columnDefs} = props
  return <Box sx={{width: "100%", height: "100%"}}>
    <AgGridReact
      autoSizeStrategy={{type: "fitGridWidth"}}
      rowData={rows}
      columnDefs={columnDefs}
      className={"ag-theme-quartz"}/>
  </Box>
}