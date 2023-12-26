import {token_key} from "../../services/sessionService/sessionService";
import {useTranslation} from "react-i18next";

const reloadApp = () => {
  localStorage.removeItem(token_key)
  window.location.reload()
}
export const useRefreshButtonProps = () => {
  const {t} = useTranslation()
  return ({onClick: reloadApp, label: t("fatalErrorButton")});
}