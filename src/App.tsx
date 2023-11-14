import React from 'react';
import {Text} from "./common/typography/Text";
import {ThemeProvider} from "styled-components";
import {theme} from "./theme";
import {AppStyled} from "./App.styled";
import {Heading} from "./common/typography/Heading";
import 'react-calendar/dist/Calendar.css';
import {useTranslation} from "react-i18next";
import './i18n';

export const App = () => {
  const {t} = useTranslation()
  return <ThemeProvider theme={theme}>
    <AppStyled>
      <Heading>{t("hello")}</Heading>
      <Text>Hello</Text>
    </AppStyled>
  </ThemeProvider>;
};
