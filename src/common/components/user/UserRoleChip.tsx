import {UserRole} from "@backend/dto/UserRole"
import {Chip, ChipColor} from "../chip/Chip"

type Props = {
  role: UserRole
}
const colorMap: Record<UserRole, ChipColor> = {
  admin: "primary",
  volunteer: "default"
}
const labelMap: Record<UserRole, string> = {
  admin: "Admin",
  volunteer: "Volunteer"
}
export const UserRoleChip = ({role}: Props) => <Chip
  label={labelMap[role]}
  color={colorMap[role]}
/>