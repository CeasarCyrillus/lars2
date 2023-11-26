import React from "react";
import {Flex} from "@chakra-ui/react";
import {Header} from "./Header";
import {ChildrenProps} from "../../lib/childrenProps";

export const Layout = (props: ChildrenProps) =>
  <Flex
    flexDirection="column"
    width="100wh"
    height="100vh"
    backgroundColor="gray.50"
    justifyContent="top"
    alignItems="center"
  >
    <Header/>
    {props.children}
  </Flex>