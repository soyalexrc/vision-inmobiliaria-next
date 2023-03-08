import React from 'react';
import {useFormContext, Controller} from "react-hook-form";
import {
  Grid,
  Box,
  Typography,
  Autocomplete,
  TextField,
  MenuItem
} from '@mui/material';
import {states} from "@/../utils/mock-data";
import {RHFSelect, RHFAutocomplete} from "../../../forms";


export function LocationInformationForm() {
  const {register, watch, setValue, control} = useFormContext()

  const propertyTypeWached = watch('property.propertyType')



  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={3}>
        <RHFSelect
          name='property.country'
          label='Pais'
          defaultValue={'Venezuela'}
          control={control}
        >
          <MenuItem value='Venezuela'>Venezuela</MenuItem>
        </RHFSelect>
      </Grid>
      <Grid item xs={12} md={3}>
        <Typography fontWeight='bold' sx={{ marginBottom: -1 }}>Estado</Typography>
        <RHFAutocomplete
          name="location.state"
          options={states}
          getOptionLabel={(option: any) => option || ''}
          defaultValue={null}
        />

        {/*<Autocomplete*/}
        {/*  sx={{ mt: 1}}*/}
        {/*  fullWidth*/}
        {/*  disablePortal*/}
        {/*  id="combo-box-demo"*/}
        {/*  options={states}*/}
        {/*  onChange={(e, newValue) => handleChange('state', newValue)}*/}
        {/*  renderInput={(params) =>*/}
        {/*    <TextField*/}
        {/*      {...params}*/}
        {/*      label=""*/}
        {/*    />*/}
        {/*  }*/}
        {/*/>*/}
      </Grid>
      <Grid item xs={12} md={3}>

        <Typography fontWeight='bold' sx={{mb: 1 }}>Municipio</Typography>
        <TextField
          color='secondary'
          fullWidth
          placeholder='Municipio'
          {...register('location.city')}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <Typography fontWeight='bold' sx={{mb: 1 }}>Urbanizacion / Sector</Typography>
        <TextField
          color='secondary'
          fullWidth
          placeholder='Urbanizacion / Sector'
          {...register('location.municipality')}
          variant="outlined"
        />

      </Grid>
      {/*  */}
      <Grid item xs={12} md={6}>
        <Typography fontWeight='bold' sx={{mb: 1 }}>Avenida</Typography>

        <TextField
          color='secondary'
          fullWidth
          placeholder='Avenida'
          {...register('location.avenue')}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography fontWeight='bold' sx={{mb: 1 }}>Calle</Typography>

        <TextField
          color='secondary'
          fullWidth
          placeholder='Calle'
          {...register('location.street')}
          variant="outlined"
        />
      </Grid>

      {
        propertyTypeWached === 'Apartamento' &&
        <Grid item xs={12} md={4}>
          <Typography fontWeight='bold' sx={{mb: 1 }}>Edificio</Typography>

          <TextField
            color='secondary'
            fullWidth
            placeholder='Edificio'
            {...register('location.buildingShoppingcenter')}
            variant="outlined"
          />
        </Grid>
      }
      {
        (propertyTypeWached === 'Locales Comerciales' || propertyTypeWached === 'Oficinas') &&
        <Grid item xs={12} md={4}>
          <Typography fontWeight='bold' sx={{mb: 1 }}>Centro comercial</Typography>

          <TextField
            color='secondary'
            fullWidth
            placeholder='Centro comercial'
            {...register('location.buildingShoppingcenter')}
            variant="outlined"
          />
        </Grid>
      }
      <Grid item xs={12} md={2}>
        <RHFSelect
          name='property.isClosedStreet'
          label='Es calle cerrada ?'
          defaultValue={'No'}
          control={control}
        >
          <MenuItem value='Si'>Si</MenuItem>
          <MenuItem value='No'>No</MenuItem>
        </RHFSelect>
      </Grid>
      <Grid item xs={12} md={2}>
        <RHFSelect
          name='property.location'
          label='Ubicacion'
          defaultValue={'A pie de calle'}
          control={control}
        >
          <MenuItem value='A pie de calle'>A pie de calle</MenuItem>
          <MenuItem value='Centro comercial'>Centro comercial</MenuItem>
          <MenuItem value='Conjunto residencial'>Conjunto residencial</MenuItem>
          <MenuItem value='Torre de oficinas'>Torre de oficinas</MenuItem>
        </RHFSelect>
      </Grid>
      <Grid item xs={12} md={2}>
        <Typography fontWeight='bold' sx={{mb: 1 }}>Numero</Typography>
        <TextField
          color='secondary'
          fullWidth
          placeholder='Numero'
          {...register('location.buildingNumber')}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12} md={2}>
        <Typography fontWeight='bold' sx={{mb: 1 }}>Piso</Typography>

        <TextField
          color='secondary'
          fullWidth
          placeholder='Piso'
          {...register('location.floor')}
          variant="outlined"
        />
      </Grid>
      {/*  */}
      <Grid item xs={12} md={6}>
        <Typography fontWeight='bold' sx={{mb: 1 }}>Punto de referencia</Typography>
        <TextField
          color='secondary'
          fullWidth
          multiline
          rows={5}
          placeholder='Punto de referencia'
          {...register('location.referencePoint')}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography fontWeight='bold' sx={{mb: 1 }}>Como Llegar?</Typography>

        <TextField
          color='secondary'
          fullWidth
          multiline
          rows={5}
          placeholder='Como Llegar?'
          {...register('location.howToGet')}
          variant="outlined"
        />
      </Grid>

      <Grid item xs={12} md={3}>
        <Typography fontWeight='bold' sx={{mb: 1 }}>Numero de estacionamiento</Typography>
        <TextField
          color='secondary'
          fullWidth
          placeholder='Numero de estacionamiento'
          {...register('location.parkingNumber')}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12} md={3}>

        <Typography fontWeight='bold' sx={{mb: 1 }}>Numero de maletero</Typography>
        <TextField
          color='secondary'
          fullWidth
          placeholder='Numero de maletero'
          {...register('location.trunkNumber')}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <Typography fontWeight='bold' sx={{mb: 1 }}>Nivel de estacionamiento</Typography>
        <TextField
          color='secondary'
          fullWidth
          placeholder='Nivel de estacionamiento'
          {...register('location.parkingLevel')}
          variant="outlined"
        />
      </Grid>

      <Grid item xs={12} md={3}>
        <Typography fontWeight='bold' sx={{mb: 1 }}>Nivel de maletero</Typography>
        <TextField
          color='secondary'
          fullWidth
          placeholder='Nivel de maletero'
          {...register('location.trunkLevel')}
          variant="outlined"
        />
      </Grid>

    </Grid>
  )
}
