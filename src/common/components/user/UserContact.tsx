import {AdminDTO} from "@backend/dto/AdminDTO";
import {DetailsRow} from "../details/DetailsRow";
import {DetailsTable} from "../details/DetailsTable";
import React from "react";

type Props = {
  user: AdminDTO
}
export const UserContact = ({user}: Props) => {
  return <DetailsTable header={"Contact"}>
    <DetailsRow label={"Name"}>{user.name}</DetailsRow>
    {user.email && <DetailsRow label={"Email"}>{user.email}</DetailsRow>}
    {user.phone && <DetailsRow label={"Phone"}>{user.phone}</DetailsRow>}
  </DetailsTable>
}