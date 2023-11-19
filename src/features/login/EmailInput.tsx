import {FormControl, Input, InputGroup, InputLeftElement} from "@chakra-ui/react";
import {FaUserAlt} from "react-icons/fa";
import {useTranslation} from "react-i18next";

type Props = {
  value: string,
  onChange: (newValue: string) => void
}

export const EmailInput = (props: Props) => {
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
        value={value}
        type="email"
        placeholder={t("emailPlaceholder")}
        onChange={(e) => onChange(e.target.value)}
      />
    </InputGroup>
  </FormControl>
}