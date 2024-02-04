import moment from "moment";

export const reportPeriodValueFormatter = (params: { value: string } | null) => {
  if (!params) {
    return ""
  }

  return moment(params.value).format("MMM YYYY")
}