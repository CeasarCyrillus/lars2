import {useSelectedReport} from "./useSelectedReporter";
import {Chip, Divider} from "@mui/material";
import React from "react";
import {ReportDetailsWrapper} from "./ReportDetailsWrapper";
import {Row} from "./Row";
import {Link} from "react-router-dom";
import {setSelectedUser, useMaybeSelectedUser} from "../../../common/state/userState";
import {UserDTO} from "@backend/dto/UserDTO";

export const ContactPersonInformation = () => {
  const report = useSelectedReport()
  const contacts = report.team.reporters.filter(contact => contact.id !== report.reporter.id)
  const selectedUser = useMaybeSelectedUser()
  return <ReportDetailsWrapper header={"Contacts"}>
    <ContactInformation user={report.reporter} isReporter/>
    {contacts.map(contact =>
      <span key={contact.id}>
        <Divider/>
        <ContactInformation user={contact}/>
      </span>
    )}
    <p>{selectedUser?.email}</p>
  </ReportDetailsWrapper>
}

type ContactInformationProps = {
  user: UserDTO
  isReporter?: boolean
}
const ContactInformation = ({user, isReporter}: ContactInformationProps) => {
  const label = isReporter ? <Chip label={"Reporter"} variant={"outlined"}/> : undefined
  return <>
    <Link to={""} onClick={() => setSelectedUser(user.id)}><Row label={label}>{user.name}</Row></Link>
    {user.email && <Row>{user.email}</Row>}
    {user.phone && <Row>{user.phone}</Row>}
  </>;
}