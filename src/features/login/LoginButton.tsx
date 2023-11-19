import {useTranslation} from "react-i18next";
import {Button} from "@chakra-ui/react";

type Props = {
  onClick: () => void
}
export const LoginButton = (props: Props) => {
  const {onClick} = props
  const {t} = useTranslation()
  return <Button
    onClick={onClick}
    borderRadius={0}
    variant="solid"
    colorScheme="orange"
    width="full"
  >
    {t("loginButtonLabel")}
  </Button>
}