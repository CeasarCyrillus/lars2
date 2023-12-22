import {FatalErrorPageStyled, FatalErrorPopup} from "./FatalErrorPage.style";
import {Button, Heading, Text} from "@chakra-ui/react";
import {ReactNode, useState} from "react";
import {ChildrenProps} from "../../childrenProps";
import {KnownError, UnknownError} from "../../../state/errorState";

type Props = {
  fatalError: KnownError | UnknownError
  title?: ReactNode
  errorMessage?: ReactNode
  prompt?: ReactNode
  button: {
    onClick: () => void
    label: ReactNode
  }
} & ChildrenProps
export const FatalErrorPage = (props: Props) => {
  const {fatalError, title, errorMessage, prompt, button, children} = props
  const [isLoading, setIsLoading] = useState(false)
  if (!fatalError) {
    return <>{children}</>
  }
  return <FatalErrorPageStyled>
    <FatalErrorPopup>
      <Heading
        size={"lg"}
      >
        {title}
      </Heading>
      <Text
        size={"sm"}
      >
        {errorMessage}
      </Text>
      <Text
        as={"i"}
      >
        {prompt}
      </Text>
      <Button
        colorScheme={"orange"}
        onClick={() => {
          setIsLoading(true)
          button.onClick();
        }}
        isLoading={isLoading}
      >
        {button.label}
      </Button>
    </FatalErrorPopup>
  </FatalErrorPageStyled>
}