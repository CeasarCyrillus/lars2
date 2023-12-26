import {withSubscribe} from "../../withSubscribe";
import {ReConnectionToast} from "./ReConnectingToast";
import {ReConnectedToast} from "./ReConnectedToast";
import {ConnectionErrorToast} from "./ConnectionErrorToast";

export const AllToasts = withSubscribe(() => {
  return (
    <>
      <ReConnectionToast/>
      <ReConnectedToast/>
      <ConnectionErrorToast/>
    </>
  )
})