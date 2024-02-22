import {useTranslation} from "react-i18next";
import {List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import ChecklistOutlinedIcon from "@mui/icons-material/ChecklistOutlined";
import {ComponentType} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {paths} from "../../lib/navigation/navigation";

type Props = {
  label: string,
  Icon: ComponentType,
  value: string
}

const NavigationItem = (props: Props) => {
  const {label, Icon, value} = props
  const navigate = useNavigate()
  const {pathname} = useLocation()
  const isSelected = pathname.startsWith(value)
  return <ListItem dense={false} disablePadding divider>
    <ListItemButton
      sx={{width: "200px"}}
      selected={isSelected}
      onClick={() => navigate(value)}
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
      <NavigationItem label={t("reports")} value={paths.reports.root} Icon={ChecklistOutlinedIcon}/>
    </List>
  )
}