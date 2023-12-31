import {withSubscribe} from "../../lib/withSubscribe";
import {useTranslation} from "react-i18next";
import {Toast} from "./Toast";
import {useError} from "../../state/errorState";

export const ErrorToast = withSubscribe(() => {
  const error = useError()
  const {t} = useTranslation("error")
  const toastId = `errorToastId.${error}`
  const errorTitle = `${error}Title`
  const description = `${error}Description`
  return <Toast
    toastId={toastId}
    show={error !== null}
    title={t(errorTitle)}
    description={t(description)}
    status={"error"}
    duration={6000}
    isClosable={true}
  />
})