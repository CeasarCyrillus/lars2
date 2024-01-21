import {LoginForm} from "./LoginForm";
import {Layout} from "../Layout";
import {withSubscribe} from "../../lib/withSubscribe";
import React from "react";
import {LoginPageWrapper} from "./LoginPage.style";
import {Header} from "../header/Header";

export const LoginPage = withSubscribe(() => {
  return <Layout header={<Header/>}>
    <LoginPageWrapper>
      <LoginForm/>
    </LoginPageWrapper>
  </Layout>
}, {fallback: "LoginPage"})