import {bind} from "@react-rxjs/core";
import {createSignal} from "@react-rxjs/utils";
import {distinctUntilChanged, map, shareReplay, startWith} from "rxjs";

const [navigationState$, setNavigationState] = createSignal<{ tab: string }>()

export const setCurrentTab = (tab: string) => setNavigationState({tab})

export const [useCurrentTab] = bind(navigationState$.pipe(
    map(s => s.tab),
    shareReplay({bufferSize: 1, refCount: false}),
    distinctUntilChanged(),
    startWith("reports"),
  )
)