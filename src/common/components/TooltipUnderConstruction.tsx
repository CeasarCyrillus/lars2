import {Box, Tooltip} from "@chakra-ui/react";
import {MdOutlineConstruction} from "react-icons/md";
import {useTranslation} from "react-i18next";
import {ChildrenProps} from "../lib/childrenProps";

export const TooltipUnderConstruction = (props: ChildrenProps) => {
  const {children} = props
  const {t} = useTranslation()
  return (
    <Tooltip
      hasArrow
      backgroundColor={"yellow.300"}
      color={"blackAlpha.900"}
      label={
        <Box sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px"
        }}
        >
          <MdOutlineConstruction/>
          {t("underConstruction")}
        </Box>}>
          <span>
            {children}
          </span>
    </Tooltip>)
}