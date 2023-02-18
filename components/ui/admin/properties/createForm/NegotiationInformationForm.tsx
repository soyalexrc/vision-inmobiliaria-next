import React from 'react';
import {
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
  Divider,
  Box,
  InputAdornment
} from "@mui/material";
import {useFormContext} from "react-hook-form";

export function NegotiationInformationForm() {
  const {register} = useFormContext()

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={3}>
        <Typography fontWeight='bold' sx={{mb: 1}}>Precio del inmueble</Typography>
        <TextField
          color='secondary'
          fullWidth
          placeholder='Precio'
          {...register('clientData.price')}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <Typography fontWeight='bold' sx={{mb: 1}}>Recibe como medio de pago</Typography>
        <FormControl fullWidth>
          <Select defaultValue='' {...register('clientData.partOfPayment')}>
            <MenuItem value='Vehiculo'>Vehiculo</MenuItem>
            <MenuItem value='Inmueble Valor Menor'>Inmueble Valor Menor</MenuItem>
            <MenuItem value='Ambos'>Ambos</MenuItem>
            <MenuItem value='Solo Dinero'>Solo Dinero</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={3}>
        <Typography fontWeight='bold' sx={{mb: 1}}>Porcentaje de comision</Typography>
        <TextField
          color='secondary'
          fullWidth
          placeholder='Porcentaje de comision'
          {...register('clientData.comission')}
          InputProps={{
            endAdornment:
              <InputAdornment position="end">%</InputAdornment>
          }}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <Typography fontWeight='bold' sx={{mb: 1}}>Negociacion minima</Typography>
        <TextField
          color='secondary'
          fullWidth
          placeholder='Negociacion minima'
          {...register('clientData.minimunNegotiation')}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12}>
        <Typography fontWeight='bold' sx={{mb: 1}}>Motivo de venta / alquiler</Typography>
        <TextField
          color='secondary'
          fullWidth
          multiline
          rows={5}
          placeholder='Motivo de venta / alquiler'
          {...register('clientData.observations')}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12}>
        <Divider sx={{my: 3}}/>
      </Grid>
      <Grid item xs={12}>
        <Typography variant='h5'>Datos de cliente</Typography>
      </Grid>
      {/*  datos de cliente */}

      <Grid item xs={12} md={3}>
        <Typography fontWeight='bold' sx={{mb: 1}}>Nombres</Typography>
        <TextField
          color='secondary'
          fullWidth
          placeholder='Nombres'
          {...register('clientData.firstName')}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <Typography fontWeight='bold' sx={{mb: 1}}>Apellidos</Typography>
        <TextField
          color='secondary'
          fullWidth
          placeholder='Apellidos'
          {...register('clientData.lastName')}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <Typography fontWeight='bold' sx={{mb: 1}}>Telefono</Typography>
        <TextField
          color='secondary'
          fullWidth
          {...register('clientData.cellPhone')}
          variant="outlined"
        />

      </Grid>
      <Grid item xs={12} md={3}>
        <Typography fontWeight='bold' sx={{mb: 1}}>Email</Typography>
        <TextField
          color='secondary'
          fullWidth
          placeholder='Email'
          {...register('clientData.email')}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <Typography fontWeight='bold' sx={{mb: 1}}>Fecha de cumpleanos</Typography>
        <TextField
          color='secondary'
          fullWidth
          type='date'
          placeholder='Email'
          {...register('clientData.birthday')}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12}>
        <Divider sx={{my: 3}}/>
      </Grid>
      <Grid item xs={12}>
        <Typography variant='h5'>Persona de contacto</Typography>
      </Grid>
      {/*  datos de persona de contacto */}

      <Grid item xs={12} md={3}>
        <Typography fontWeight='bold' sx={{mb: 1}}>Nombres</Typography>
        <TextField
          color='secondary'
          fullWidth
          placeholder='Nombres'
          {...register('clientData.contactFirstName')}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <Typography fontWeight='bold' sx={{mb: 1}}>Apellidos</Typography>
        <TextField
          color='secondary'
          fullWidth
          placeholder='Apellidos'
          {...register('clientData.contactLastName')}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <Typography fontWeight='bold' sx={{mb: 1}}>Telefono</Typography>
        <TextField
          color='secondary'
          fullWidth
          {...register('clientData.contactCellPhone')}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <Typography fontWeight='bold' sx={{mb: 1}}>Email</Typography>
        <TextField
          color='secondary'
          fullWidth
          placeholder='Email'
          {...register('clientData.contactEmail')}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12}>
        <Divider sx={{my: 3}}/>
      </Grid>
      <Grid item xs={12}>
        <Typography variant='h5'>Apoderado</Typography>
      </Grid>
      {/*  datos de apoderado */}

      <Grid item xs={12} md={3}>
        <Typography fontWeight='bold' sx={{mb: 1}}>Nombres</Typography>
        <TextField
          color='secondary'
          fullWidth
          placeholder='Nombres'
          {...register('clientData.attorneyFirstName')}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <Typography fontWeight='bold' sx={{mb: 1}}>Apellidos</Typography>
        <TextField
          color='secondary'
          fullWidth
          placeholder='Apellidos'
          {...register('clientData.attorneyLastName')}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <Typography fontWeight='bold' sx={{mb: 1}}>Telefono</Typography>
        <TextField
          color='secondary'
          fullWidth
          {...register('clientData.attorneyCellPhone')}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <Typography fontWeight='bold' sx={{mb: 1}}>Email</Typography>
        <TextField
          color='secondary'
          fullWidth
          placeholder='Email'
          {...register('clientData.attorneyEmail')}
          variant="outlined"
        />
      </Grid>

    </Grid>
  )
}
