import {withSubscribe} from "../../../lib/withSubscribe";
import {useTranslation} from "react-i18next";
import {Toast} from "../Toast";
import {useIsReConnecting} from "../../../state/connectionState";


export const ReConnectionToast = withSubscribe(() => {
  const {t} = useTranslation()
  const isReconnecting = useIsReConnecting()
  return <Toast
    show={isReconnecting}
    title={t("reConnectingTitle")}
    description={t("reConnectingDescription")}
    status={"loading"}
  />
})