import {Layout} from "../main/Layout";
import {useUser} from "../../state/authState";
import {withSubscribe} from "../../lib/withSubscribe";
import {Header} from "../main/Header";
import {Box, Tab, TabList, TabPanel, TabPanels, Tabs, Tooltip} from "@chakra-ui/react";
import {useTranslation} from "react-i18next";
import {ReportGrid} from "../reportsGrid/reportGrid";
import {MdOutlineConstruction} from "react-icons/md";


const StyledTab = (props: { label: string, isDisabled?: boolean }) => {
  return <Tab isDisabled={props.isDisabled}>{props.label}</Tab>
}
export const Main = withSubscribe(() => {
  const {t} = useTranslation()
  return <Layout header={<Header/>}>
    <Tabs
      sx={{width: "100%", height: "100%"}}
      colorScheme={"orange"}
      variant={"line"}
      size={"lg"}
      isLazy
      defaultIndex={0}
    >
      <TabList>
        <StyledTab label={t("reports")}/>
        <Tooltip
          hasArrow
          backgroundColor={"yellow.300"}
          color={"blackAlpha.900"}
          label={
            <Box sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px"
            }}
            >
              <MdOutlineConstruction/>
              {t("underConstruction")}
            </Box>}>
          <span>
            <StyledTab label={t("teams")} isDisabled={false}/>
          </span>
        </Tooltip>
      </TabList>
      <TabPanels height={"100%"}>
        <TabPanel sx={{height: "100%"}}>
          <ReportGrid/>
        </TabPanel>
        <TabPanel>
          <p>two</p>
        </TabPanel>
        <TabPanel>
          <p>three</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  </Layout>
}, {fallback: "HomePage"})

export const UserInfo = withSubscribe(() => {
  const user = useUser()
  return (
    <Box>
      <h1>Home {user.email} / {user.name}</h1>
    </Box>)
}, {fallback: "userInfo"})