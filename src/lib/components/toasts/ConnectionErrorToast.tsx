import {withSubscribe} from "../../withSubscribe";
import {useTranslation} from "react-i18next";
import {Toast} from "./Toast";
import {useIsConnectionError} from "../../../state/connectionState";

export const ConnectionErrorToast = withSubscribe(() => {
  const toastId = "connectionErrorToastId"
  const show = useIsConnectionError()
  const {t} = useTranslation()
  return <Toast
    toastId={toastId}
    show={show}
    title={t("connectionErrorTitle")}
    description={t("connectionErrorDescription")}
    status={"error"}
    duration={null}
    isClosable={false}
  />
})