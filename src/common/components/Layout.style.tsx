import {Box, styled} from "@mui/material";

export const LayoutWrapper = styled(Box)`
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-columns: 20% auto auto 20%;
  grid-template-rows: 64px auto;
  grid-template-areas: 
    "header header header header"
    "content content content content"
`