import {bind} from "@react-rxjs/core";
import {reportService} from "../../common/services/reportService/api";
import {distinctUntilChanged, map} from "rxjs";
import {teamService} from "../../common/services/teamService/api";

export const [useReportRows] = bind(() => reportService.reports$())

export const [useTeamOptions] = bind(() => teamService.teams$().pipe(
  map(teams => teams.map(team => ({value: team.id, label: team.name}))),
  distinctUntilChanged()
))