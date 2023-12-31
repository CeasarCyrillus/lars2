import {withSubscribe} from "../../lib/withSubscribe";
import {ChildrenProps} from "../../lib/childrenProps";
import React from "react";
import {useTranslation} from "react-i18next";
import {ErrorPage} from "./errorPage/ErrorPage";
import {useIsConnectionError} from "../../state/connectionState";

export const ConnectionErrorPage = withSubscribe((props: ChildrenProps) => {
  const {children} = props
  const {t} = useTranslation()
  const isConnectionError = useIsConnectionError()
  return (
    <ErrorPage
      title={t("connectionErrorTitle")}
      errorMessage={t("connectionErrorDescription")}
      isError={isConnectionError}
    >
      {children}
    </ErrorPage>
  )
}, {fallback: "connectionErrorPage"})