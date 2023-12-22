import {Observable, shareReplay, startWith, tap} from "rxjs";
import {createSignal} from "@react-rxjs/utils";
import Config from "../../configuration.local.json"
import {SessionService, token_key} from "../sessionService/sessionService";
import {handleError, unknownError} from "../../state/errorState";

type LoginServiceDependencies = {
  sessionService: SessionService
}

export type LoginService = {
  login: (email: string, password: string) => Promise<boolean>
  token$: Observable<string | null>
}
export const createLoginService = (dependencies: LoginServiceDependencies): LoginService => {
  const {sessionService} = dependencies
  const [token$, setToken] = createSignal<string>()
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const url = Config.endpointURL + "/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify({email, password})
      })

      const body = await response.json()
      if (response.status !== 200) {
        handleError(unknownError())
        return false
      }

      if (body.result === "failure") {
        handleError(body.error)
        return false
      }

      const token = body.data.token
      setToken(token)
      sessionService.set(token_key, {token})
      return true
    } catch (e) {
      handleError(e)
      return false
    }
  }

  const storedToken = () => sessionService.get<{ token: string }>(token_key)?.token ?? null
  return {
    login,
    token$: token$.pipe(
      shareReplay({bufferSize: 1, refCount: false}),
      startWith(storedToken()),
      tap((x) => console.log("CC: token is", x))
    )
  }
}