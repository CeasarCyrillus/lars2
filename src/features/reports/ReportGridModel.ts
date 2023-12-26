import {ColDef, Column} from "ag-grid-community";
import {Report} from "../../common/services/dto/Report";
import {ReportStatusCell, ReportStatusProp, TranslatedHeader, TranslatedHeaderProps} from "./renderers";
import {ReportStatus} from "../../common/services/dto/ReportStatus";

const getPeriod = (period: string) => {
  const date = new Date(period)
  const month = date.getMonth() + 1
  const prefix = month < 10 ? "0" : ""
  return `${prefix}${month}/${date.getFullYear()}`
}
export type RowModel = Report

let translatedHeaderProps = (params: { column: Column }): TranslatedHeaderProps => {
  const field = params.column.getColDef().field
  if (!field) {
    throw new Error("Field definition not found!")
  }
  return {prefix: "reportGridHeader", translationKey: field}
};
export const colDefs: ColDef<RowModel>[] = [
  {
    field: "status", headerName: "Status", maxWidth: 125,
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
    headerComponentParams: translatedHeaderProps,
    cellRenderer: (data: { value: string }) => getPeriod(data.value)
  },
  {
    field: "teamName",
    headerComponent: TranslatedHeader,
    headerComponentParams: translatedHeaderProps
  },
  {
    field: "reporter.name",
    headerComponent: TranslatedHeader,
    headerComponentParams: translatedHeaderProps,
  },
  {
    field: "reporter.phone",
    headerComponent: TranslatedHeader,
    headerComponentParams: translatedHeaderProps,
  },
  {
    field: "reporter.email",
    headerComponent: TranslatedHeader,
    headerComponentParams: translatedHeaderProps
  },
  {
    field: "created",
    headerComponent: TranslatedHeader,
    headerComponentParams: translatedHeaderProps,
    cellRenderer: (data: { value: string }) => {
      const date = new Date(data.value)

      return date.toLocaleString()
    },
  }
]