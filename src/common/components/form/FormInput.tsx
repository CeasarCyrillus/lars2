import {TextField} from "@mui/material";
import {Field, useFormikContext} from "formik";

type Props = {
  name: string,
  label: string,
  type?: "text" | "email" | "number" | "password"
}

const InternalInput = (props: Props) => {
  const {name} = props
  const {touched, errors, getFieldMeta} = useFormikContext<Record<string, string>>()
  const isTouched = touched[name]
  const error = errors[name]
  const hasError = !!error && isTouched
  return <TextField
    {...props}
    error={hasError}
    margin={"dense"}
    size={"small"}
    FormHelperTextProps={{sx: {color: "blue"}}}
    helperText={hasError ? error : " "}
    variant={"standard"}
  />
}
export const FormInput = (props: Props) => {
  const type = props.type ?? "text"
  return <Field {...props} type={type} as={InternalInput}/>
}