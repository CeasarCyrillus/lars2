import {Textarea} from "@mui/joy";
import React from "react";
import {useSelectedReport} from "./useSelectedReporter";
import {ReportDetailsWrapper} from "./ReportDetailsWrapper";

export const ReportNote = () => {
  const report = useSelectedReport()
  return <ReportDetailsWrapper header={"Comment"}>
    <Textarea minRows={3} maxRows={3} value={report.note ?? ""} placeholder={"No comment"} readOnly={true}
              sx={{margin: "10px"}}/>
  </ReportDetailsWrapper>
}