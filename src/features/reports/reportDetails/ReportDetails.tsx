import {Box, Card, CardContent, CardHeader, Stack} from "@mui/material";
import {useTranslation} from "react-i18next";
import React from "react";
import {reportPeriodValueFormatter} from "../renderers/ReportPeriodValueFormatter";
import {ReportNote} from "./ReportNote";
import {useSelectedReport} from "./useSelectedReporter";
import {ContactPersonInformation} from "./ContactPersonInformation";
import {RevisionInformation} from "./RevisionInformation";


export const ReportDetails = () => {
  const {t} = useTranslation()
  const report = useSelectedReport()
  return <Box sx={{width: "100%"}}>
    <Card variant="outlined" sx={{width: "100%"}}>
      <CardHeader
        title={t("reportDetailsHeader")}
        subheader={`${t("reportPeriod")}: ${reportPeriodValueFormatter({value: report.period})}`}
      />
      <CardContent sx={{
        display: "flex",
        gap: "10px",
        alignItems: "flex-start",
        width: "100%"
      }}>
        <Stack sx={{gap: "10px"}}>
          <RevisionInformation/>
          <ReportNote/>
        </Stack>
        <ContactPersonInformation/>
      </CardContent>
    </Card>
  </Box>
}


export default ReportDetails