import {useSelectedReport} from "./useSelectedReporter";
import {Divider} from "@mui/material";
import React, {useState} from "react";
import {DetailsTable} from "../../../common/components/details/DetailsTable";
import {UserDetailsModal} from "../../../common/components/user/userDetailsModal/UserDetailsModal";
import {AdminDTO} from "@backend/dto/AdminDTO";
import {DetailsRow} from "../../../common/components/details/DetailsRow";
import {ClickableLink} from "../../../common/components/clickableLink/ClickableLink";
import {Chip} from "../../../common/components/chip/Chip";

export const ContactPersonInformation = () => {
  const report = useSelectedReport()
  const contacts = report.team.volunteers.filter(contact => contact.id !== report.reporter.id)
  return <>
    <DetailsTable header={"Contacts"}>
      <ContactInformation user={report.reporter} isReporter/>
      {contacts.map(contact =>
          <span key={contact.id}>
        <Divider/>
        <ContactInformation user={contact}/>
      </span>
      )}
    </DetailsTable>
  </>
}

type ContactInformationProps = {
  user: AdminDTO
  isReporter?: boolean
}
const ContactInformation = ({user, isReporter}: ContactInformationProps) => {
  const label = isReporter ?
    <Chip color={"default"} label={"Reporter"} variant={"outlined"} size={"small"}/> : undefined
  const [isOpen, setIsOpen] = useState(false)
  return <>
    <DetailsRow label={label}><ClickableLink
      onClick={() => setIsOpen(true)}>{user.name}</ClickableLink></DetailsRow>
    {user.email && <DetailsRow>{user.email}</DetailsRow>}
    {user.phone && <DetailsRow>{user.phone}</DetailsRow>}
    <UserDetailsModal user={user} isOpen={isOpen} onClose={() => setIsOpen(false)}/>
  </>;
}