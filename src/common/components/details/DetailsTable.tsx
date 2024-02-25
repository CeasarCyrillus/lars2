import React, {ReactNode} from "react";
import {Divider, Paper, Typography} from "@mui/material";

export const DetailsTable = (props: { children: ReactNode, header: string }) =>
  <Paper variant={"outlined"} sx={{padding: "5px"}}>
    <Typography><b>{props.header}</b></Typography>
    <Divider/>
    {props.children}
  </Paper>