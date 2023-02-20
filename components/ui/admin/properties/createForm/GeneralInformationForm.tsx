import React from 'react';
import {useFormContext} from "react-hook-form";
import {FormControl, Grid, InputAdornment, MenuItem, Select, TextField, Typography} from "@mui/material";
import {RHFSelect} from "../../../forms";

export function GeneralInformationForm() {
  const {register, watch, control} = useFormContext()

  const propertyTypeWached = watch('property.propertyType')
  const operationTypeWached = watch('property.operationType')

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={6}>
        <Typography fontWeight='bold' sx={{mb: 1}}>Compania</Typography>
        <TextField
          color='secondary'
          fullWidth
          placeholder='Compania'
          disabled
          {...register('property.company')}
          value='Vision Inmobiliaria'
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <Typography fontWeight='bold' sx={{mb: 1}}>Codigo</Typography>
        <TextField
          color='secondary'
          fullWidth
          placeholder='Codigo'
          {...register('property.code')}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <RHFSelect
          name='property.operationType'
          label='Tipo de operacion'
          defaultValue={'Venta'}
          control={control}
        >
          <MenuItem value='Venta'>Venta</MenuItem>
          <MenuItem value='Alquiler'>Alquiler</MenuItem>
        </RHFSelect>
      </Grid>
      {/*  */}
      <Grid item xs={12} md={4}>
        <RHFSelect
          name='property.propertyType'
          label='Tipo de inmueble'
          defaultValue={'Apartamentos'}
          control={control}
        >
          <MenuItem value='Apartamento'>Apartamento</MenuItem>
          <MenuItem value='Locales Comerciales'>Locales Comerciales</MenuItem>
          <MenuItem value='Galpones'>Galpones</MenuItem>
          <MenuItem value='Terrenos'>Terrenos</MenuItem>
          <MenuItem value='Oficinas'>Oficinas</MenuItem>
          <MenuItem value='Casa / Townhouse'>Casa / Townhouse</MenuItem>
          <MenuItem value='Fondos de Comercio'>Fondos de Comercio</MenuItem>
        </RHFSelect>

      </Grid>
      <Grid item xs={12} md={4}>
        <RHFSelect
          name='property.propertyCondition'
          label='Tipo de mercado'
          defaultValue={'Mercado primario'}
          control={control}
        >
          <MenuItem value='Mercado Primario'>Mercado Primario</MenuItem>
          <MenuItem value='Mercado Secundario'>Mercado Secundario</MenuItem>
        </RHFSelect>

      </Grid>
      <Grid item xs={12} md={2}>
        <Typography fontWeight='bold' sx={{mb: 1}}>Metraje (Terreno)</Typography>
        <TextField
          color='secondary'
          fullWidth
          placeholder='Terreno'
          {...register('property.footageGround')}
          InputProps={{
            endAdornment:
              <InputAdornment position="end">Mt2</InputAdornment>
          }}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12} md={2}>
        {
          propertyTypeWached !== 'Apartamento' &&
          <>
            <Typography fontWeight='bold' sx={{mb: 1}}>Metraje (Construc...)</Typography>
            <TextField
              color='secondary'
              fullWidth
              placeholder='Contstruccion'
              {...register('property.footageBuilding')}
              InputProps={{
                endAdornment:
                  <InputAdornment position="end">Mt2</InputAdornment>
              }}
              variant="outlined"
            />
          </>
        }
      </Grid>
      <Grid item xs={12} >
        <Typography fontWeight='bold' sx={{mb: 1}}>Titulo de inmueble</Typography>
        <TextField
          color='secondary'
          disabled
          fullWidth
          placeholder='Tipo de inmueble + Operacion'
          value={propertyTypeWached + ' - ' + operationTypeWached}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12}>
        <Typography fontWeight='bold' sx={{mb: 1}}>Descripcion de inmueble</Typography>
        <TextField
          color='secondary'
          fullWidth
          multiline
          rows={5}
          placeholder='Descripcion de inmueble'
          {...register('property.description')}
          variant="outlined"
        />
      </Grid>

    </Grid>
  )
}
