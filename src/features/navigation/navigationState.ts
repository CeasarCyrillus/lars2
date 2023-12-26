import {bind} from "@react-rxjs/core";
import {createSignal} from "@react-rxjs/utils";
import {map, shareReplay, startWith} from "rxjs";

type NavigationState = { path: "start" | "main" | "login" }

const [navigationState$, setNavigationState] = createSignal<NavigationState>()

export const goToMain = () => setNavigationState({path: "main"})
export const goToLogin = () => setNavigationState({path: "login"})

const initial: NavigationState["path"] = "start"

export const [useNavigationPath] = bind<NavigationState["path"]>(navigationState$.pipe(
  map(state => state.path),
  startWith(initial),
  shareReplay(),
))