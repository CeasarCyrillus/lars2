import React from 'react';
import './i18n';
import {Main} from "./Main";
import {withSubscribe} from "./common/lib/withSubscribe";
import {ChildrenProps} from "./common/lib/childrenProps";
import {useIsAuthenticated} from "./common/state/authState";
import {LoginPage} from "./common/components/login/LoginPage";
import {ReConnectionToast} from "./common/components/toasts/connectionToasts/ReConnectingToast";
import {ReConnectedToast} from "./common/components/toasts/connectionToasts/ReConnectedToast";
import {ConnectionErrorToast} from "./common/components/toasts/connectionToasts/ConnectionErrorToast";
import {ErrorToast} from "./common/components/toasts/ErrorToast";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {FatalErrorPage} from "./common/components/FatalErrorPage";
import {CssBaseline} from "@mui/material";
import {FullPageLoadingSpinner} from "./common/components/FullPageLoadingSpinner";
import {useIsFatalError} from "./common/state/connectionState";

const Authenticated = (props: ChildrenProps) => {
  const isAuthenticated = useIsAuthenticated()
  if (!isAuthenticated) {
    return <LoginPage/>
  }
  return <>{props.children}</>
}

const LoadingComponent = () => {
  if (process.env.NODE_ENV !== "development") {
    return <FullPageLoadingSpinner/>
  }

  return null
}

const ConnectionError = (props: ChildrenProps) => {
  const {children} = props
  const isFatalError = useIsFatalError()
  return isFatalError ? <FatalErrorPage/> : <>{children}</>
}

const AppShell = withSubscribe((props: ChildrenProps) => {
  const {children} = props
  return (
    <ConnectionError>
      {children}
    </ConnectionError>
  )
}, {fallback: <LoadingComponent/>})

export const App = () =>
  <>
    <CssBaseline/>
    <AppShell>
      <Authenticated>
        <Main/>
      </Authenticated>
      <ReConnectionToast/>
      <ReConnectedToast/>
      <ConnectionErrorToast/>
      <ErrorToast/>
    </AppShell>
  </>
