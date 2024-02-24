import {unsetSelectedUser, useIsDetailsModalOpen, useSelectedUser} from "./userDetailsModalState";
import {Dialog} from "@mui/material";
import {UserContact} from "../UserContact";
import {InformationCard} from "../../informationCard/InformationCard";
import {UserRow} from "../userRow/UserRow";
import {withSubscribe} from "../../../lib/withSubscribe";

export const UserDetailsModal = withSubscribe(() => {
  const user = useSelectedUser()
  const isOpen = useIsDetailsModalOpen()
  return (
    <Dialog open={isOpen} onClose={unsetSelectedUser} fullWidth={true}>
      <InformationCard title={<UserRow name={user.name} role={user.role}/>}>
        <UserContact user={user}/>
      </InformationCard>
    </Dialog>)
}, {fallback: null})