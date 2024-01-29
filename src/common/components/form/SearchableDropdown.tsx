import {Autocomplete, TextField} from "@mui/material";

type Option = {
  label: string,
  value: number
}
type Props = {
  label: string
  options: Option[]
  onChange: (newValue: Option | null) => void
  value: Option | null
}
export const SearchableDropdown = (props: Props) => {
  const {value, label, options, onChange} = props
  return <Autocomplete
    value={value}
    onChange={(_, selectedOption) => onChange(selectedOption ?? null)}
    renderInput={(params) => <TextField {...params} label={label}/>}
    options={options}
  />
}