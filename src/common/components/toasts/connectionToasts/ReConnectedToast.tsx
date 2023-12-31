import {withSubscribe} from "../../../lib/withSubscribe";
import {useTranslation} from "react-i18next";
import {Toast} from "../Toast";

export const ReConnectedToast = withSubscribe(() => {
  const toastId = "reconnectedToastId"
  const {t} = useTranslation()
  return <Toast
    toastId={toastId}
    show={false}
    title={t("reconnectedTitle")}
    description={t("reconnectedDescription")}
    status={"success"}
    duration={3000}
    isClosable={true}
  />
})