import React, {ReactNode} from "react";
import {CardHeader, Divider} from "@mui/material";
import {CardContentWrapper, InformationCardWrapper} from "./InformationCard.style";

type Props = {
  title: ReactNode,
  subHeader?: ReactNode
  children: ReactNode
}
export const InformationCard = ({title, subHeader, children}: Props) => (
  <InformationCardWrapper variant="outlined" sx={{width: "100%"}}>
    <CardHeader
      title={title}
      subheader={subHeader}
    />
    <Divider/>
    <CardContentWrapper>
      {children}
    </CardContentWrapper>
  </InformationCardWrapper>
)