import React, {ReactNode} from "react";
import {ChildrenProps} from "../../lib/childrenProps";
import {ContentLayoutWrapper, LayoutWrapper} from "./Layout.style";

type Props = {
  header?: ReactNode
  navigation?: ReactNode
} & ChildrenProps
export const Layout = (props: Props) => {
  const {children, header, navigation} = props

  return <LayoutWrapper>
    {header}
    <ContentLayoutWrapper>
      {navigation}
      {children}
    </ContentLayoutWrapper>
  </LayoutWrapper>
}