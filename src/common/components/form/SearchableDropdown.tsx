import {Autocomplete, TextField} from "@mui/material";

type Props = {
  label: string
  options: { label: string, value: number }[]
}
export const SearchableDropdown = (props: Props) => {
  const {label, options} = props
  return <Autocomplete
    sx={{width: 300}}
    renderInput={(params) => <TextField {...params} label={label}/>}
    options={options}
  />
}