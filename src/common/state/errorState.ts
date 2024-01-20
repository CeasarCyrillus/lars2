import {AllErrors} from "@backend/error/AllErrors";
import {ErrorResponse} from "@backend/socket/response/Response";
import {bind} from "@react-rxjs/core";
import {createSignal} from "@react-rxjs/utils";
import {startWith} from "rxjs";
import {isErrorResponse} from "../services/response";

const [errorState$, setErrorState] = createSignal<AllErrors | null>()

export const handleError = <T extends AllErrors>(error: ErrorResponse<T> | any) => {
  if (isErrorResponse(error)) {
    setErrorState(error.payload)
    console.warn("handled error:", error)
  } else {
    setErrorState("unknownError")
    console.error("unknown error:", error)
  }
}

export const [useError] = bind(errorState$.pipe(
  startWith(null))
)

//TODO: this is to make sure that toasts can be shown again if the same error happens
export const dismissError = () => setErrorState(null)