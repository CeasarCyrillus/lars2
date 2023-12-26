import {Button, Heading, Text} from "@chakra-ui/react";
import {ReactNode, useState} from "react";
import {ChildrenProps} from "../../../lib/childrenProps";
import {token_key} from "../../../services/sessionService/sessionService";
import {useTranslation} from "react-i18next";
import {FatalErrorPopup} from "./ErrorPage.style";
import {Layout} from "../../Layout";

type Props = {
  isError: boolean
  title?: ReactNode
  errorMessage?: ReactNode
  prompt?: ReactNode
} & ChildrenProps
export const ErrorPage = (props: Props) => {
  const {isError, title, errorMessage, prompt, children} = props
  const [isLoading, setIsLoading] = useState(false)
  const {t} = useTranslation()
  const reloadApp = () => {
    localStorage.removeItem(token_key)
    window.location.reload()
  }
  if (!isError) {
    return <>{children}</>
  }

  return <Layout>
    <FatalErrorPopup>
      <Heading
        color={"white"}
        size={"lg"}
      >
        {title}
      </Heading>
      <Text
        color={"white"}
        size={"sm"}
      >
        {errorMessage}
      </Text>
      <Text
        color={"white"}
        as={"i"}
      >
        {prompt}
      </Text>
      <Button
        width={"100px"}
        colorScheme={"gray"}
        onClick={() => {
          setIsLoading(true)
          reloadApp()
        }}
        isLoading={isLoading}
      >
        {t("fatalErrorButton")}
      </Button>
    </FatalErrorPopup>
  </Layout>
}