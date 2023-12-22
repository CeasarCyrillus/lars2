import {useTranslation} from "react-i18next";
import {LoadingButton} from "../../lib/components/LoadingButton";

type Props = {
  onClick: () => void
  isLoading?: boolean
  isDisabled?: boolean
}
export const LoginButton = (props: Props) => {
  const {onClick, isLoading, isDisabled} = props
  const {t} = useTranslation()
  return <LoadingButton
    isDisabled={isDisabled}
    onClick={onClick}
    isLoading={isLoading}
    label={t("loginButtonLabel")}
  />
}