import {AnyObject, ObjectSchema} from "yup";
import {ReactNode} from "react";
import {Form as FormikForm, Formik} from "formik";

type Props<T extends AnyObject> = {
  validationSchema: ObjectSchema<T>
  initialValues: T,
  onSubmit: (form: T) => Promise<unknown>
  children: ReactNode
}

export const Form = <T extends AnyObject>(props: Props<T>) => {
  const {children} = props
  return <Formik
    {...props}
    validateOnChange={true}
    validateOnMount={true}
  >
    <FormikForm>
      {children}
    </FormikForm>
  </Formik>;
}