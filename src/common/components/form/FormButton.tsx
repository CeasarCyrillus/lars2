import {LoadingButton} from '@mui/lab';
import {useFormikContext} from "formik";

type Props = {
  label: string,
}
export const FormButton = (props: Props) => {
  const {label} = props
  const {isValid, isSubmitting} = useFormikContext()
  return (
    <LoadingButton
      type={"submit"}
      loading={isSubmitting}
      disabled={!isValid}
      color={"primary"}
      fullWidth
      variant={"contained"}
    >
      {label}
    </LoadingButton>)
}