import {TextField} from "@mui/material";
import {Field, useFormikContext} from "formik";

type Props = {
  name: string,
  label: string,
  type?: "text" | "email" | "number" | "password"
}

const InternalInput = (props: Props) => {
  const {name} = props
  const {touched, errors} = useFormikContext<Record<string, string>>()
  const isTouched = touched[name]
  const error = errors[name]
  const hasError = !!error && isTouched

  return <TextField
    {...props}
    required
    error={hasError}
    helperText={hasError ? error : ""}
  />
}
export const FormInput = (props: Props) => {
  const type = props.type ?? "text"
  return <Field {...props} type={type} as={InternalInput}/>
}