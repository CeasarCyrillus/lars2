import {FormControl, Input, InputGroup, InputLeftElement} from "@chakra-ui/react";
import {FaUserAlt} from "react-icons/fa";
import {useTranslation} from "react-i18next";

type Props = {
  value: string,
  onChange: (newValue: string) => void
}

export const UsernameInput = (props: Props) => {
  const {value, onChange} = props
  const {t} = useTranslation()
  return <FormControl>
    <InputGroup>
      <InputLeftElement
        pointerEvents="none"
        color={"gray.300"}
        children={<FaUserAlt/>}
      />
      <Input
        isRequired={true}
        value={value}
        placeholder={t("usernamePlaceholder")}
        onChange={(e) => onChange(e.target.value)}
      />
    </InputGroup>
  </FormControl>
}