import React from 'react';
import './i18n';
import {ChakraProvider} from '@chakra-ui/react';
import {theme} from './theme';
import {ErrorPopup} from "./features/main/error/ErrorPopup";
import {Main} from "./features/home/Main";
import {withSubscribe} from "./lib/withSubscribe";
import {ChildrenProps} from "./lib/childrenProps";
import {useIsAuthenticated} from "./state/authState";
import {LoginPage} from "./features/login/LoginPage";
import {AllToasts} from './lib/components/toasts/AllToasts';
import {useHasFailedInitialConnection} from "./state/connectionState";

const Authenticated = withSubscribe((props: ChildrenProps) => {
  const isAuthenticated = useIsAuthenticated()
  if (!isAuthenticated) {
    return <LoginPage/>
  }
  return <>{props.children}</>
}, {fallback: "Authenticated"})

const Connected = withSubscribe((props: ChildrenProps) => {
  const {children} = props
  const hasFailedInitialConnection = useHasFailedInitialConnection()
  console.log("CC: hasFailedInitialConnection", hasFailedInitialConnection)
  return <>{children}</>
}, {fallback: "Connected"})

const AppShell = withSubscribe((props: ChildrenProps) => {
  const {children} = props
  return (
    <ChakraProvider theme={theme}>
      <Connected>
        {children}
      </Connected>
    </ChakraProvider>
  )
}, {fallback: "AppShell"})

export const App = () =>
  <AppShell>
    <Authenticated>
      <Main/>
    </Authenticated>
    <AllToasts/>
    <ErrorPopup/>
  </AppShell>

