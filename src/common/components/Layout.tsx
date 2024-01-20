import React from "react";
import {ChildrenProps} from "../lib/childrenProps";
import {Header} from "./header/Header";
import {LayoutWrapper} from "./Layout.style";

type Props = { hideHeader?: boolean } & ChildrenProps
export const Layout = (props: Props) => {
  const {children, hideHeader} = props

  return <LayoutWrapper>
    {!hideHeader && <Header/>}
    {children}
  </LayoutWrapper>
}