import {Button} from "@mui/material";

type Props = {
  label: string,
  onClick?: () => void
  type?: "button" | "submit" | "reset"
}
export const PrimaryButton = (props: Props) => {
  const {label, onClick, type} = props
  return <Button
    variant={"contained"}
    color={"primary"}
    type={type}
    fullWidth
    onClick={onClick}
  >
    {label}
  </Button>
}