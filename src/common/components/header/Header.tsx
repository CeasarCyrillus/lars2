import {HeaderStyled} from "./Header.style";
import {LogoIcon} from "./LogoIcon";
import {LogoIconStyled} from "./LogoIcon.style";
import {LanguageButtons} from "./LanguageButtons";

export const Header = () => {
  return <HeaderStyled>
    <LogoIconStyled>
      <LogoIcon/>
    </LogoIconStyled>
    <LanguageButtons/>
  </HeaderStyled>
}