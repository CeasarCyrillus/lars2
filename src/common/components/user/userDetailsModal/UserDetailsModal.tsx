import {Box, Dialog, Grow, IconButton} from "@mui/material";
import {InformationCard} from "../../informationCard/InformationCard";
import {UserRow} from "../userRow/UserRow";
import {withSubscribe} from "../../../lib/withSubscribe";
import CloseIcon from '@mui/icons-material/Close';
import {AdminDTO} from "@backend/dto/AdminDTO";
import {UserContact} from "../UserContact";
import {DetailsRow} from "../../details/DetailsRow";
import {DetailsTable} from "../../details/DetailsTable";
import {dateTimeFormatter} from "../../../../features/reports/renderers/DateTimeFormatter";
import {StackWrapper} from "../../login/LoginForm.style";

type Props = {
  user: AdminDTO
  isOpen: boolean
  onClose: () => void
}
export const UserDetailsModal = withSubscribe(({user, isOpen, onClose}: Props) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      TransitionComponent={Grow}
      TransitionProps={{mountOnEnter: true, unmountOnExit: true}}
    >
      <InformationCard title={
        <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center", gap: "15px"}}>
          <UserRow name={user.name} role={user.role}/>
          <IconButton onClick={onClose}>
            <CloseIcon/>
          </IconButton>
        </Box>}>
        <StackWrapper>
          <UserContact user={user}/>
          <UserDetails user={user}/>
        </StackWrapper>
      </InformationCard>
    </Dialog>)
}, {fallback: null})


type UserDetailsProps = {
  user: AdminDTO
}

const UserDetails = ({user}: UserDetailsProps) => (
  <DetailsTable header={"Details"}>
    <DetailsRow label={"Username"}>
      {user.username}
    </DetailsRow>
    <DetailsRow label={"Id"}>
      {user.id}
    </DetailsRow>
    <DetailsRow label={"Created at"}>
      {dateTimeFormatter(user.created_at)}
    </DetailsRow>
  </DetailsTable>)