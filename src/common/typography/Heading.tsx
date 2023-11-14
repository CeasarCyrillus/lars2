import {styled} from "styled-components";

export const Heading = styled("h1")`
  font-size: ${({theme}) => theme.typography.heading.size}px;
  font-weight: ${({theme}) => theme.typography.heading.weight};
`