import {withSubscribe} from "../../../lib/withSubscribe";
import {useTranslation} from "react-i18next";
import {Toast} from "../Toast";
import {useIsReconnected} from "../../../state/connectionState";

export const ReConnectedToast = withSubscribe(() => {
  const toastId = "reconnectedToastId"
  const show = useIsReconnected()
  const {t} = useTranslation()
  return <Toast
    toastId={toastId}
    show={show}
    title={t("reconnectedTitle")}
    description={t("reconnectedDescription")}
    status={"success"}
    duration={3000}
    isClosable={true}
  />
})