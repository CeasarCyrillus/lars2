import {withSubscribe} from "../../../lib/withSubscribe";
import {useTranslation} from "react-i18next";
import {Toast} from "../Toast";

export const ConnectionErrorToast = withSubscribe(() => {
  const toastId = "connectionErrorToastId"
  const {t} = useTranslation()
  return <Toast
    toastId={toastId}
    show={false}
    title={t("connectionErrorTitle")}
    description={t("connectionErrorDescription")}
    status={"error"}
    duration={null}
    isClosable={false}
  />
})