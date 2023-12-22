import {clearError, usePopupError} from "../../../state/errorState";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import {useRef} from "react";
import {useTranslation} from "react-i18next";
import {withSubscribe} from "../../../lib/withSubscribe";

export const ErrorPopup = withSubscribe(() => {
  const cancelRef = useRef(null)
  const error = usePopupError()
  const {t} = useTranslation()
  const isOpen = error !== null

  if (!error) {
    return null
  }
  return <AlertDialog
    isOpen={isOpen}
    leastDestructiveRef={cancelRef}
    onClose={clearError}
  >
    <AlertDialogOverlay>
      <AlertDialogContent width={{base: "80vw"}}>
        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
          {t("errorTitle")}
        </AlertDialogHeader>

        <AlertDialogBody>
          {t(error.message)}
        </AlertDialogBody>

        <AlertDialogFooter>
          <Button onClick={clearError} ml={3} colorScheme={"orange"}>
            {t("dismissDialog")}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialogOverlay>
  </AlertDialog>
}, {fallback: "ErrorPopup"})