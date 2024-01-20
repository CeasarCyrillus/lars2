import {Alert, CircularProgress, Snackbar, Typography} from "@mui/material";

type Props = {
  show: boolean,
  title: string,
  description: string,
  status: "error" | "loading" | "success" | "info",
  duration?: number,
  onClose?: () => void
}
export const Toast = (props: Props) => {
  const {show, onClose, title, description, status, duration} = props
  const muiStatus = status !== "loading" ? status : "info"
  const isLoading = status === "loading"
  const icon = isLoading ? <CircularProgress size={20}/> : undefined
  return <Snackbar
    anchorOrigin={{vertical: "bottom", horizontal: "center"}}
    open={show}
    autoHideDuration={duration}
    onClose={onClose}>
    <Alert
      severity={muiStatus}
      onClose={onClose}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Typography>{description}</Typography>
    </Alert>
  </Snackbar>
}