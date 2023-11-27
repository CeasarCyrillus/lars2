import {HeaderStyled} from "./Header.style";
import {LogoIcon} from "./LogoIcon";
import {Navigation} from "./Navigation";
import {LogoIconStyled} from "./LogoIcon.style";
import {LanguageSelector} from "../languageSelect/LanguageSelector";

export const Header = () => {
  return <HeaderStyled>
    <LogoIconStyled>
      <LogoIcon/>
    </LogoIconStyled>
    <LanguageSelector/>
    <Navigation/>
  </HeaderStyled>
}