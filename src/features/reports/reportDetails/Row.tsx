import React, {ReactNode} from "react";
import {Box, Typography} from "@mui/material";

type RowProps = {
  children: ReactNode,
  label?: string | ReactNode
}
export const Row = ({children, label}: RowProps) => {
  return (
    <Box sx={{display: "flex", width: "100%", justifyContent: "center", alignItems: "center", padding: "3px"}}>
      <Box sx={{flexGrow: 1}}>
        <Typography>{label ?? ""}</Typography>
      </Box>
      <Box>
        {children}
      </Box>
    </Box>
  )
}