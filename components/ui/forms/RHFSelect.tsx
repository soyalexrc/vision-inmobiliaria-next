import {Select, Typography, FormControl} from "@mui/material";
import {Controller} from "react-hook-form";

interface RHGSelectProps {
  name: string;
  label: string;
  control?: any;
  defaultValue?: any;
  children: any[] | any;
}

export const  RHFSelect = (
  {
    name,
    label,
    control,
    defaultValue,
    children,
  }: RHGSelectProps) => {
  return (
    <FormControl fullWidth>
      <Typography sx={{ mb: 1 }}>{label}</Typography>
      <Controller
        render={({
          field: {value, ref, onChange}
         }) => (
          <Select
            inputRef={ref}
            value={value}
            onChange={onChange}
          >
            {children}
          </Select>
        )}
        name={name}
        control={control}
        defaultValue= {defaultValue}
      />
    </FormControl>
  )
};
