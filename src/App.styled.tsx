import {styled} from "styled-components";

export const AppStyled = styled("div")`
  font-family: ${({theme}) => theme.typography.font};
  color: ${({theme}) => theme.typography.color};
`