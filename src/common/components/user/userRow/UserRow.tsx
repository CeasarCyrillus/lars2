import {UserRole} from "@backend/dto/UserRole"
import {UserRowWrapper} from "./UserRow.style";
import {UserAvatar} from "../UserAvatar";
import {Typography} from "@mui/material";
import React from "react";
import {UserRoleChip} from "../UserRoleChip";

type Props = {
  role: UserRole
  name: string
}
export const UserRow = ({role, name}: Props) => (
  <UserRowWrapper>
    <UserAvatar name={name}/>
    <Typography variant={"h6"}>{name}</Typography> <UserRoleChip role={role}/>
  </UserRowWrapper>)