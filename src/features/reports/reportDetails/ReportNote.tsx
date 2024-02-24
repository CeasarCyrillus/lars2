import {Textarea} from "@mui/joy";
import React from "react";
import {useSelectedReport} from "./useSelectedReporter";
import {DetailsTable} from "../../../common/components/details/DetailsTable";

export const ReportNote = () => {
  const report = useSelectedReport()
  return <DetailsTable header={"Comment"}>
    <Textarea minRows={3} maxRows={3} value={report.note ?? ""} placeholder={"No comment"} readOnly={true}
              sx={{margin: "10px"}}/>
  </DetailsTable>
}