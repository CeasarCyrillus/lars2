import {AdminDTO} from "@backend/dto/AdminDTO";

export type UserModel = Pick<AdminDTO, "username" | "email" | "name" | "phone" | "role">