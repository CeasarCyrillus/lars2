import {Column} from "ag-grid-community";
import {useTranslation} from "react-i18next";

export const translatedHeaderProps = (gridPrefix: string) => (params: { column: Column }): TranslatedHeaderProps => {
  const field = params.column.getColDef().field
  if (!field) {
    throw new Error("Field definition not found!")
  }
  return {prefix: `${gridPrefix}.GridHeader`, translationKey: field}
};


export type TranslatedHeaderProps = {
  prefix: string
  translationKey: string
}
export const TranslatedHeader = (props: TranslatedHeaderProps) => {
  const {prefix, translationKey} = props
  const {t} = useTranslation()
  return <span>{t(`${prefix}.${translationKey}`)}</span>
}