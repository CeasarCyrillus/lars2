import {ReportDTO} from "@backend/dto/ReportDTO";
import {ReportStatus} from "@backend/dto/ReportStatus";
import {ColDef} from "ag-grid-community";
import {ReportStatusCell, ReportStatusProp} from "./renderers";
import {StatusFilter} from "./filters/StatusFilter";

const getPeriod = (period: string | undefined) => {
  if (!period) {
    return null
  }
  const date = new Date(period)
  const month = date.toLocaleString('default', {month: 'short'});
  return `${month}/${date.getFullYear()}`
}
export type RowModel = ReportDTO

export const colDefs: ColDef<RowModel>[] = [
  {
    field: "status", minWidth: 180, maxWidth: 185,
    cellRenderer: ReportStatusCell,
    floatingFilter: true,
    filter: true,
    floatingFilterComponent: StatusFilter,
    floatingFilterComponentParams: {
      suppressFilterButton: true
    },

    cellRendererParams: (data: { value: ReportStatus | undefined }) => {
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
    cellRenderer: (data: { value: string | undefined }) => getPeriod(data.value),
  },
  {
    field: "team.name",
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
    cellRenderer: (data: { value: string | undefined }) => {
      if (!data.value) {
        return null
      }
      const date = new Date(data.value)

      return date.toLocaleString()
    },
  }
]