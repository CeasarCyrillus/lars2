import {Stack} from "@chakra-ui/react";
import {Layout} from "../../../features/main/Layout";
import {ChildrenProps} from "../../childrenProps";

export const FatalErrorPageStyled = (props: ChildrenProps) => {
  const {children} = props
  return <Layout>
    {children}
  </Layout>
}

export const FatalErrorPopup = (props: ChildrenProps) => {
  const {children} = props
  return <Stack
    sx={{
      margin: "10% auto",
      padding: "10px",
      width: "300px",
      boxShadow: "md",
      gap: 3,
      backgroundColor: "whiteAlpha.900",
    }}
  >
    {children}
  </Stack>

}