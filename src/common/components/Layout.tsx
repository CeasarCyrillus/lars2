import React, {ReactNode} from "react";
import {Flex} from "@chakra-ui/react";
import {ChildrenProps} from "../lib/childrenProps";

export const Layout = (props: ChildrenProps & { header?: ReactNode }) => {
  const {children, header} = props
  return <Flex
    flexDirection="column"
    width="100wh"
    height="100vh"
    backgroundColor="gray.50"
    justifyContent="top"
    alignItems="center"
  >
    {header}
    {children}
  </Flex>;
}