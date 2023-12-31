import {withSubscribe} from "../../../lib/withSubscribe";
import {useTranslation} from "react-i18next";
import {Toast} from "../Toast";
import {useIsReConnected} from "../../../state/connectionState";

export const ReConnectedToast = withSubscribe(() => {
  const toastId = "reconnectedToastId"
  const {t} = useTranslation()
  const isReconnected = useIsReConnected()
  return <Toast
    toastId={toastId}
    show={isReconnected}
    title={t("reconnectedTitle")}
    description={t("reconnectedDescription")}
    status={"success"}
    duration={3000}
    isClosable={true}
  />
})