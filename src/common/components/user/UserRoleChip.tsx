import {UserRole} from "@backend/dto/UserRole"
import {Chip} from "@mui/material"

type Color = 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'
type Props = {
  role: UserRole
}
const colorMap: Record<UserRole, Color> = {
  admin: "primary",
  reporter: "default"
}
const labelMap: Record<UserRole, string> = {
  admin: "Admin",
  reporter: "Reporter"
}
export const UserRoleChip = ({role}: Props) => <Chip
  variant="filled"
  label={labelMap[role]} size={"small"}
  color={colorMap[role]}
/>