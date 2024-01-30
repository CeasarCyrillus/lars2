import {ReportStatus} from "@backend/dto/ReportStatus";
import {useTranslation} from "react-i18next";
import {Box, Chip} from "@mui/material";

export type ReportStatusProp = {
  status: ReportStatus | undefined
}
export const ReportStatusCell = (props: ReportStatusProp) => {
  const {status} = props
  const {t} = useTranslation()
  if (!status) {
    return null
  }
  const color = statusColorMap[status]
  return <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", height: "100%"}}>
    <Chip
      label={t(`reportStatus.${status}`)}
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
  "past-deadline": "error",
}