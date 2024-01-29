import {AgGridReact} from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import {ColDef, IDatasource} from "ag-grid-community";
import {GridWrapper} from "./Grid.style";
import {TranslatedHeader, translatedHeaderProps} from "./TranslatedHeader";
import {ComponentType} from "react";
import {Box} from "@mui/material";

type GridProps<T> = {
  columnDefs: ColDef<T>[]
  prefix: string
  Toolbar: ComponentType
  dataSource: IDatasource
}

export const Grid = <T, >(props: GridProps<T>) => {
  const {dataSource, columnDefs, prefix, Toolbar} = props
  return <Box sx={{width: "100%", padding: 0, margin: 0}}>
    <Toolbar/>
    <GridWrapper>
      <AgGridReact
        reactiveCustomComponents
        datasource={dataSource}
        rowModelType={"infinite"}
        getRowStyle={(params) => params.data === undefined ? {display: "none"} : {display: "unset"}}
        autoSizeStrategy={{type: "fitGridWidth"}}
        columnDefs={columnDefs}
        className={"ag-theme-quartz"}
        defaultColDef={{
          flex: 1,
          minWidth: 100,
          filter: true,
          floatingFilter: true,
          filterParams: {
            debounceMs: 0
          },
          headerComponent: TranslatedHeader,
          headerComponentParams: translatedHeaderProps(prefix),
        }}
      />
    </GridWrapper>
  </Box>
}