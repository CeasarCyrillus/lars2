import {Box} from "@chakra-ui/react";
import {ChildrenProps} from "../../lib/childrenProps";

export const HeaderStyled = (props: ChildrenProps) => <Box sx={{
  backgroundColor: "orange.400",
  width: "100vw",
  height: "55px"
}}>
  {props.children}
</Box>