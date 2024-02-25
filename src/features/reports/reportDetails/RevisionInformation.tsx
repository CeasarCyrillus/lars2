import {useSelectedReport} from "./useSelectedReporter";
import {DetailsTable} from "../../../common/components/details/DetailsTable";
import {ReportStatusCellRenderer} from "../renderers/ReportStatusCellRenderer";
import {Divider} from "@mui/material";
import React from "react";
import {ReportDetailsDTO} from "@backend/dto/ReportDetailsDTO";
import {DetailsRow} from "../../../common/components/details/DetailsRow";
import {dateTimeFormatter} from "../renderers/DateTimeFormatter";


type RevisionRowProps = {
  reportDetails: ReportDetailsDTO
}

const RevisionRow = ({reportDetails}: RevisionRowProps) => {
  return <DetailsRow
    label={"Revisions"}>{reportDetails.revision === 0 ? "No Revisions" : reportDetails.revision}</DetailsRow>
}

export const RevisionInformation = () => {
  const reportDetails = useSelectedReport()
  return <DetailsTable header={"Report Details"}>
    <DetailsRow label={"Status"}><ReportStatusCellRenderer status={reportDetails.status}/></DetailsRow>
    <Divider/>
    <DetailsRow label={"Submitted date"}>{dateTimeFormatter(reportDetails.report_date)}</DetailsRow>
    <Divider/>
    <DetailsRow
      label={"Latest revision date"}>{dateTimeFormatter(reportDetails.report_date)}</DetailsRow>
    <Divider/>
    <RevisionRow reportDetails={reportDetails}/>
  </DetailsTable>
}