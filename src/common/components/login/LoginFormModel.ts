import {InferType, object, string} from "yup";

export const loginFormModelInitialValues: LoginFormModel = {
  password: "",
  username: ""
}

export const loginFormSchema = object({
  username: string().required().min(5),
  password: string().required().min(3),
});

export type LoginFormModel = InferType<typeof loginFormSchema>