import {FormInput} from "../FormInput";
import {Link} from "@mui/material";
import {useTranslation} from "react-i18next";
import {StackWrapper} from "./LoginFormFields.style";
import {PrimaryButton} from "../PrimaryButton";
import {Form, Formik} from 'formik';
import {initialValues} from "./FormModel";
import {useLogin} from "../../state/authState";

export const LoginFormFields = () => {
  const {t} = useTranslation()
  const [result, login] = useLogin()
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        console.log("on submit")
        login(values.username, values.password)
      }}
    >
      {(FormikState) => (
        <Form>
          <StackWrapper>
            <FormInput
              name={"username"}
              placeholder={t("usernamePlaceholder")}
              onChange={FormikState.handleChange}
              onBlur={FormikState.handleBlur}
              value={FormikState.values.username}
            />
            {FormikState.touched.username && FormikState.errors.username}
            <StackWrapper>
              <FormInput
                name={"password"}
                placeholder={t("passwordPlaceholder")}
                type={"password"}
                onChange={FormikState.handleChange}
                onBlur={FormikState.handleBlur}
                value={FormikState.values.password}
              />
              <Link>{t("forgotPasswordPrompt")}</Link>
            </StackWrapper>
            <PrimaryButton
              type={"submit"}
              label={t("login")}
            />
          </StackWrapper>
        </Form>)}
    </Formik>
  )
}