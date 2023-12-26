import {EmailInput} from "./EmailInput";
import {PasswordInput} from "./PasswordInput";
import {LoginButton} from "./LoginButton";
import {useState} from "react";
import {useLogin} from "../../state/authState";
import {isLoading} from "../../lib/useMutation";
import {LoginFormStyled} from "./LoginForm.style";

export const LoginForm = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [result, login] = useLogin()

  const isValid = email && password
  return <LoginFormStyled>
    <EmailInput value={email} onChange={setEmail}/>
    <PasswordInput value={password} onChange={setPassword}/>
    <LoginButton
      isDisabled={!isValid}
      isLoading={isLoading(result)}
      onClick={() => login(email, password)}
    />
  </LoginFormStyled>
}