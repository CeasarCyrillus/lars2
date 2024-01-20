import React from "react";
import {ChildrenProps} from "../lib/childrenProps";
import {Header} from "./header/Header";
import {LayoutWrapper} from "./Layout.style";

export const Layout = (props: ChildrenProps) => {
  const {children} = props
  return <LayoutWrapper>
    <Header/>
    {children}
  </LayoutWrapper>
}