import {useSelectedReport} from "./useSelectedReporter";
import {ReportDetailsWrapper} from "./ReportDetailsWrapper";
import {Row} from "./Row";
import {ReportStatusCellRenderer} from "../renderers/ReportStatusCellRenderer";
import {Divider} from "@mui/material";
import moment from "moment/moment";
import {Link} from "react-router-dom";
import {getDetailsPath, Path} from "../../../common/lib/navigation";
import React from "react";

export const RevisionInformation = () => {
  const report = useSelectedReport()
  return <ReportDetailsWrapper header={"Report Details"}>
    <Row label={"Status"}><ReportStatusCellRenderer status={report.status}/></Row>
    <Divider/>
    <Row label={"Submitted date"}>{moment(report.report_date).format("YYYY-MM-DD hh:mm")}</Row>
    <Divider/>
    <Row label={"Latest revision date"}>{moment(report.report_date).format("YYYY-MM-DD hh:mm")}</Row>
    <Divider/>
    <Link to={getDetailsPath(Path.ReportRevisionDetails, report.id)}>
      <Row label={"Revisions"}>{report.revision}</Row>
    </Link>
  </ReportDetailsWrapper>
}