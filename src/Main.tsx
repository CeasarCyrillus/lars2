import {Layout} from "./common/components/Layout";
import {withSubscribe} from "./common/lib/withSubscribe";
import {ReportGrid} from "./features/reports/ReportGrid";
import {useCurrentTab} from "./common/state/navigationState";
import {UserGrid} from "./features/UserGrid/UserGrid";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

export const Main = withSubscribe(() => {
  const currentTab = useCurrentTab()
  return (
    <Layout>
      {currentTab === "reports" && <ReportGrid/>}
      {currentTab === "users" && <UserGrid/>}
    </Layout>
  )
}, {fallback: "HomePage"})