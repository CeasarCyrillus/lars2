import {useTranslation} from "react-i18next";
import {List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import ChecklistOutlinedIcon from "@mui/icons-material/ChecklistOutlined";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import {ComponentType} from "react";
import {setCurrentTab, useCurrentTab} from "../../state/navigationState";

const NavigationItem = (props: { label: string, Icon: ComponentType, value: string }) => {
  const {label, Icon, value} = props
  const currentTab = useCurrentTab()
  const isSelected = currentTab === value;
  return <ListItem dense={false} disablePadding divider>
    <ListItemButton
      sx={{width: "200px"}}
      selected={isSelected}
      onClick={() => setCurrentTab(value)}
    >
      <ListItemIcon>
        <Icon/>
      </ListItemIcon>
      {isSelected ?
        <ListItemText primary={label}/> :
        <ListItemText secondary={label}/>
      }
    </ListItemButton>
  </ListItem>
}

export const Navigation = () => {
  const {t} = useTranslation()
  return (
    <List>
      <NavigationItem label={t("reports")} value={"reports"} Icon={ChecklistOutlinedIcon}/>
      <NavigationItem label={t("users")} value={"users"} Icon={PeopleOutlineIcon}/>
    </List>
  )
}