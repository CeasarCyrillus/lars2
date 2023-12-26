import {ChildrenProps} from "../../../../lib/childrenProps";
import {withSubscribe} from "../../../../lib/withSubscribe";
import {useIsFatalError} from "../../../../state/errorState";
import {useTranslation} from "react-i18next";
import {FatalErrorPage} from "../../../../lib/components/fatalError/FatalErrorPage";
import {useRefreshButtonProps} from "../../../../lib/components/useRefreshButtonProps";

export const UnknownFatalErrorPage = withSubscribe((props: ChildrenProps) => {
  const {children} = props
  const {t} = useTranslation()
  const isError = useIsFatalError()
  const refreshButtonProps = useRefreshButtonProps()
  return <FatalErrorPage
    isError={isError}
    title={t("fatalErrorTitle")}
    errorMessage={t("fatalErrorMessage")}
    prompt={t("fatalErrorPrompt")}
    button={refreshButtonProps}
  >
    {children}
  </FatalErrorPage>
}, {fallback: "fatalErrorPage"})