import {Autocomplete, TextField} from "@mui/material";
import {Option} from "./Dropdown";

type Props = {
  label: string
  options: Option[]
  onChange: (newValue: string | null) => void
  value: string | null
  disabled?: boolean
  noneSelectedLabel?: string
}
export const SearchableDropdown = (props: Props) => {
  const {value, label, options, onChange, disabled} = props
  return <Autocomplete
    disabled={disabled}
    size={"small"}
    value={options.find(option => option.value === value) ?? null}
    isOptionEqualToValue={(option, value) => option.value === value.value}
    onChange={(_, selectedOption) => onChange(selectedOption?.value ?? null)}
    renderInput={(params) => <TextField {...params} placeholder={label}/>}
    options={options}
  />
}