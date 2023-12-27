import {Box, Tag} from "@chakra-ui/react";
import {useTranslation} from "react-i18next";
import {ReportStatus} from "../../../../lars2_backend/src/sharedTypes/dto/ReportStatus";

const useTranslated = (prefix: string) =>
  function useTranslated(key: string) {
    const {t} = useTranslation()
    return t(`${prefix}.${key}`)
  };

export type ReportStatusProp = {
  status: ReportStatus
}
export const ReportStatusCell = (props: ReportStatusProp) => {
  const {status} = props
  const translateStatus = useTranslated("reportStatus")
  if (status === "not-started") {
    return null
  }
  const colorScheme = statusColorMap[status]
  return <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", height: "100%"}}>
    <Tag variant={"solid"}
         sx={{
           width: "100px",
           justifyContent: "center",
           alignItems: "center",
           display: "flex"
         }}
         colorScheme={colorScheme}
    >
      {translateStatus(status)}
    </Tag>
  </Box>
}

const statusColorMap: Record<ReportStatus, string> = {
  "not-started": "blue",
  "in-progress": "yellow",
  approved: "green",
  "past-deadline": "red"
}

export type TranslatedHeaderProps = {
  prefix: string
  translationKey: string
}
export const TranslatedHeader = (props: TranslatedHeaderProps) => {
  const {prefix, translationKey} = props
  const translate = useTranslated(prefix)
  return <span>{translate(translationKey)}</span>
}