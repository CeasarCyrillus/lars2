import {Avatar, Heading, Stack} from "@chakra-ui/react";
import {LoginForm} from "./LoginForm";
import {useTranslation} from "react-i18next";
import {Navigate} from "react-router-dom";
import {Layout} from "../main/Layout";
import {withSubscribe} from "../../lib/withSubscribe";
import {Header} from "../main/Header";
import React from "react";
import {useIsLoggedIn} from "../../state/authState";

export const LoginPage = withSubscribe(() => {
  const {t} = useTranslation()
  const isLoggedIn = useIsLoggedIn()
  if (isLoggedIn) {
    return <Navigate to={"/"}/>
  }
  return <Layout header={<Header/>}>
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
}, {fallback: "LoginPage"})