import {Chip as MUIChip, ChipProps} from "@mui/material";

export type ChipColor = 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'
type Props = {
  color: ChipColor
  label: string,
} & ChipProps
export const Chip = (props: Props) => <MUIChip
  variant="filled"
  size={"medium"}
  {...props}
/>