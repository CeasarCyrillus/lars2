import {ColDef, Column} from "ag-grid-community";
import {TranslatedHeader, TranslatedHeaderProps} from "./renderers";
import {Team} from "@backend/dto/Team";

export type RowModel = Team

const translatedHeaderProps = (params: { column: Column }): TranslatedHeaderProps => {
  const field = params.column.getColDef().field
  if (!field) {
    throw new Error("Field definition not found!")
  }
  return {prefix: "teamGridHeader", translationKey: field}
};
export const colDefs: ColDef<RowModel>[] = [
  {
    field: "name",
    headerComponent: TranslatedHeader,
    headerComponentParams: translatedHeaderProps,
  },
  {
    field: "association",
    headerComponent: TranslatedHeader,
    headerComponentParams: translatedHeaderProps,
  },
  {
    field: "specialAssociation",
    headerComponent: TranslatedHeader,
    headerComponentParams: translatedHeaderProps
  },
  {
    field: "mainContact.name",
    headerComponent: TranslatedHeader,
    headerComponentParams: translatedHeaderProps,
  },
  {
    field: "mainContact.phone",
    headerComponent: TranslatedHeader,
    headerComponentParams: translatedHeaderProps,
  },
  {
    field: "mainContact.email",
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