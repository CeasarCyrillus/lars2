import React, {ReactNode} from "react";
import {CardHeader, Divider} from "@mui/material";
import {PageContentWrapper, PageLayoutWrapper} from "./PageContent.style";

type Props = {
  title: ReactNode,
  subHeader?: ReactNode
  children: ReactNode
}
export const PageContent = ({title, subHeader, children}: Props) => (
  <PageLayoutWrapper variant="outlined" sx={{width: "100%"}}>
    <CardHeader
      title={title}
      subheader={subHeader}
    />
    <Divider/>
    <PageContentWrapper>
      {children}
    </PageContentWrapper>
  </PageLayoutWrapper>
)