import {withSubscribe} from "../../../lib/withSubscribe";
import {useIsReconnecting} from "../../../state/connectionState";
import {useTranslation} from "react-i18next";
import {Toast} from "../Toast";


export const ReConnectionToast = withSubscribe(() => {
  const toastId = "reconnectingToastId"
  const show = useIsReconnecting()
  const {t} = useTranslation()
  return <Toast
    toastId={toastId}
    show={show}
    title={t("reConnectingTitle")}
    description={t("reConnectingDescription")}
    status={"loading"}
    duration={null}
    isClosable={false}
  />
})