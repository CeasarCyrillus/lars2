import {Button} from "@chakra-ui/react";

type Props = {
  isDisabled?: boolean,
  onClick: () => void
  isLoading?: boolean
  label: string
}
export const LoadingButton = (props: Props) => {
  const {label} = props
  return <Button
    {...props}
    borderRadius={0}
    variant="solid"
    colorScheme="orange"
    width="full"
    type={"submit"}
  >
    {label}
  </Button>
}