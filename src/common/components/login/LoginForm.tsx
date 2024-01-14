import {UsernameInput} from "./UsernameInput";
import {PasswordInput} from "./PasswordInput";
import {LoginButton} from "./LoginButton";
import {useState} from "react";
import {useLogin} from "../../state/authState";
import {isLoading} from "../../lib/useMutation";
import {LoginFormStyled} from "./LoginForm.style";

export const LoginForm = () => {
  const [email, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [result, login] = useLogin()

  const isValid = email && password
  return <LoginFormStyled>
    <UsernameInput value={email} onChange={setUsername}/>
    <PasswordInput value={password} onChange={setPassword}/>
    <LoginButton
      isDisabled={!isValid}
      isLoading={isLoading(result)}
      onClick={() => login(email, password)}
    />
  </LoginFormStyled>
}