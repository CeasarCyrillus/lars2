import {MenuItem, Select, Typography} from "@mui/material"
import {ComponentType} from "react";

export type Option = {
  label: string,
  value: string
}

type Props = {
  label: string,
  options: Option[]
  OptionComponent?: ComponentType<{ children: string, value: string }>
  value: string,
  onChange: (value: string) => void
  noneSelectedLabel?: string
  placeholder?: string
}

const PlaceHolder = (props: { placeholder: string }) => <Typography
  sx={{color: "gray", fontWeight: 400, fontSize: "inherit"}}><em>{props.placeholder}</em></Typography>
export const Dropdown = (props: Props) => {
  const {options, noneSelectedLabel, value, onChange, OptionComponent, placeholder} = props
  const renderer = (!value && placeholder) ? () => <PlaceHolder placeholder={placeholder}/> : undefined
  return <Select
    size={"small"}
    value={value}
    onChange={(event) => onChange(event.target.value)}
    renderValue={renderer}
    displayEmpty
  >
    {noneSelectedLabel &&
        <MenuItem
            value={undefined}
        >
            <PlaceHolder placeholder={noneSelectedLabel}/>
        </MenuItem>}
    {options.map(option =>
      <MenuItem
        key={option.value}
        value={option.value}
      >
        {OptionComponent ?
          <OptionComponent value={option.value}>{option.label}</OptionComponent> :
          option.label
        }
      </MenuItem>)}
  </Select>
}