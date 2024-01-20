import {Layout} from "./Layout";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography} from "@mui/material";
import {useTranslation} from "react-i18next";
import {useState} from "react";

export const FatalErrorPage = () => {
  const {t} = useTranslation("error")
  const [isOpen, setIsOpen] = useState(true)
  const onReload = () => {
    setIsOpen(false)
    window.location.reload();
  }
  return <Layout hideHeader>
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
  </Layout>
}