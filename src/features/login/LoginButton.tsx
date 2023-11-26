import {useTranslation} from "react-i18next";
import {Button} from "@chakra-ui/react";

type Props = {
  onClick: () => void
  isLoading?: boolean
  isDisabled?: boolean
}
export const LoginButton = (props: Props) => {
  const {onClick, isLoading, isDisabled} = props
  const {t} = useTranslation()
  return <Button
    isDisabled={isDisabled}
    onClick={onClick}
    isLoading={isLoading}
    borderRadius={0}
    variant="solid"
    colorScheme="orange"
    width="full"
    type="submit"
  >
    {t("loginButtonLabel")}
  </Button>
}