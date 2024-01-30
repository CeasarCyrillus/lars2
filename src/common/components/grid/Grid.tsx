import {AgGridReact} from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import {ColDef, GridOptions, IDatasource} from "ag-grid-community";
import {GridWrapper} from "./Grid.style";
import {TranslatedHeader, translatedHeaderProps} from "./TranslatedHeader";
import {ComponentType} from "react";
import {Box} from "@mui/material";

type GridProps<T> = {
  columnDefs: ColDef<T>[]
  prefix: string
  Toolbar: ComponentType
  dataSource: IDatasource
  gridOptions?: GridOptions<T>
}

export const Grid = <T, >(props: GridProps<T>) => {
  const {dataSource, columnDefs, prefix, Toolbar, gridOptions} = props
  return <Box sx={{width: "100%", padding: 0, margin: 0}}>
    <Toolbar/>
    <GridWrapper>
      <AgGridReact
        {...gridOptions}
        reactiveCustomComponents
        datasource={dataSource}
        rowModelType={"infinite"}
        getRowStyle={(params) => params.data === undefined ? {display: "none"} : {display: "unset"}}
        autoSizeStrategy={{type: "fitGridWidth"}}
        columnDefs={columnDefs}
        className={"ag-theme-quartz"}
        defaultColDef={{
          headerComponent: TranslatedHeader,
          headerComponentParams: translatedHeaderProps(prefix),
        }}
      />
    </GridWrapper>
  </Box>
}