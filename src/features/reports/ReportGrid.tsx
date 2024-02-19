import {colDefs} from "./ReportGridModel";
import {Grid} from "../../common/components/grid/Grid";
import {withSubscribe} from "../../common/lib/withSubscribe";
import {ReportDataSource} from "./ReportDataSource";
import {RowClickedEvent} from "ag-grid-community";
import {ReportDTO} from "@backend/dto/ReportDTO";

const ReportGrid = withSubscribe(() => {
  return <Grid
    dataSource={ReportDataSource}
    columnDefs={colDefs}
    prefix={"report"}
    gridOptions={{
      onRowClicked(event: RowClickedEvent<ReportDTO>) {
        console.log("CC: row", event.data)
      },
      floatingFiltersHeight: 120,
      rowStyle: {"cursor": "pointer"},
      suppressCellFocus: true,
      defaultColDef: {
        floatingFilter: false,
        filterParams: {
          debounceMs: 0
        },
      }
    }}
  />
})

export default ReportGrid