import {CustomFloatingFilterProps} from "ag-grid-react";
import {TextFilterModel} from "ag-grid-community";
import {Box} from "@mui/material";
import {useTranslation} from "react-i18next";
import moment from "moment";
import {range} from "../../../common/lib/utils";
import {SearchableDropdown} from "../../../common/components/form/SearchableDropdown";

const getMonths = () => range(12, (i) => moment().month(i).month())
const getYears = () => range(30, (i) => moment().year(moment().year() - i));

const getApplyFilter = (model: TextFilterModel | null, onModelChange: (model: (TextFilterModel | null)) => void) =>
  (newYear: number | null, newMonth: number | null) => {
    if (newYear === null) {
      onModelChange(null)
      return
    }

    const monthString = newMonth !== null && isNotFutureMonth(newMonth, newYear) ? `-${moment().month(newMonth).format("MM")}` : ""
    const dateString = `${newYear}${monthString}`
    onModelChange({
      filterType: "text",
      type: "startsWith",
      filter: dateString,
    })
  }

export const PeriodFilter = (props: CustomFloatingFilterProps<any, any, any, TextFilterModel>) => {
  const {onModelChange, model} = props
  const applyFilter = getApplyFilter(model, onModelChange)
  const {t} = useTranslation()

  const monthMoment = model ? moment(model.filter, "YYYY-MM", true) : null
  const selectedYear = model ? moment(model.filter).year() : null
  const selectedMonth = monthMoment && monthMoment.isValid() ? monthMoment.month() : null


  const monthOptions = getMonths()
    .filter((month) => isNotFutureMonth(month, selectedYear))
    .map(month => ({
        label: moment().month(month).format("MMM"),
        value: month.toString(),
      })
    )

  const yearOptions = getYears()
    .map((year) => ({label: year.year().toString(), value: year.year().toString()}))

  const setYear = (newYear: string | null) => {
    applyFilter(newYear ? Number(newYear) : null, selectedMonth)
  }

  const setMonth = (newMonth: string | null) => {
    applyFilter(selectedYear, newMonth ? Number(newMonth) : null)
  }

  return <Box sx={{width: "100%"}}>
    <SearchableDropdown
      label={t("year")}
      options={yearOptions}
      onChange={setYear}
      value={selectedYear?.toString() ?? null}/>
    <br/>
    <SearchableDropdown
      label={t("month")}
      options={monthOptions}
      onChange={setMonth}
      disabled={selectedYear === null}
      value={selectedMonth?.toString() ?? null}/>
  </Box>
}

const isNotFutureMonth = (month: number, selectedYear: null | number) => {
  const today = moment()
  const currentYearIsSelected = selectedYear !== null && today.year() === selectedYear
  if (currentYearIsSelected) {
    return month <= today.month();
  }
  return true
};
