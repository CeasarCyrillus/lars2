import {
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Link
} from "@chakra-ui/react";
import {FaLock} from "react-icons/fa";
import {useState} from "react";
import {useTranslation} from "react-i18next";

type Props = {
  value: string
  onChange: (value: string) => void
}
export const PasswordInput = (props: Props) => {
  const {value, onChange} = props
  const {t} = useTranslation()
  const [showPassword, setShowPassword] = useState(false)
  return <FormControl>
    <InputGroup>
      <InputLeftElement
        pointerEvents="none"
        color="gray.300"
        children={<FaLock/>}
      />
      <Input
        isRequired={true}
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={t("passwordPlaceholder")}
      />
      <InputRightElement width="4.5rem">
        <Button
          variant={"outline"}
          colorScheme={"gray"}
          height="1.75rem"
          size="sm"
          onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? t("hidePassword") : t("showPassword")}
        </Button>
      </InputRightElement>
    </InputGroup>
    <FormHelperText textAlign="center">
      <Link>{t("forgotPasswordPrompt")}</Link>
    </FormHelperText>
  </FormControl>
}