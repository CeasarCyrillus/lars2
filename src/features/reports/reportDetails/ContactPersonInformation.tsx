import {useSelectedReport} from "./useSelectedReporter";
import {Chip, Divider} from "@mui/material";
import React from "react";
import {ReportDetailsWrapper} from "./ReportDetailsWrapper";
import {Row} from "./Row";

export const ContactPersonInformation = () => {
  const report = useSelectedReport()
  const contacts = report.team.reporters.filter(contact => contact.id !== report.reporter.id)
  return <ReportDetailsWrapper header={"Contacts"}>
    <ContactInformation {...report.reporter} isReporter/>
    {contacts.map(contact =>
      <span key={contact.id}>
        <Divider/>
        <ContactInformation {...contact} />
      </span>
    )}

  </ReportDetailsWrapper>
}

type ContactInformationProps = {
  name: string,
  email?: string,
  phone?: string,
  isReporter?: boolean
}
const ContactInformation = ({name, email, phone, isReporter}: ContactInformationProps) => {
  const label = isReporter ? <Chip label={"Reporter"} variant={"outlined"}/> : undefined
  return <>
    <Row label={label}>{name}</Row>
    {email && <Row>{email}</Row>}
    {phone && <Row>{phone}</Row>}
  </>;
}