import {Card, CardContent, styled} from "@mui/material";

export const PageLayoutWrapper = styled(Card)({
  display: "flex",
  flexDirection: "column",
})

export const PageContentWrapper = styled(CardContent)({
  display: "flex",
  gap: "10px",
  alignItems: "flex-start",
})