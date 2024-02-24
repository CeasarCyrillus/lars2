import {useSelectedReport} from "./useSelectedReporter";
import {Divider} from "@mui/material";
import React from "react";
import {DetailsTable} from "../../../common/components/details/DetailsTable";
import {setSelectedUser} from "../../../common/state/userState";
import {UserDetailsModal} from "../../user/UserDetailsModal";
import {AdminDTO} from "@backend/dto/AdminDTO";
import {DetailsRow} from "../../../common/components/details/DetailsRow";
import {ClickableLink} from "../../../common/components/clickableLink/ClickableLink";
import {UserRoleChip} from "../../../common/components/user/UserRoleChip";

export const ContactPersonInformation = () => {
  const report = useSelectedReport()
  const contacts = report.team.reporters.filter(contact => contact.id !== report.reporter.id)
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
    <UserDetailsModal/>
  </>
}

type ContactInformationProps = {
  user: AdminDTO
  isReporter?: boolean
}
const ContactInformation = ({user, isReporter}: ContactInformationProps) => {
  const label = isReporter ? <UserRoleChip role={"reporter"}/> : undefined
  return <>
    <DetailsRow label={label}><ClickableLink
      onClick={() => setSelectedUser(user.id)}>{user.name}</ClickableLink></DetailsRow>
    {user.email && <DetailsRow>{user.email}</DetailsRow>}
    {user.phone && <DetailsRow>{user.phone}</DetailsRow>}
  </>;
}