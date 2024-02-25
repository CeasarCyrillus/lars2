import {Box, Dialog, Grow, IconButton} from "@mui/material";
import {InformationCard} from "../../informationCard/InformationCard";
import {UserRow} from "../userRow/UserRow";
import {withSubscribe} from "../../../lib/withSubscribe";
import CloseIcon from '@mui/icons-material/Close';
import {AdminDTO} from "@backend/dto/AdminDTO";
import {UserContact} from "../UserContact";

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
      TransitionProps={{mountOnEnter: true, unmountOnExit: true}}>
      <InformationCard title={
        <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
          <UserRow name={user.name} role={user.role}/>
          <IconButton onClick={onClose}>
            <CloseIcon/>
          </IconButton>
        </Box>}>
        <UserContact user={user}/>
      </InformationCard>
    </Dialog>)
}, {fallback: null})