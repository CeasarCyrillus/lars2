import {withSubscribe} from "../../../lib/withSubscribe";
import {useTranslation} from "react-i18next";
import {Toast} from "../Toast";


export const ReConnectionToast = withSubscribe(() => {
  const toastId = "reconnectingToastId"
  const {t} = useTranslation()
  return <Toast
    toastId={toastId}
    show={false}
    title={t("reConnectingTitle")}
    description={t("reConnectingDescription")}
    status={"loading"}
    duration={null}
    isClosable={false}
  />
})