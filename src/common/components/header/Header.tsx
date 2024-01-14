import {HeaderStyled} from "./Header.style";
import {LogoIcon} from "./LogoIcon";
import {LogoIconStyled} from "./LogoIcon.style";
import {LanguageButtons} from "./LanguageButtons";
import {LogoutLink} from "./LogoutLink";

export const Header = () => {
  return <HeaderStyled>
    <LogoIconStyled>
      <LogoIcon/>
    </LogoIconStyled>
    <LanguageButtons/>
    <LogoutLink/>
  </HeaderStyled>
}