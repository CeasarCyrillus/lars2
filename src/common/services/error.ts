import {AllErrors} from "@backend/error/AllErrors";
import {catchError, NEVER, Observable} from "rxjs";
import {handleError} from "../state/errorState";

export const handleErrors = (errorName: AllErrors) => <T>(source$: Observable<T>) => {
  return source$.pipe(catchError((error) => {
    handleError(error)
    return NEVER
  }))
}