import {withSubscribe} from "../../../lib/withSubscribe";
import {useTranslation} from "react-i18next";
import {Toast} from "../Toast";
import {useIsConnectionError} from "../../../state/connectionState";

export const ConnectionErrorToast = withSubscribe(() => {
  const connectionError = useIsConnectionError()
  const {t} = useTranslation()
  return <Toast
    show={connectionError}
    title={t("connectionErrorTitle")}
    description={t("connectionErrorDescription")}
    status={"error"}
  />
})