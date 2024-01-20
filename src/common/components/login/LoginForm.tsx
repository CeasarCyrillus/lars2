import {LoginFormWrapper, StackWrapper} from "./LoginForm.style";
import {Divider, Link} from "@mui/material";
import {LoginFormHeader} from "./LoginFormHeader";
import {loginFormModelInitialValues, loginFormSchema} from "./LoginFormModel";
import {login} from "../../state/authState";
import {FormInput} from "../form/FormInput";
import {FormButton} from "../form/FormButton";
import {Form} from "../form/Form";
import {useTranslation} from "react-i18next";


export const LoginForm = () => {
  const {t} = useTranslation()
  return (
    <Form
      initialValues={loginFormModelInitialValues}
      onSubmit={(form) => login(form)}
      validationSchema={loginFormSchema}
    >
      <LoginFormWrapper elevation={3}>
        <LoginFormHeader/>
        <Divider/>
        <StackWrapper>
          <FormInput
            name={"username"}
            label={t("usernamePlaceholder")}
          />
          <StackWrapper>
            <FormInput
              name={"password"}
              label={t("passwordPlaceholder")}
              type={"password"}
            />
            <Link>{t("forgotPasswordPrompt")}</Link>
          </StackWrapper>
          <FormButton
            label={t("login")}
          />
        </StackWrapper>
      </LoginFormWrapper>
    </Form>
  )
}