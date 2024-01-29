import {bind} from "@react-rxjs/core";
import {distinctUntilChanged, map, scan, startWith} from "rxjs";
import {teamService} from "../../common/services/teamService/api";
import {ReportFilter} from "@backend/dto/ReportFilter";
import {createSignal, mergeWithKey} from "@react-rxjs/utils";
import {Observed} from "../../common/lib/Observed";
import {produce} from "immer";


type ReportGridState = {
  filter: ReportFilter
}

const [filterTeam$, setFilterTeam] = createSignal<number | null>()
const signals$ = mergeWithKey({
  setTeamFilter: filterTeam$,
})

type Signal = Observed<typeof signals$>

const initialState: ReportGridState = {
  filter: {
    status: {
      type: "contains",
      filter: "",
      filterType: "text"
    }
  }
}

const reportGridStateReducer = (current: ReportGridState, signal: Signal) => produce(current, (draft) => {
  switch (signal.type) {
    case "setTeamFilter":
      //draft.filter.team = signal.payload
      break;
  }
})


const reportGridState$ = signals$.pipe(
  scan(reportGridStateReducer, initialState),
  startWith(initialState),
  distinctUntilChanged()
)

export const [useTeamOptions] = bind(() => teamService.teams$().pipe(
  map(teams => teams.map(team => ({value: team.id, label: team.name}))),
  distinctUntilChanged()
))

export {setFilterTeam}