import {ReportDTO} from "@backend/dto/ReportDTO";
import {ReportStatus} from "@backend/dto/ReportStatus";
import {ColDef} from "ag-grid-community";
import {ReportStatusCell, ReportStatusProp} from "./renderers";

const getPeriod = (period: string) => {
  const date = new Date(period)
  const month = date.toLocaleString('default', {month: 'short'});
  return `${month}/${date.getFullYear()}`
}
export type RowModel = ReportDTO

export const colDefs: ColDef<RowModel>[] = [
  {
    field: "status", minWidth: 130, maxWidth: 135,
    cellRenderer: ReportStatusCell,
    cellRendererParams: (data: { value: ReportStatus }) => {
      const props: ReportStatusProp = {
        status: data.value
      }
      return props
    }
  },
  {
    field: "period",
    minWidth: 130,
    maxWidth: 135,
    cellRenderer: (data: { value: string }) => getPeriod(data.value),
  },
  {
    field: "team.name",
    sort: "asc"
  },
  {
    field: "reporter.name",
  },
  {
    field: "reporter.phone",
  },
  {
    field: "reporter.email",
  },
  {
    field: "report_date",
    cellRenderer: (data: { value: string }) => {
      const date = new Date(data.value)

      return date.toLocaleString()
    },
  }
]