import {Avatar, Heading, Stack} from "@chakra-ui/react";
import {LoginForm} from "./LoginForm";
import {useTranslation} from "react-i18next";
import {Layout} from "../main/Layout";
import {withSubscribe} from "../../lib/withSubscribe";
import {Header} from "../main/Header";
import React from "react";

export const LoginPage = withSubscribe(() => {
  const {t} = useTranslation()
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