import {selectionState$, setSelection, unsetSelection} from "../../../state/selectionState";
import {bind, shareLatest} from "@react-rxjs/core";
import {filter, map, merge, switchMap} from "rxjs";
import {userService} from "../../../services/userService/api";
import {userDataName} from "../../../state/userState";

const userSelectionState$ = selectionState$(userDataName).pipe(shareLatest())
const userIsSelected$ = userSelectionState$.pipe(
  map(selection => selection !== null),
)
export const setSelectedUser = (userId: number) => setSelection({id: userId, selectionName: userDataName})
export const unsetSelectedUser = () => unsetSelection(userDataName)
const [useSelectedUser, selectedUser$] = bind(userSelectionState$.pipe(
  filter(Boolean),
  switchMap(userService.user$),
))

export const [useIsDetailsModalOpen] = bind(merge(selectedUser$, userIsSelected$).pipe(
  map(isSelected => !!isSelected),
))

export {useSelectedUser}