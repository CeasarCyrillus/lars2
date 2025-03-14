import {Card, CardContent, styled} from "@mui/material";

export const InformationCardWrapper = styled(Card)({
  display: "flex",
  flexDirection: "column",
})

export const CardContentWrapper = styled(CardContent)({
  display: "flex",
  gap: "10px",
  alignItems: "flex-start",
  justifyContent: "center"
})