import {CircularProgress} from "@mui/material";
import {FullPageLoadingSpinnerWrapper} from "./FullPageLoadingSpinner.style";

export const FullPageLoadingSpinner = () => {
  return <FullPageLoadingSpinnerWrapper open={true}>
    <CircularProgress size={50}/>
  </FullPageLoadingSpinnerWrapper>
}