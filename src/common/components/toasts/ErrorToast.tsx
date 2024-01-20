import {withSubscribe} from "../../lib/withSubscribe";
import {useTranslation} from "react-i18next";
import {Toast} from "./Toast";
import {dismissError, useError} from "../../state/errorState";

export const ErrorToast = withSubscribe(() => {
  const error = useError()
  const {t} = useTranslation("error")
  const errorTitle = `${error}Title`
  const description = `${error}Description`
  return <Toast
    show={!!error}
    onClose={dismissError}
    title={t(errorTitle)}
    description={t(description)}
    status={"error"}
    duration={4000}
  />
})