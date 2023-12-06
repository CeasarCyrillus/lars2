import {Observable, shareReplay, startWith} from "rxjs";
import {createSignal} from "@react-rxjs/utils";
import Config from "../../configuration.local.json"
import {SessionService, token_key} from "../sessionService/sessionService";

type LoginServiceDependencies = {
  sessionService: SessionService
}

export type LoginService = {
  login: (email: string, password: string) => Promise<void>
  token$: Observable<string | null>
}
export const createLoginService = (dependencies: LoginServiceDependencies): LoginService => {
  const {sessionService} = dependencies
  const [token$, setToken] = createSignal<string>()
  const login = async (email: string, password: string) => {
    const url = Config.endpointURL + "/login";
    const response = await fetch(url, {
      method: "POST",
      headers: {"content-type": "application/json"},
      body: JSON.stringify({email, password})
    })
    const {token} = await response.json()
    setToken(token)
    sessionService.set(token_key, {token})
  }

  const storedToken = () => sessionService.get<{ token: string }>(token_key)?.token ?? null
  return {
    login,
    token$: token$.pipe(
      shareReplay({bufferSize: 1, refCount: false}),
      startWith(storedToken()),
    )
  }
}