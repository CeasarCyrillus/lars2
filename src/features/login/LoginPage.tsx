import {Avatar, Flex, Heading, Stack} from "@chakra-ui/react";
import {LoginForm} from "./LoginForm";
import {useTranslation} from "react-i18next";

export const LoginPage = () => {
  const {t} = useTranslation()
  return <Flex
    flexDirection="column"
    width="100wh"
    height="100vh"
    backgroundColor="gray.50"
    justifyContent="top"
    alignItems="center"
  >
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
  </Flex>
}