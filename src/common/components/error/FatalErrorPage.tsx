import {Layout} from "../layout/Layout";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography} from "@mui/material";
import {useTranslation} from "react-i18next";
import {useState} from "react";

export const FatalErrorPage = () => {
  const [isOpen, setIsOpen] = useState(true)
  const onReload = () => {
    setIsOpen(false)
    window.location.reload();
  }
  const {t} = useTranslation("error")
  return <Layout>
    <Dialog open={isOpen} fullWidth maxWidth={"xs"}>
      <DialogTitle>{t("fatalErrorTitle")}</DialogTitle>
      <DialogContent>
        <Typography variant={"inherit"}>{t("fatalErrorMessage")}</Typography>
        <br/>
        <Typography variant={"caption"}>{t("fatalErrorPrompt")}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onReload}>{t("fatalErrorButton")}</Button>
      </DialogActions>
    </Dialog>
  </Layout>;
}