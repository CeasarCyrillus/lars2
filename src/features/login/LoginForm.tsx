import {EmailInput} from "./EmailInput";
import {PasswordInput} from "./PasswordInput";
import {LoginButton} from "./LoginButton";
import {useEffect, useState} from "react";
import {useLogin} from "../../state/authState";
import {isLoading, isSuccess} from "../../lib/useMutation";
import {useLocation, useNavigate} from "react-router-dom";
import {LoginFormStyled} from "./LoginForm.style";

export const LoginForm = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [result, login] = useLogin()
  const location = useLocation();
  const navigate = useNavigate()
  const origin = location.state?.from?.pathname || '/';
  useEffect(() => {
    const validLogin = isSuccess(result) && result.value;
    if (validLogin) {
      navigate(origin);
    }
  }, [result, origin, navigate])

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