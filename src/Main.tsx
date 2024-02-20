import {Layout} from "./common/components/Layout";
import {withSubscribe} from "./common/lib/withSubscribe";
import {Header} from "./common/components/header/Header";
import {Navigation} from "./common/components/navigation/Navigation";
import React, {lazy} from "react";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {Path} from "./common/lib/navigation";

const ReportGrid = lazy(() => import("./features/reports/ReportGrid"));
const ReportDetails = lazy(() => import("./features/reports/reportDetails/ReportDetails"));

export const Main = withSubscribe(() => {
  return (
    <BrowserRouter>
      <Layout header={<Header/>} navigation={<Navigation/>}>
        <Routes>
          <Route path={Path.Reports} Component={ReportGrid}/>
          <Route path={Path.ReportDetails} Component={ReportDetails}/>
          <Route path={"*"} Component={() => <Navigate to={Path.Reports}/>}/>
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}, {fallback: "HomePage"})