import {Avatar, Heading, Stack} from "@chakra-ui/react";
import {LoginForm} from "./LoginForm";
import {useTranslation} from "react-i18next";
import {useIsAuthenticated} from "../../state/authState";
import {Navigate} from "react-router-dom";
import {Layout} from "../main/Layout";

export const LoginPage = () => {
  const {t} = useTranslation()
  const isAuthenticated = useIsAuthenticated()
  if (isAuthenticated) {
    return <Navigate to={"/"}/>
  }
  return <Layout>
    <Stack
      mt={10}
      flexDir="column"
      justifyContent="center"
      alignItems="center"
    >
      <Avatar bg="orange.500"/>
      <Heading color="orange.400">{t("welcomeHeader")}</Heading>
      <LoginForm/>
    </Stack>
  </Layout>
}