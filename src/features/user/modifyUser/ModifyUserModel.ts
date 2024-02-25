import {UserModel} from "./UserModel";
import {object, string} from "yup";
import {AdminDTO} from "@backend/dto/AdminDTO";

export type ModifyUserModel = Omit<UserModel, "role">

export const modifyUserInitialValues = (user: AdminDTO): ModifyUserModel => ({
  ...user
})

export const modifyUserFormSchema = object({
  username: string().required().min(5),
  email: string().optional().email(),
  name: string().required().min(2),
  phone: string().optional().min(5).max(14)
});