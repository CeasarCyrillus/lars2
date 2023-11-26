import React from 'react';
import './i18n';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {ChakraProvider} from '@chakra-ui/react';
import {theme} from './theme';
import {Subscribe} from "@react-rxjs/core";
import {HomePage} from "./features/home/HomePage";
import {LoginPage} from "./features/login/LoginPage";
import {ProtectedRoutes} from './lib/ProtectedRoutes';

export const App = () =>
  <ChakraProvider theme={theme}>
    <Subscribe>
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<ProtectedRoutes/>}>
            <Route path={"/"} element={<HomePage/>}/>
          </Route>
          <Route path={"/login"} element={<LoginPage/>}/>
        </Routes>
      </BrowserRouter>
    </Subscribe>
  </ChakraProvider>

