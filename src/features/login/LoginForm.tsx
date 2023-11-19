import {Box, Stack} from "@chakra-ui/react";
import {EmailInput} from "./EmailInput";
import {PasswordInput} from "./PasswordInput";
import {LoginButton} from "./LoginButton";
import {useState} from "react";

export const LoginForm = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  return <Box minWidth={{base: "100%"}}>
    <form>
      <Stack
        spacing={4}
        padding="1rem"
        backgroundColor="whiteAlpha.900"
        boxShadow="md"
      >
        <EmailInput value={email} onChange={setEmail}/>
        <PasswordInput value={password} onChange={setPassword}/>
        <LoginButton onClick={() => console.log("Clicketyclick")}/>
      </Stack>
    </form>
  </Box>
}