import {Layout} from "./common/components/Layout";
import {withSubscribe} from "./common/lib/withSubscribe";
import {ReportGrid} from "./features/reports/ReportGrid";

export const Main = withSubscribe(() => {
  return <Layout>
    <ReportGrid/>
  </Layout>
}, {fallback: "HomePage"})