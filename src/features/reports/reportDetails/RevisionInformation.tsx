import {useSelectedReport} from "./useSelectedReporter";
import {DetailsTable} from "../../../common/components/details/DetailsTable";
import {ReportStatusCellRenderer} from "../renderers/ReportStatusCellRenderer";
import {Divider} from "@mui/material";
import moment from "moment/moment";
import {Link} from "react-router-dom";
import React from "react";
import {reportRevisionsPath} from "../../../common/lib/navigation/reportPaths";
import {ReportDetailsDTO} from "@backend/dto/ReportDetailsDTO";
import {DetailsRow} from "../../../common/components/details/DetailsRow";


type RevisionRowProps = {
  reportDetails: ReportDetailsDTO
}

const RevisionRow = ({reportDetails}: RevisionRowProps) => {
  if (!reportDetails.revision) {
    return <DetailsRow label={"Revisions"}>{reportDetails.revision}</DetailsRow>
  }

  return (
    <Link to={reportRevisionsPath(reportDetails.id)}>
      <DetailsRow label={"Revisions"}>{reportDetails.revision}</DetailsRow>
    </Link>)
}

export const RevisionInformation = () => {
  const reportDetails = useSelectedReport()
  return <DetailsTable header={"Report Details"}>
    <DetailsRow label={"Status"}><ReportStatusCellRenderer status={reportDetails.status}/></DetailsRow>
    <Divider/>
    <DetailsRow label={"Submitted date"}>{moment(reportDetails.report_date).format("YYYY-MM-DD hh:mm")}</DetailsRow>
    <Divider/>
    <DetailsRow
      label={"Latest revision date"}>{moment(reportDetails.report_date).format("YYYY-MM-DD hh:mm")}</DetailsRow>
    <Divider/>
    <RevisionRow reportDetails={reportDetails}/>
  </DetailsTable>
}