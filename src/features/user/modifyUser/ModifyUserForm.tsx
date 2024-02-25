import {AdminDTO} from "@backend/dto/AdminDTO"
import {Form} from "../../../common/components/form/Form"
import {modifyUserFormSchema, modifyUserInitialValues} from "./ModifyUserModel";
import {FormButton} from "../../../common/components/form/FormButton";
import {FormInput} from "../../../common/components/form/FormInput";
import {ModifyFormWrapper} from "./ModifyForm.style";

type Props = {
  user: AdminDTO
}

export const ModifyUserForm = ({user}: Props) => {
  const initialValues = modifyUserInitialValues(user)
  return (<Form
      initialValues={initialValues}
      onSubmit={() => {
        return Promise.resolve()
      }}
      validationSchema={modifyUserFormSchema}
    >
      <ModifyFormWrapper>
        <FormInput name={"username"} label={"Username"}/>
        <FormInput name={"email"} label={"Email"}/>
        <FormInput name={"phone"} label={"Phone"}/>
        <FormButton label={"Save"}/>
      </ModifyFormWrapper>
    </Form>
  )
}