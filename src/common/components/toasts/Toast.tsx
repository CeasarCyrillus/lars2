import {useToast} from "@chakra-ui/react";
import {useTranslation} from "react-i18next";
import {useEffect} from "react";
import {clearError} from "../../state/errorState";

type Props = {
  toastId: string,
  show: boolean,
  title: string,
  description: string,
  status: "error" | "loading" | "success",
  duration: null | number,
  isClosable: boolean
}
export const Toast = (props: Props) => {
  const {toastId, show, title, description, status, duration, isClosable} = props
  const toast = useToast();
  const {t} = useTranslation()
  useEffect(() => {
    if (show && !toast.isActive(toastId)) {
      toast({
        title: title,
        description: description,
        status: status,
        duration: duration,
        isClosable: isClosable,
        onCloseComplete: clearError
      })
    }

    return () => toast.close(toastId)
  }, [description, duration, isClosable, show, status, t, title, toast, toastId])

  useEffect(() => {
    if (!show) {
      toast.close(toastId)
    }
  }, [toast, toastId, show])

  return null
}