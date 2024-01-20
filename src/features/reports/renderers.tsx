import {ReportStatus} from "@backend/dto/ReportStatus";
import {useTranslation} from "react-i18next";
import {Box, Chip} from "@mui/material";

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
  const color = statusColorMap[status]
  return <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", height: "100%"}}>
    <Chip
      label={translateStatus(status)}
      color={color}
      sx={{
        width: "100px",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
      }}
    />
  </Box>
}

const statusColorMap: Record<ReportStatus, "info" | "warning" | "success" | "error"> = {
  "not-started": "info",
  "in-progress": "warning",
  approved: "success",
  "past-deadline": "error"
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