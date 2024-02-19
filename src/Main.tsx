import {Layout} from "./common/components/Layout";
import {withSubscribe} from "./common/lib/withSubscribe";
import {Header} from "./common/components/header/Header";
import {Navigation} from "./common/components/navigation/Navigation";
import React from "react";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {ReportPage} from "./features/reports/ReportPage";

export const Main = withSubscribe(() => {
  return (
    <BrowserRouter>
      <Layout header={<Header/>} navigation={<Navigation/>}>
        <Routes>
          <Route path={"/reports"} Component={ReportPage}/>
          <Route path={"*"} Component={() => <Navigate to={"/reports"}/>}/>
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}, {fallback: "HomePage"})