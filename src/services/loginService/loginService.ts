import {Observable, Subject} from "rxjs";
import Config from "../../configuration.local.json"
import {SessionService, token_key} from "../sessionService/sessionService";
import {unknownError, unknownFatalError} from "../../state/errorState";

type LoginServiceDependencies = {
  sessionService: SessionService
}

export type LoginService = {
  login: (email: string, password: string) => Promise<void>
  token$: () => Observable<string | null>
}
export const createLoginService = (dependencies: LoginServiceDependencies): LoginService => {
  const {sessionService} = dependencies
  const token$ = new Subject<string>()
  const login = async (email: string, password: string) => {
    throw "NOPE!"
    const url = Config.endpointURL + "/login";
    const response = await fetch(url, {
      method: "POST",
      headers: {"content-type": "application/json"},
      body: JSON.stringify({email, password})
    })

    const body = await response.json()
    if (response.status !== 200) {
      throw unknownFatalError()
    }

    if (body.type === "error") {
      throw unknownError(body.message)
    }

    const token = body.data.token
    token$.next(token)
    sessionService.set(token_key, {token})
  }

  const storedToken = () => sessionService.get<{ token: string }>(token_key)?.token ?? null

  return {
    login,
    token$: () => {
      throw "NOPE";
    }
  }
}