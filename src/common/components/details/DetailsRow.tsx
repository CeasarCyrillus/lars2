import React, {ReactNode} from "react";
import {Box} from "@mui/material";

type RowProps = {
  children: ReactNode,
  label?: ReactNode
}
export const DetailsRow = ({children, label}: RowProps) => {
  return (
    <Box sx={{
      display: "flex",
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      gap: "20px",
      padding: "3px"
    }}>
      <Box sx={{flexGrow: 1}}>
        {label ?? ""}
      </Box>
      <Box>
        {children}
      </Box>
    </Box>
  )
}