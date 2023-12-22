import {ChildrenProps} from "../../../../lib/childrenProps";
import {withSubscribe} from "../../../../lib/withSubscribe";
import {useUnknownFatalError} from "../../../../state/errorState";
import {useTranslation} from "react-i18next";
import {token_key} from "../../../../services/sessionService/sessionService";
import {FatalErrorPage} from "../../../../lib/components/fatalError/FatalErrorPage";

export const UnknownFatalErrorPage = withSubscribe((props: ChildrenProps) => {
  const {children} = props
  const {t} = useTranslation()
  const fatalError = useUnknownFatalError()
  if (!fatalError) {
    return <>{children}</>
  }
  const reloadApp = () => {
    localStorage.removeItem(token_key)
    window.location.reload()
  }
  return <FatalErrorPage
    fatalError={fatalError}
    title={t("fatalErrorTitle")}
    errorMessage={t("fatalErrorMessage")}
    prompt={t("fatalErrorPrompt")}
    button={{onClick: reloadApp, label: t("fatalErrorButton")}}
  >
    {children}
  </FatalErrorPage>
}, {fallback: "fatalErrorPage"})