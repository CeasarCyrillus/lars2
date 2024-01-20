import {Button} from "@mui/material";

type Props = {
  label: string,
  onClick?: () => void
  type?: "button" | "submit" | "reset"
  disabled?: boolean
}
export const PrimaryButton = (props: Props) => {
  const {label, onClick, type, disabled} = props
  return <Button
    disabled={disabled}
    variant={"contained"}
    color={"primary"}
    type={type}
    fullWidth
    onClick={onClick}
  >
    {label}
  </Button>
}