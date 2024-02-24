import {createSignal, mergeWithKey} from "@react-rxjs/utils";
import {Observed} from "../lib/Observed";
import {produce} from "immer";
import {assertNever} from "../lib/assertNever";
import {map, scan, shareReplay, startWith} from "rxjs";

type SelectionState = Map<string, number>
type SelectionPayload = {
  id: number,
  selectionName: string
}
const [setSelection$, setSelection] = createSignal<SelectionPayload>()
const [unsetSelection$, unsetSelection] = createSignal<string>()

const signals$ = mergeWithKey(({
  setSelection: setSelection$,
  unsetSelection: unsetSelection$
}))

type Signal = Observed<typeof signals$>

const selectionStateReducer = (current: SelectionState, signal: Signal) => produce(current, draft => {
  switch (signal.type) {
    case "unsetSelection":
      draft.delete(signal.payload)
      break;
    case "setSelection":
      draft.set(signal.payload.selectionName, signal.payload.id)
      break;
    default:
      assertNever(signal)
  }
})

const initialState: SelectionState = new Map<string, number>()
const _selectionState$ = signals$.pipe(
  scan(selectionStateReducer, initialState),
  startWith(initialState),
)

export const selectionState$ = (selectionName: string) => _selectionState$.pipe(
  map(state => state.get(selectionName)),
  map(selection => selection ?? null),
  shareReplay(1),
)

export {setSelection, unsetSelection}