import {withSubscribe} from "../../lib/withSubscribe";
import {useTranslation} from "react-i18next";
import {Toast} from "./Toast";
import {dismissError, useHasError, useLatestError} from "../../state/errorState";

export const ErrorToast = withSubscribe(() => {
  const error = useLatestError()
  const hasError = useHasError()
  const {t} = useTranslation("error")
  const errorTitle = `${error}Title`
  const description = `${error}Description`
  return <Toast
    show={hasError}
    onClose={dismissError}
    title={t(errorTitle)}
    description={t(description)}
    status={"error"}
    duration={5000}
  />
})