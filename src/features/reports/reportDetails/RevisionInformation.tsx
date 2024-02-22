import {useSelectedReport} from "./useSelectedReporter";
import {ReportDetailsWrapper} from "./ReportDetailsWrapper";
import {Row} from "./Row";
import {ReportStatusCellRenderer} from "../renderers/ReportStatusCellRenderer";
import {Divider} from "@mui/material";
import moment from "moment/moment";
import {Link} from "react-router-dom";
import React from "react";
import {reportRevisionsPath} from "../../../common/lib/navigation/reportPaths";
import {ReportDetailsDTO} from "@backend/dto/ReportDetailsDTO";


type RevisionRowProps = {
  reportDetails: ReportDetailsDTO
}

const RevisionRow = ({reportDetails}: RevisionRowProps) => {
  if (!reportDetails.revision) {
    return <Row label={"Revisions"}>{reportDetails.revision}</Row>
  }

  return (
    <Link to={reportRevisionsPath(reportDetails.id)}>
      <Row label={"Revisions"}>{reportDetails.revision}</Row>
    </Link>)
}

export const RevisionInformation = () => {
  const reportDetails = useSelectedReport()
  return <ReportDetailsWrapper header={"Report Details"}>
    <Row label={"Status"}><ReportStatusCellRenderer status={reportDetails.status}/></Row>
    <Divider/>
    <Row label={"Submitted date"}>{moment(reportDetails.report_date).format("YYYY-MM-DD hh:mm")}</Row>
    <Divider/>
    <Row label={"Latest revision date"}>{moment(reportDetails.report_date).format("YYYY-MM-DD hh:mm")}</Row>
    <Divider/>
    <RevisionRow reportDetails={reportDetails}/>
  </ReportDetailsWrapper>
}