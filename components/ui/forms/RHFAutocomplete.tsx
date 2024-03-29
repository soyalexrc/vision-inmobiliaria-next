import { Controller } from 'react-hook-form';
import { Autocomplete, TextField } from '@mui/material';
import React from 'react';

export const RHFAutocomplete = ({
  options = [],
  getOptionLabel,
  ignored,
  label,
  disabled = false,
  defaultValue,
  name,
  control,
  renderOption,
  size = 'medium',
  sx = {},
}: any) => {
  return (
    <Controller
      render={({ field: { value, onChange } }) => (
        <Autocomplete
          sx={sx}
          options={options}
          getOptionLabel={getOptionLabel}
          renderOption={renderOption}
          renderInput={(params: any) => <TextField {...params} size={size} label={label} margin="normal" />}
          onChange={(values, value) => onChange(value)}
          value={value}
          disabled={disabled}
        />
      )}
      control={control}
      defaultValue={defaultValue}
      name={name}
    />
  );
};
