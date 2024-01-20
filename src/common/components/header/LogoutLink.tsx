import {Link} from "@mui/material";
import {useTranslation} from "react-i18next";
import {useLogout} from "../../state/authState";

export const LogoutLink = () => {
  const {t} = useTranslation()
  const logout = useLogout()
  return <Link onClick={logout}>{t("logout")}</Link>
}