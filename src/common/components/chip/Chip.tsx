import {Chip as MUIChip} from "@mui/material";

export type ChipColor = 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'
type Props = {
  color: ChipColor
  label: string
}
export const Chip = (props: Props) => <MUIChip
  {...props}
  variant="filled"
  size={"medium"}
/>