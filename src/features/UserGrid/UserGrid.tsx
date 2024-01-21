import {colDefs} from "./UserGridModel";
import {Grid} from "../../common/components/grid/Grid";
import {AdminDTO} from "@backend/dto/AdminDTO";

export const UserGrid = () => {
  const users: AdminDTO[] = []
  return <Grid rows={users} columnDefs={colDefs} prefix={"user"} Toolbar={() => <></>}/>
}