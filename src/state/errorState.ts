import {bind} from "@react-rxjs/core";
import {createSignal} from "@react-rxjs/utils";
import {distinctUntilChanged, map, startWith} from "rxjs";
import {token_key} from "../services/sessionService/sessionService";

type KnownErrorType = "popup" | "silent" | "fatal_error"
type UnknownErrorType = "unknown_fatal_error"
type ErrorType = KnownErrorType | UnknownErrorType
export type KnownError = {
  message: string
  type: KnownErrorType
}
export type UnknownError = ReturnType<typeof unknownError>
export const unknownError = (error?: Error | unknown) => ({
  message: "unknownErrorMessage",
  type: "popup",
  error: error
})

export const unknownFatalError = (error?: Error | unknown): UnknownError => ({
  message: "fatalError",
  type: "unknown_fatal_error",
  error
})

const [error$, setError] = createSignal<UnknownError | KnownError | null>()
export const clearError = () => setError(null)
export const handleError = (error: unknown | Error | KnownError) => {
  console.warn(error)
  if (isKnownError(error)) {
    setError(knownErrors[error.message])
  } else {
    setError(unknownError(error))
  }
}

export const authenticationError: KnownError = {
  message: "authenticationError",
  type: "silent"
}

export const incorrectLoginDetails: KnownError = {
  message: "incorrectLoginDetails",
  type: "popup"
}

export const serverUnreachableError: KnownError = {
  message: "serverUnreachableError",
  type: "popup",
}

export const knownErrors: { [key: string]: KnownError } = {
  authenticationError,
  incorrectLoginDetails,
  serverUnreachableError
}

const isKnownError = (error: Error | KnownError | unknown): error is KnownError => {
  const errorMessage = (error as Error).message
  if (errorMessage) {
    return knownErrors[errorMessage] !== undefined
  }
  return false
}
const maybeError$ = error$.pipe(
  startWith(null)
)

const errorByType$ = (type: ErrorType) => {
  return maybeError$.pipe(
    map(error => {
      if (error?.type === type) {
        return error
      }
      return null
    }),
    distinctUntilChanged((a, b) => a?.type === b?.type && a?.message === b?.message)
  );
}

export const reloadApp = () => {
  localStorage.removeItem(token_key)
  window.location.reload()
}

export const isAuthenticationError = (error: Error | KnownError | unknown): error is typeof authenticationError => {
  return isKnownError(error) && error.message === authenticationError.message
}
export const [usePopupError] = bind(errorByType$("popup"))
export const [useFatalError] = bind(errorByType$("fatal_error"))
export const [useIsFatalError] = bind(errorByType$("fatal_error").pipe(
  map(error => error !== null),
  startWith(false),
  distinctUntilChanged()
))