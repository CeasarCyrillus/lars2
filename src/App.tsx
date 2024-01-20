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

import {CssBaseline} from '@mui/material';

const Authenticated = withSubscribe((props: ChildrenProps) => {
  const isAuthenticated = useIsAuthenticated()
  if (!isAuthenticated) {
    return <LoginPage/>
  }
  return <>{props.children}</>
}, {fallback: "Authenticated"})

const AppShell = withSubscribe((props: ChildrenProps) => {
  const {children} = props
  return <>{children}</>
}, {fallback: "AppShell"})

export const App = () =>
  <AppShell>
    <CssBaseline/>
    <Authenticated>
      <Main/>
    </Authenticated>
    <ReConnectionToast/>
    <ReConnectedToast/>
    <ConnectionErrorToast/>
    <ErrorToast/>
  </AppShell>

