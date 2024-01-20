import {LogoIcon} from "./LogoIcon.style";
import {AppBar, Toolbar} from "@mui/material";
import {HeaderWrapper} from "./Header.style";

export const Header = () => {
  return <HeaderWrapper sx={{flexGrow: 1}}>
    <AppBar position="static">
      <Toolbar>
        <LogoIcon/>
      </Toolbar>
    </AppBar>
  </HeaderWrapper>
}