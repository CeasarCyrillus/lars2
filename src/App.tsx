import React from 'react';
import './i18n';
import {ChakraProvider, theme} from '@chakra-ui/react';
import {Main} from "./Main";
import {withSubscribe} from "./common/lib/withSubscribe";
import {ChildrenProps} from "./common/lib/childrenProps";
import {useIsAuthenticated} from "./common/state/authState";
import {LoginPage} from "./common/components/login/LoginPage";
import {ReConnectionToast} from "./common/components/toasts/connectionToasts/ReConnectingToast";
import {ReConnectedToast} from "./common/components/toasts/connectionToasts/ReConnectedToast";
import {ConnectionErrorToast} from "./common/components/toasts/connectionToasts/ConnectionErrorToast";
import {ConnectionErrorPage} from './common/components/error/ConnectionErrorPage';

const Authenticated = withSubscribe((props: ChildrenProps) => {
  const isAuthenticated = useIsAuthenticated()
  if (!isAuthenticated) {
    return <LoginPage/>
  }
  return <>{props.children}</>
}, {fallback: "Authenticated"})

const AppShell = withSubscribe((props: ChildrenProps) => {
  const {children} = props
  return (
    <ChakraProvider theme={theme}>
      <ConnectionErrorPage>
        {children}
      </ConnectionErrorPage>
    </ChakraProvider>
  )
}, {fallback: "AppShell"})

export const App = () =>
  <AppShell>
    <Authenticated>
      <Main/>
    </Authenticated>
    <ReConnectionToast/>
    <ReConnectedToast/>
    <ConnectionErrorToast/>
  </AppShell>

