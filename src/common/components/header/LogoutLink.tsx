import {Link} from "@chakra-ui/react"
import {useTranslation} from "react-i18next";
import {useLogout} from "../../state/authState";
import {LogoutLinkWrapper} from "./LogoutLink.style";

export const LogoutLink = () => {
  const {t} = useTranslation()
  const logout = useLogout()
  return <LogoutLinkWrapper>
    <Link onClick={logout} colorScheme={"gray"}>{t("logout")}</Link>
  </LogoutLinkWrapper>
}