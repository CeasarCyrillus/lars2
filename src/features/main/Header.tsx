import {HeaderStyled} from "./Header.style";
import {LogoIcon} from "./LogoIcon";
import {Navigation} from "./Navigation";
import {LogoIconStyled} from "./LogoIcon.style";
import {LanguageButtons} from "../languageSelect/LanguageButtons";

export const Header = () => {
  return <HeaderStyled>
    <LogoIconStyled>
      <LogoIcon/>
    </LogoIconStyled>
    <LanguageButtons/>
    <Navigation/>
  </HeaderStyled>
}