import moment from "moment";

export const dateTimeFormatter = (date: string | Date) => moment(date).format("YYYY-MM-DD hh:mm")
export const reportPeriodValueFormatter = (params: { value: string | Date } | null) => {
  if (!params) {
    return ""
  }

  return dateTimeFormatter(params.value)
}