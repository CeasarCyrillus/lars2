import {ReportDTO} from "@backend/dto/ReportDTO";
import {ReportStatus} from "@backend/dto/ReportStatus";
import {ColDef} from "ag-grid-community";
import {ReportStatusCell, ReportStatusProp} from "./renderers";
import {TranslatedHeader, translatedHeaderProps} from "../../common/components/grid/TranslatedHeader";

const getPeriod = (period: string) => {
  const date = new Date(period)
  const month = date.getMonth() + 1
  const prefix = month < 10 ? "0" : ""
  return `${prefix}${month}/${date.getFullYear()}`
}
export type RowModel = ReportDTO

const getHeaderProps = translatedHeaderProps("report")

export const colDefs: ColDef<RowModel>[] = [
  {
    field: "status", headerName: "Status", minWidth: 130, maxWidth: 135,
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
    headerComponent: TranslatedHeader,
    headerComponentParams: getHeaderProps,
    cellRenderer: (data: { value: string }) => getPeriod(data.value),
  },
  {
    field: "team.name",
    headerComponent: TranslatedHeader,
    headerComponentParams: getHeaderProps,
    sort: "asc"
  },
  {
    field: "reporter.name",
    headerComponent: TranslatedHeader,
    headerComponentParams: getHeaderProps,
  },
  {
    field: "reporter.phone",
    headerComponent: TranslatedHeader,
    headerComponentParams: getHeaderProps,
  },
  {
    field: "reporter.email",
    headerComponent: TranslatedHeader,
    headerComponentParams: getHeaderProps
  },
  {
    field: "report_date",
    headerComponent: TranslatedHeader,
    headerComponentParams: getHeaderProps,
    cellRenderer: (data: { value: string }) => {
      const date = new Date(data.value)

      return date.toLocaleString()
    },
  }
]