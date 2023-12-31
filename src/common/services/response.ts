import {AllErrors} from "@backend/error/AllErrors"
import {ErrorResponse, Response, SuccessResponse} from "@backend/socket/response/Response"

export const isSuccessResponse = <T>(response: Response<T, any>): response is SuccessResponse<T> => {
  return response.type === "success"
}

export const isErrorResponse = (response: Response<any, AllErrors>): response is ErrorResponse<AllErrors> => {
  return response.type === "error"
}