import {Layout} from "../main/Layout";
import {useUser} from "../../state/authState";

export const HomePage = () => {
  const user = useUser()
  return <Layout><h1>Home {user.email} / {user.name}</h1></Layout>
}