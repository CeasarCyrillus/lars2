import React, {ReactNode} from "react";
import {Box, CardHeader} from "@mui/material";
import {CardContentWrapper, InformationCardWrapper} from "./InformationCard.style";

type Props = {
  title: ReactNode,
  subHeader?: ReactNode
  children: ReactNode
}
export const InformationCard = ({title, subHeader, children}: Props) => (
  <Box sx={{width: "100%"}}>
    <InformationCardWrapper variant="outlined" sx={{width: "100%"}}>
      <CardHeader
        title={title}
        subheader={subHeader}
      />
      <CardContentWrapper>
        {children}
      </CardContentWrapper>
    </InformationCardWrapper>
  </Box>

)