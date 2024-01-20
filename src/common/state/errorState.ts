import {AllErrors} from "@backend/error/AllErrors";
import {ErrorResponse} from "@backend/socket/response/Response";
import {bind} from "@react-rxjs/core";
import {createSignal} from "@react-rxjs/utils";
import {map, pairwise, shareReplay, startWith} from "rxjs";
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

const error$ = errorState$.pipe(
  startWith(null),
  shareReplay()
)

export const [useHasError] = bind(error$.pipe(
  map(error => error !== null))
)

export const [useLatestError] = bind(error$.pipe(
  pairwise(),
  map(([prevError, currentError]) =>
    prevError !== null ? prevError : currentError)
))

export const dismissError = () => setErrorState(null)