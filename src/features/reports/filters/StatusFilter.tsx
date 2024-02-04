import {ReportStatus} from "@backend/dto/ReportStatus";
import {CustomFloatingFilterProps} from "ag-grid-react";
import {useTranslation} from "react-i18next";
import {Dropdown} from "../../../common/components/form/Dropdown";
import {ReportStatusCellRenderer} from "../renderers/ReportStatusCellRenderer";
import {TextFilterModel} from "ag-grid-community";
import {useMemo} from "react";

type StatusOption = { value: ReportStatus, label: string };
const useStatusOptions = () => {
  const {t} = useTranslation()
  return useMemo(() => {
    const options: StatusOption[] = [
      {label: t(`reportStatus.not-started`), value: "not-started"},
      {label: t(`reportStatus.in-progress`), value: "in-progress"},
      {label: t(`reportStatus.approved`), value: "approved"},
      {label: t(`reportStatus.past-deadline`), value: "past-deadline"},
    ]

    return options
  }, [t])
}

export const StatusFilter = (props: CustomFloatingFilterProps<any, any, any, TextFilterModel>) => {
  const {model, onModelChange} = props
  const {t} = useTranslation()
  const options = useStatusOptions()

  const onChange = (value: string) => {
    if (!value) {
      onModelChange(null)
    } else {
      onModelChange({
        filterType: "text",
        filter: value,
        type: "equals"
      })
    }

  }

  return <Dropdown
    label={"Status"}
    options={options}
    onChange={onChange}
    value={model?.filter ?? ""}
    noneSelectedLabel={t("clearDropdown")}
    placeholder={t("filterReportStatus")}
    OptionComponent={(props) => <ReportStatusCellRenderer status={props.value as ReportStatus}/>}
  />
}