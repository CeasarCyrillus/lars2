import {colDefs} from "./ReportGridModel";
import {Grid} from "../../common/components/grid/Grid";
import {withSubscribe} from "../../common/lib/withSubscribe";
import {ReportDataSource} from "../../common/services/ReportDataSource";
import {RowClickedEvent} from "ag-grid-community";
import {ReportDTO} from "@backend/dto/ReportDTO";
import {useNavigate} from "react-router-dom";
import {reportDetailsPath} from "../../common/lib/navigation/reportPaths";

const ReportGrid = withSubscribe(() => {
  const navigate = useNavigate()
  return <Grid
    dataSource={ReportDataSource}
    columnDefs={colDefs}
    prefix={"report"}
    gridOptions={{
      onRowClicked(event: RowClickedEvent<ReportDTO>) {
        if (event.data?.id !== undefined) {
          navigate(reportDetailsPath(event.data.id))
        }
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