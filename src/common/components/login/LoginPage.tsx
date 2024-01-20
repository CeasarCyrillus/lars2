import {LoginForm} from "./LoginForm";
import {Layout} from "../Layout";
import {withSubscribe} from "../../lib/withSubscribe";
import React from "react";
import {LoginPageWrapper} from "./LoginPage.style";

export const LoginPage = withSubscribe(() => {
  return <Layout>
    <LoginPageWrapper>
      <LoginForm/>
    </LoginPageWrapper>
  </Layout>
}, {fallback: "LoginPage"})