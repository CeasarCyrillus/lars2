import {colDefs} from "./ReportGridModel";
import {Grid} from "../../common/components/grid/Grid";
import {Box, styled} from "@mui/material";
import {withSubscribe} from "../../common/lib/withSubscribe";
import {ReportDataSource} from "./ReportDataSource";

const GridToolbarWrapper = styled(Box)(({theme}) => ({
  width: "100%",
  padding: "20px",
  display: "flex",
  gap: "10px",
}))

export const ReportGrid = withSubscribe(() => {
  return <Grid dataSource={ReportDataSource} columnDefs={colDefs} prefix={"report"} Toolbar={() => <></>}/>
})