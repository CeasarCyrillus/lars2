import {bind} from "@react-rxjs/core";
import {createSignal} from "@react-rxjs/utils";
import {map, startWith} from "rxjs";

type KnownErrorType = "popup" | "silent" | "server_unreachable"
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
  type: "server_unreachable",
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

const errorByType$ = (type: ErrorType) =>
  maybeError$.pipe(
    map(error => {
      if (error?.type === type) {
        return error
      }
      return null
    }),
  )

export const [usePopupError] = bind(errorByType$("popup"))
export const [useUnknownFatalError] = bind(errorByType$("unknown_fatal_error"))