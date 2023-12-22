import {ChildrenProps} from "../../../../lib/childrenProps";
import {Layout} from "../../Layout";
import {Stack} from "@chakra-ui/react";

export const UnknownFatalErrorPageStyled = (props: ChildrenProps) => {
  const {children} = props
  return <Layout>
    {children}
  </Layout>
}

export const UnknownFatalErrorPopup = (props: ChildrenProps) => {
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