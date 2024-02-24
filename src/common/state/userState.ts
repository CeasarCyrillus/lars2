import {selectionState$, setSelection, unsetSelection} from "./selectionState";
import {of, switchMap} from "rxjs";
import {userService} from "../services/userService/api";
import {bind} from "@react-rxjs/core";

export const userDataName = "user"
export const maybeSelectedUser$ = selectionState$(userDataName).pipe(
  switchMap(userId =>
    userId ?
      userService.user$(userId) :
      of(null))
)

export const setSelectedUser = (userId: number) => setSelection({id: userId, selectionName: userDataName})
export const unsetSelectedUser = () => unsetSelection(userDataName)
export const [useMaybeSelectedUser] = bind(maybeSelectedUser$)