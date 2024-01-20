import {Stack, Typography} from "@mui/material";
import {useTranslation} from "react-i18next";

export const LoginFormHeader = () => {
  const {t} = useTranslation()
  return <Stack>
    <Typography variant={"h5"}>{t("welcomeHeader")}</Typography>
    <Typography variant={"subtitle1"}>{t("welcomeText")}</Typography>
  </Stack>;
}