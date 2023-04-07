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
import {RHFAutocomplete, RHFSelect} from "../../../forms";
import {axiosInstance} from "../../../../../utils";
import {Ally, ExternalAdviser, Owner} from "../../../../../interfaces";
import {AuthContext} from "../../../../../context/auth";
import {useRouter} from "next/router";
import {TYPE_OF_PROPERTY} from "../../../../../utils/properties";

export function NegotiationInformationForm() {
  const {register, control, setValue, watch, getValues} = useFormContext()
  const router = useRouter()
  const [loading, setLoading] = React.useState<boolean>(false)
  const [owners, setOwners] = React.useState<Owner[]>([])
  const [advisers, setAdvisers] = React.useState<ExternalAdviser[]>([])
  const [allies, setAllies] = React.useState<Ally[]>([]);
  const {currentUser} = React.useContext(AuthContext)
  const ownerWatched = watch('property.owner')


  async function getData() {
    try {
      setLoading(true);
      Promise.all([getOwners(), getAllies(), getAdvisers()])
        .then(values => {
          setOwners(values[0])
          setAllies(values[1])
          setAdvisers(values[2])
        })
    } catch(e) {
    }
    finally {
      setLoading(false);
    }
  }

  async function getOwners() {
      const response = await axiosInstance.get('/owner/getAllData?type=Propietarios');
        return response.data
  }
  async function getAllies() {
      const response = await axiosInstance.get('owner/getAllData?type=Aliados');
        return response.data
  }
  async function getAdvisers() {
      const response = await axiosInstance.get('owner/getAllData?type=Asesores%20Externos');
        return response.data
  }

  React.useEffect(() => {
    getData()
    if (router.pathname.includes('crear')) {
      setValue('property.adviser', currentUser)
    }
  }, [])

  React.useEffect(() => {
    if (ownerWatched) {
      setValue('clientData.firstName', ownerWatched.first_name)
      setValue('clientData.lastName', ownerWatched.last_name)
      setValue('clientData.cellPhone', ownerWatched.phone)
      setValue('clientData.birthday', ownerWatched.birthday)
      setValue('clientData.email', ownerWatched.email)
    } else {
      setValue('clientData.firstName', '')
      setValue('clientData.lastName', '')
      setValue('clientData.cellPhone', '')
      setValue('clientData.birthday', '')
      setValue('clientData.email', '')
    }
  }, [ownerWatched])


  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={3}>
        <Typography fontWeight='bold' sx={{mb: 1}}>Precio del inmueble</Typography>
        <TextField
          color='secondary'
          fullWidth
          placeholder='Precio'
          {...register('property.price')}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <RHFSelect
          name='clientData.partOfPayment'
          label='Recibe como medio de pago'
          defaultValue={'Inmueble Valor Menor'}
          control={control}
        >
          <MenuItem value='Vehiculo'>Vehiculo</MenuItem>
          <MenuItem value='Inmueble Valor Menor'>Inmueble Valor Menor</MenuItem>
          <MenuItem value='Ambos'>Ambos</MenuItem>
          <MenuItem value='Solo Dinero'>Solo Dinero</MenuItem>
        </RHFSelect>
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
          {...register('property.minimunNegotiation')}
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
          {...register('property.observations')}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <Typography fontWeight='bold' sx={{mb: 1}}>Asesor</Typography>
        <TextField
          disabled
          color='secondary'
          fullWidth
          placeholder='Asesor'
          {...register('property.adviser.username')}
          variant="outlined"
          helperText='Nombre de usuario responsable de crear esta propiedad'
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <Typography fontWeight='bold' sx={{mb: 1}}>Aliado</Typography>
        <RHFAutocomplete
          sx={{marginTop: '-1rem'}}
          name="property.ally"
          control={control}
          options={allies}
          getOptionLabel={(option: any) => option.first_name || ''}
          defaultValue={null}
          label='Seleccionar'
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <Typography fontWeight='bold' sx={{mb: 1}}>Capacitador Externo</Typography>
        <TextField
          color='secondary'
          fullWidth
          placeholder='Capacitador Externo'
          {...register('property.externalCapacitor')}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12}>
        <Divider sx={{my: 3}}/>
      </Grid>
      <Grid item xs={12} >
        <Typography variant='h5'>Datos de cliente</Typography>
      </Grid>
      <Grid item xs={12} >
        <Typography fontWeight='bold' sx={{mb: 1}}>Seleccionar cliente</Typography>
        <RHFAutocomplete
          name="property.owner"
          control={control}
          options={owners}
          getOptionLabel={(option: any) => option.first_name || ''}
          defaultValue={null}
          label='Seleccionar propietario'
        />
      </Grid>
      {/*  datos de cliente */}

      <Grid item xs={12} md={3}>
        <Typography fontWeight='bold' sx={{mb: 1}}>Nombres</Typography>
        <TextField
          color='secondary'
          disabled
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
          disabled
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
          disabled
          fullWidth
          {...register('clientData.cellPhone')}
          variant="outlined"
        />

      </Grid>
      <Grid item xs={12} md={3}>
        <Typography fontWeight='bold' sx={{mb: 1}}>Email</Typography>
        <TextField
          color='secondary'
          disabled
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
          disabled
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
