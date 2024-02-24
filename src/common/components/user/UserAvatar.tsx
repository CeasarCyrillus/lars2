import {Avatar} from "@mui/material";
import React from "react";

type Props = {
  name: string,
  width?: number,
  height?: number
}
export const UserAvatar = ({name, height, width}: Props) => <Avatar
  src={`https://ui-avatars.com/api/?background=random&name=${name}`}
  sx={{width: width ?? 30, height: height ?? 30}}
/>