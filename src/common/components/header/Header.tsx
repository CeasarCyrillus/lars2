import {LogoIcon} from "./LogoIcon.style";
import {AppBar, Box, Button, Toolbar} from "@mui/material";
import {HeaderWrapper} from "./Header.style";
import {useTranslation} from "react-i18next";
import {logout, useIsAuthenticated} from "../../state/authState";

export const Header = () => {
  const {t} = useTranslation()
  const isLoggedIn = useIsAuthenticated()
  return <HeaderWrapper sx={{flexGrow: 1}}>
    <AppBar position="static">
      <Toolbar>
        <Box sx={{flexGrow: 1}}>
          <LogoIcon/>
        </Box>
        {isLoggedIn && <Button
            variant={"outlined"}
            color={"inherit"}
            onClick={logout}
        >
          {t("logoutButtonLabel")}
        </Button>}
      </Toolbar>
    </AppBar>
  </HeaderWrapper>
}