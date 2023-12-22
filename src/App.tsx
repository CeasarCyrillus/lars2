import React from 'react';
import './i18n';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {ChakraProvider} from '@chakra-ui/react';
import {theme} from './theme';
import {HomePage} from "./features/home/HomePage";
import {LoginPage} from "./features/login/LoginPage";
import {ProtectedRoutes} from './lib/ProtectedRoutes';
import {ErrorPopup} from "./features/main/error/ErrorPopup";
import {UnknownFatalErrorPage} from "./features/main/error/fatalError/UnknownFatalErrorPage";
import {Subscribe} from "@react-rxjs/core";
import {socketService} from './services/socketService/api';

export const App = () => {
  return <Subscribe source$={socketService.isConnected$}>
    <ChakraProvider theme={theme}>
      <UnknownFatalErrorPage>
        <ErrorPopup/>
        <BrowserRouter>
          <Routes>
            <Route path={"/"} element={<ProtectedRoutes/>}>
              <Route path={"/"} element={<HomePage/>}/>
            </Route>
            <Route path={"/login"} element={<LoginPage/>}/>
          </Routes>
        </BrowserRouter>
      </UnknownFatalErrorPage>
    </ChakraProvider>
  </Subscribe>
}

