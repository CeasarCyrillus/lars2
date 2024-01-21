import React from "react";
import {ChildrenProps} from "../lib/childrenProps";
import {Header} from "./header/Header";
import {ContentLayoutWrapper, LayoutWrapper} from "./Layout.style";
import {Navigation} from "./navigation/Navigation";

type Props = { hideHeader?: boolean } & ChildrenProps
export const Layout = (props: Props) => {
  const {children} = props

  return <LayoutWrapper>
    <Header/>
    <ContentLayoutWrapper>
      <Navigation/>
      {children}
    </ContentLayoutWrapper>
  </LayoutWrapper>
}