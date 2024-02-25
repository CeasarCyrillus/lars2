import {Stack} from "@mui/material";
import {useTranslation} from "react-i18next";
import React from "react";
import {reportPeriodValueFormatter} from "../renderers/ReportPeriodValueFormatter";
import {ReportNote} from "./ReportNote";
import {useSelectedReport} from "./useSelectedReporter";
import {ContactPersonInformation} from "./ContactPersonInformation";
import {RevisionInformation} from "./RevisionInformation";
import {PageContent} from "../../../common/components/pageLayout/PageContent";


export const ReportDetails = () => {
  const {t} = useTranslation()
  const report = useSelectedReport()
  return (
    <PageContent
      title={t("reportDetailsHeader")}
      subHeader={`${t("reportPeriod")}: ${reportPeriodValueFormatter({value: report.period})}`}
    >
      <Stack sx={{gap: "10px"}}>
        <RevisionInformation/>
        <ReportNote/>
      </Stack>
      <ContactPersonInformation/>
    </PageContent>
  )
}


export default ReportDetails