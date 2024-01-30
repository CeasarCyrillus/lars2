import {MenuItem, Select} from "@mui/material"
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
}

export const nothingSelected = "nothingSelected"
export const Dropdown = (props: Props) => {
  const {options, noneSelectedLabel, value, onChange, OptionComponent} = props
  return <Select
    size={"small"}
    value={value}
    onChange={(event) => onChange(event.target.value)}
  >
    {noneSelectedLabel &&
        <MenuItem
            value={nothingSelected}
        >
            <em>{noneSelectedLabel}</em>
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