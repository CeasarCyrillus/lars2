import {HeaderStyled} from "./Header.style";
import {LogoIcon} from "./LogoIcon";
import {Navigation} from "./Navigation";
import {LogoIconStyled} from "./LogoIcon.style";

export const Header = () => {
  return <HeaderStyled>
    <LogoIconStyled>
      <LogoIcon/>
    </LogoIconStyled>
    <Navigation/>
  </HeaderStyled>
}