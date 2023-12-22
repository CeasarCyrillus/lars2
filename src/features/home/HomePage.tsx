import {Layout} from "../main/Layout";
import {useUser} from "../../state/authState";
import {withSubscribe} from "../../lib/withSubscribe";
import {Header} from "../main/Header";
import {useReports} from "../../state/reportState";

export const HomePage = withSubscribe(() => {
  const reports = useReports()
  console.log("CC:", reports)
  return <Layout header={<Header/>}>
    <UserInfo/>
  </Layout>
}, {fallback: "HomePage"})

export const UserInfo = withSubscribe(() => {
  const user = useUser()
  return <h1>Home {user.email} / {user.name}</h1>
}, {fallback: "userInfo"})