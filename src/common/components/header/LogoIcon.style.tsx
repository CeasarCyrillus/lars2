import {ChildrenProps} from "../../lib/childrenProps";
import {Box} from "@chakra-ui/react";

export const LogoIconStyled = (props: ChildrenProps) =>
  <Box sx={{position: "absolute", top: "6px", left: "8px"}}>
    {props.children}
  </Box>