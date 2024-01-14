import {ChildrenProps} from "../../lib/childrenProps";
import {Box} from "@chakra-ui/react";

export const LogoutLinkWrapper = (props: ChildrenProps) => {
  return <Box sx={{
    position: "absolute",
  }}>
    {props.children}
  </Box>
}