import {ChildrenProps} from "../../lib/childrenProps";
import {Flex} from "@chakra-ui/react";

export const NavigationStyled = (props: ChildrenProps) =>
  <Flex sx={{height: "100%", alignItems: "center"}}>
    {props.children}
  </Flex>