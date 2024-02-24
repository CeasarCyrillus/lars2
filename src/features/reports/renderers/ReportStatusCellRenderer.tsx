import {ReportStatus} from "@backend/dto/ReportStatus";
import {useTranslation} from "react-i18next";
import {Box} from "@mui/material";
import {Chip} from "../../../common/components/chip/Chip";

export type ReportStatusProp = {
  status: ReportStatus | undefined
}
export const ReportStatusCellRenderer = (props: ReportStatusProp) => {
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
    />
  </Box>
}

const statusColorMap: Record<ReportStatus, "info" | "warning" | "success" | "error"> = {
  "not-started": "info",
  "in-progress": "warning",
  approved: "success",
  "past-deadline": "error",
}