import {LoginFormWrapper} from "./LoginForm.style";
import {Divider} from "@mui/material";
import {LoginFormHeader} from "./LoginFormHeader";
import {LoginFormFields} from "./LoginFormFields";


export const LoginForm = () => {
  return (
    <LoginFormWrapper elevation={3}>
      <LoginFormHeader/>
      <Divider/>
      <LoginFormFields/>
    </LoginFormWrapper>
  )
}