import {Link} from "@mui/material";
import {ReactNode} from "react";

type Props = {
  children: ReactNode
  onClick: () => void
}

export const ClickableLink = ({children, onClick}: Props) => {
  return <Link sx={{cursor: "pointer"}} onClick={onClick}>{children}</Link>
}