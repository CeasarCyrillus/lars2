import {selectionState$, setSelection} from "./selectionState";
import {of, shareReplay, switchMap} from "rxjs";
import {userService} from "../services/userService/api";
import {bind} from "@react-rxjs/core";

export const userDataName = "user"
export const maybeSelectedUser$ = selectionState$(userDataName).pipe(
  switchMap(userId =>
    userId ?
      userService.user$(userId) :
      of(null)),
  shareReplay(1)
)

export const setSelectedUser = (userId: number) => setSelection({id: userId, selectionName: userDataName})
export const [useMaybeSelectedUser] = bind(maybeSelectedUser$)