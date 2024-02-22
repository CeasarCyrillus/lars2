import {Layout} from "./common/components/Layout";
import {withSubscribe} from "./common/lib/withSubscribe";
import {Header} from "./common/components/header/Header";
import {Navigation} from "./common/components/navigation/Navigation";
import React, {lazy} from "react";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {paths} from "./common/lib/navigation/navigation";

const ReportGrid = lazy(() => import("./features/reports/ReportGrid"));
const ReportDetails = lazy(() => import("./features/reports/reportDetails/ReportDetails"));

export const Main = withSubscribe(() => {
  return (
    <BrowserRouter>
      <Layout header={<Header/>} navigation={<Navigation/>}>
        <Routes>
          <Route path={paths.reports.root} Component={ReportGrid}/>
          <Route path={paths.reports.details} Component={ReportDetails}/>
          <Route path={"*"} Component={() => <Navigate to={paths.default}/>}/>
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}, {fallback: "HomePage"})