import {AgGridReact} from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import {ColDef} from "ag-grid-community";
import {GridWrapper} from "./Grid.style";
import {TranslatedHeader, translatedHeaderProps} from "./TranslatedHeader";
import {ComponentType} from "react";
import {Box} from "@mui/material";

type GridProps<T> = {
  rows: T[]
  columnDefs: ColDef<T>[]
  prefix: string
  Toolbar: ComponentType
}

const mapColumnDef = (gridName: string) => (colDef: ColDef): ColDef => ({
  headerComponent: TranslatedHeader,
  headerComponentParams: translatedHeaderProps(gridName),
  ...colDef,
})

export const Grid = <T, >(props: GridProps<T>) => {
  const {rows, columnDefs, prefix, Toolbar} = props
  return <Box sx={{width: "100%", padding: 0, margin: 0}}>
    <Toolbar/>
    <GridWrapper>
      <AgGridReact
        autoSizeStrategy={{type: "fitGridWidth"}}
        rowData={rows}
        columnDefs={columnDefs.map(mapColumnDef(prefix))}
        className={"ag-theme-quartz"}/>
    </GridWrapper>
  </Box>
}