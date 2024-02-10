import {useAllTeams} from "../../../common/state/teamState"
import {SearchableDropdown} from "../../../common/components/form/SearchableDropdown";
import {CustomFloatingFilterProps} from "ag-grid-react";
import {TextFilterModel} from "ag-grid-community";
import {useTranslation} from "react-i18next";
import {withSubscribe} from "../../../common/lib/withSubscribe";

export const TeamFilter = withSubscribe(({
                                           onModelChange,
                                           model
                                         }: CustomFloatingFilterProps<any, any, any, TextFilterModel>) => {
  const {t} = useTranslation()
  const allTeams = useAllTeams()
  const options = allTeams.map(team => ({value: team.name, label: team.name}))
  return <SearchableDropdown
    label={t("team")}
    options={options}
    onChange={(option) => onModelChange({
      type: "equals",
      filterType: "text",
      filter: option
    })}
    value={model?.filter ?? null}
  />
})