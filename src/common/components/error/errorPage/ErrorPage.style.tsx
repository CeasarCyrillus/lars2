import {Stack} from "@chakra-ui/react";
import {ChildrenProps} from "../../../lib/childrenProps";

export const FatalErrorPopup = (props: ChildrenProps) => {
  const {children} = props
  return <Stack
    sx={{
      borderRadius: "5px",
      margin: "10% auto",
      padding: "40px",
      width: "fit-content",
      boxShadow: "dark-lg",
      gap: 4,
      backgroundColor: "red.600",
    }}
  >
    {children}
  </Stack>

}