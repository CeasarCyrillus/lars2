import {Layout} from "./common/components/Layout";
import {withSubscribe} from "./common/lib/withSubscribe";
import {Header} from "./common/components/header/Header";
import {Tab, TabList, TabPanel, TabPanels, Tabs} from "@chakra-ui/react";
import {useTranslation} from "react-i18next";
import {ReportGrid} from "./features/reports/reportGrid";
import {TooltipUnderConstruction} from "./common/components/TooltipUnderConstruction";


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
        <TooltipUnderConstruction>
          <StyledTab label={t("teams")} isDisabled={true}/>
        </TooltipUnderConstruction>
      </TabList>
      <TabPanels height={"100%"}>
        <TabPanel sx={{height: "100%"}}>
          <ReportGrid/>
        </TabPanel>
      </TabPanels>
    </Tabs>
  </Layout>
}, {fallback: "HomePage"})