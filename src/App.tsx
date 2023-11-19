import React from 'react';
import './i18n';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {LoginPage} from "./features/login/LoginPage";
import {ChakraProvider} from '@chakra-ui/react';

export const App = () =>
  <ChakraProvider>
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<LoginPage/>}/>
      </Routes>
    </BrowserRouter>
  </ChakraProvider>

