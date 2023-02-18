
import React from 'react';
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Box
} from "@mui/material";
import {useFormContext} from "react-hook-form";

export function PublicationSourceForm() {
  const {register} = useFormContext()
  return (
    <Box px={3}>
      <FormGroup>
        <FormControlLabel {...register('publicationSource.instagram')} control={<Checkbox />} label="Instagram" />
        <FormControlLabel {...register('publicationSource.facebook')} control={<Checkbox />} label="Facebook" />
        <FormControlLabel {...register('publicationSource.tiktok')} control={<Checkbox />} label="Tik Tok" />
        <FormControlLabel {...register('publicationSource.mercadolibre')} control={<Checkbox />} label="Mercadolibre" />
        <FormControlLabel {...register('publicationSource.conlallave')} control={<Checkbox />} label="Conlallave" />
        <FormControlLabel {...register('publicationSource.whatsapp')} control={<Checkbox />} label="Grupos de whatsapp" />
      </FormGroup>
    </Box>
  )
}
