import {unsetSelectedUser, useMaybeSelectedUser} from "../../common/state/userState";
import {Dialog} from "@mui/material";
import React from "react";
import {UserContact} from "../../common/components/user/UserContact";
import {InformationCard} from "../../common/components/informationCard/InformationCard";
import {UserRow} from "./userRow/UserRow";

export const UserDetailsModal = () => {
  const user = useMaybeSelectedUser()
  if (!user) {
    return null
  }
  return (
    <Dialog open={true} onClose={unsetSelectedUser} fullWidth={true}>
      <InformationCard title={<UserRow name={user.name} role={user.role}/>}>
        <UserContact user={user}/>
      </InformationCard>
    </Dialog>)
}