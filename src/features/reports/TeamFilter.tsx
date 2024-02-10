import {ChangeEvent, Fragment} from "react";
import {Box} from "@mui/material";
import {Subscribe} from "@react-rxjs/core";
import {CustomFloatingFilterProps} from "ag-grid-react";


export const TeamFilterWrapper = ({model, onModelChange}: CustomFloatingFilterProps) => {
  return <></>
  console.log("CC: model", model)
  return <Box width={300}>
    <Subscribe>
      <input
        value={model ?? ""}
        onChange={value => {
          onModelChange(value)
        }
        }/>
    </Subscribe>
  </Box>
}

export const TeamFilter2 = (props: CustomFloatingFilterProps) => {
  const teamOptions = []
  console.log("CC: model", props.model)
  return null
}


export const TeamFilter = ({model, onModelChange, color}: any) => {
  const value = (model && model.filter) || '';
  const onInput = ({target: {value: newValue},}: ChangeEvent<HTMLInputElement>) => {
    onModelChange(
      newValue === ''
        ? null
        : {
          ...(model || {
            type: 'greaterThan',
          }),
          filter: Number(newValue),
        }
    );
  };

  const style = {
    borderColor: color,
    width: '30px',
  };

  return (
    <Fragment>
      &gt;{' '}
      <input
        value={value}
        style={style}
        type="number"
        min="0"
        onInput={onInput}
      />
    </Fragment>
  );
};