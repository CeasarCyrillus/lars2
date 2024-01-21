import {colDefs} from "./ReportGridModel";
import {Grid} from "../../common/components/grid/Grid";
import {useReportRows, useTeamOptions} from "./reportGridState";
import {Box, styled} from "@mui/material";
import {SearchableDropdown} from "../../common/components/form/SearchableDropdown";
import {useTranslation} from "react-i18next";

const GridToolbarWrapper = styled(Box)(({theme}) => ({
  width: "100%",
  padding: "20px",
  display: "flex",
  gap: "10px",
}))

const ReportGridToolbar = () => {
  const {t} = useTranslation()
  const teamOptions = useTeamOptions()
  return <GridToolbarWrapper>
    <SearchableDropdown options={teamOptions} label={t("team")}/>
  </GridToolbarWrapper>
}
export const ReportGrid = () => {
  const reports = useReportRows()
  return <Grid rows={reports} columnDefs={colDefs} prefix={"report"} Toolbar={ReportGridToolbar}/>
}