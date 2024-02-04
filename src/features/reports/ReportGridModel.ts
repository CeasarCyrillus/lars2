import {ReportDTO} from "@backend/dto/ReportDTO";
import {ReportStatus} from "@backend/dto/ReportStatus";
import {ColDef} from "ag-grid-community";
import {ReportStatusCellRenderer, ReportStatusProp} from "./renderers/ReportStatusCellRenderer";
import {StatusFilter} from "./filters/StatusFilter";
import {PeriodFilter} from "./filters/PeriodFilter";
import {reportPeriodValueFormatter} from "./renderers/ReportPeriodValueFormatter";

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
    cellRenderer: ReportStatusCellRenderer,
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
    filter: true,
    floatingFilter: true,
    width: 180,
    valueFormatter: reportPeriodValueFormatter,
    floatingFilterComponent: PeriodFilter,
    floatingFilterComponentParams: {
      suppressFilterButton: true
    }
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