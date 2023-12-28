import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import {withSubscribe} from "../../common/lib/withSubscribe";
import {Grid} from "../../common/components/grid/Grid";
import {colDefs} from "./TeamGridModel";
import {useTeams} from "../../common/state/teamState";

export const TeamGrid = withSubscribe(() => {
  const teams = useTeams()
  return <Grid rows={teams} columnDefs={colDefs}/>
})