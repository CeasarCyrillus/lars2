import {Box, Stack} from "@chakra-ui/react";
import {ChildrenProps} from "../../lib/childrenProps";

export const LoginFormStyled = (props: ChildrenProps) =>
  <Box minWidth={{base: "100%"}}>
    <form>
      <Stack
        sx={{
          padding: "1rem",
          backgroundColor: "whiteAlpha.900",
          boxShadow: "md",
          gap: 3
        }}
      >
        {props.children}
      </Stack>
    </form>
  </Box>