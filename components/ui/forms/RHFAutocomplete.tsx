import {Controller} from "react-hook-form";
import {Autocomplete, TextField} from "@mui/material";
import React from "react";

export const RHFAutocomplete = (
  { options = [],
    getOptionLabel,
    ignored,
    defaultValue,
    name,
    renderOption
  } : any) => {
  return (
    <Controller
      render={({
        field: {value, onChange}
       }) => (
        <Autocomplete
          options={options}
          getOptionLabel={getOptionLabel}
          renderOption={renderOption}
          renderInput={(params: any) => <TextField {...params} margin="normal" />}
          onChange={onChange}
          value={value}
        />
      )}
      defaultValue={defaultValue}
      name={name}
    />
  );
}
