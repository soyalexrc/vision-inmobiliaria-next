import React from 'react';
import {
  Box,
  Button,
  Divider,
  Typography,
  Container,
  Grid,
  TextField,
  useMediaQuery
} from "@mui/material";
import {useRouter} from "next/router";
import {AdminLayout} from "../../../../../components/layouts";
import NextLink from 'next/link';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import {axiosInstance, parseCookie} from "../../../../../utils";
import {useSnackbar} from "notistack";
import {GetServerSideProps} from "next";
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from "yup";
import {Formatclients} from "../../../../../interfaces/formats";

const schema = yup.object({
  contact: yup.string().required('Este campo es requerido'),
  property: yup.string().required('Este campo es requerido'),
  location: yup.string().required('Este campo es requerido'),
  lease_fee: yup.string().required('Este campo es requerido'),
  lease_fee_status: yup.string().required('Este campo es requerido'),
  owner_payment_status: yup.string().required('Este campo es requerido'),
  status_condo_cleanliness_payment: yup.string().required('Este campo es requerido'),
  status_electricity_payment: yup.string().required('Este campo es requerido'),
  date_to_collect_lease_fee: yup.string().required('Este campo es requerido'),
  next_adjustment: yup.string().required('Este campo es requerido'),
  next_subcription: yup.string().required('Este campo es requerido'),
  observations: yup.string(),
  january: yup.string(),
  february: yup.string(),
  march: yup.string(),
  april: yup.string(),
  may: yup.string(),
  june: yup.string(),
  july: yup.string(),
  august: yup.string(),
  september: yup.string(),
  october: yup.string(),
  november: yup.string(),
  december: yup.string(),
}).required();

export default function ClientCreateFormat() {
  const router = useRouter();
  const {enqueueSnackbar} = useSnackbar()
  const largeScreen = useMediaQuery((theme: any) => theme.breakpoints.up('md'));
  const {register, handleSubmit, formState: {errors}} = useForm<Formatclients>({
    resolver: yupResolver(schema),
    mode: 'all'
  });
  const onSubmit = handleSubmit((data) => createAlly(data));
  const [loading, setLoading] = React.useState<boolean>()

  async function createAlly(data: any) {
    const fullObj = {...data};
    fullObj.type = 'Aliados'
    fullObj.id = null;
    try {
      setLoading(true);
      const response = await axiosInstance.post('owner/addNewData', fullObj);
      if (response.status === 200) {
        enqueueSnackbar('Se creo el aliado con exito!', {variant: 'success'})
        router.back()
      }
    } catch (e) {
      enqueueSnackbar('Error!', {variant: 'error'})
    } finally {
      setLoading(false);
    }
  }

  return (
    <AdminLayout title='Crear nuevo formato de cliente | Vision inmobiliaria'>
      <>
        {/*TODO hacer un componente de breadcrumb*/}
        <Box display='flex' alignItems='center'>
          <NextLink href='/admin/aliados'>Formatos de cliente</NextLink>
          <ArrowRightIcon sx={{color: 'gray'}}/>
          <Typography> Crear nuevo formato de cliente</Typography>
        </Box>
        <form onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={2}></Grid>
            <Grid item xs={12} md={8}>
              <Container maxWidth='md' sx={{py: 5}}>
                <Typography variant='h5' align='center' color='secondary.light'>Datos de formato</Typography>
                <Grid container spacing={2} sx={{mt: 3}}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      sx={{mt: 2, borderColor: 'red'}}
                      placeholder='Contacto'
                      {...register('contact')}
                      error={Boolean(errors?.contact)}
                      label='Contacto'
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      sx={{mt: 2, borderColor: 'red'}}
                      placeholder='Propiedad'
                      {...register('property')}
                      error={Boolean(errors?.property)}
                      label='Propiedad'
                      variant="outlined"
                    />
                    <Typography variant='caption' fontWeight='bold'
                                sx={{color: '#FF0000'}}>{errors?.property?.message}</Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      sx={{mt: 2, borderColor: 'red'}}
                      placeholder='Ubicacion'
                      {...register('location')}
                      error={Boolean(errors?.location)}
                      label='Ubicacion'
                      variant="outlined"
                    />
                    <Typography variant='caption' fontWeight='bold'
                                sx={{color: '#FF0000'}}>{errors?.location?.message}</Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      sx={{mt: 2, borderColor: 'red'}}
                      placeholder='Canon'
                      {...register('lease_fee')}
                      error={Boolean(errors?.lease_fee)}
                      label='Canon'
                      variant="outlined"
                    />
                    <Typography variant='caption' fontWeight='bold'
                                sx={{color: '#FF0000'}}>{errors?.lease_fee?.message}</Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      sx={{mt: 2, borderColor: 'red'}}
                      placeholder='Estatus de cobranza de canon'
                      {...register('lease_fee_status')}
                      error={Boolean(errors?.lease_fee_status)}
                      label='Estatus de cobranza de canon'
                      variant="outlined"
                    />
                    <Typography variant='caption' fontWeight='bold'
                                sx={{color: '#FF0000'}}>{errors?.lease_fee_status?.message}</Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      sx={{mt: 2, borderColor: 'red'}}
                      placeholder='Estatus de pago a propietario'
                      {...register('owner_payment_status')}
                      error={Boolean(errors?.owner_payment_status)}
                      label='Estatus de pago a propietario'
                      variant="outlined"
                    />
                    <Typography variant='caption' fontWeight='bold'
                                sx={{color: '#FF0000'}}>{errors?.owner_payment_status?.message}</Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      sx={{mt: 2, borderColor: 'red'}}
                      placeholder='Estatus de condominio / aseo'
                      {...register('status_condo_cleanliness_payment')}
                      error={Boolean(errors?.status_condo_cleanliness_payment)}
                      label='Estatus de condominio / aseo'
                      variant="outlined"
                    />
                    <Typography variant='caption' fontWeight='bold'
                                sx={{color: '#FF0000'}}>{errors?.status_condo_cleanliness_payment?.message}</Typography>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      sx={{mt: 2, borderColor: 'red'}}
                      placeholder='Estatus de pago de luz'
                      {...register('status_electricity_payment')}
                      error={Boolean(errors?.status_electricity_payment)}
                      label='Estatus de pago de luz'
                      variant="outlined"
                    />
                    <Typography variant='caption' fontWeight='bold'
                                sx={{color: '#FF0000'}}>{errors?.status_electricity_payment?.message}</Typography>
                  </Grid>


                </Grid>
              </Container>
              <Divider sx={{borderWidth: '2px', my: 3}}/>
              <Container maxWidth='md' sx={{py: 5}}>
                <Grid container spacing={2}>
                  {/*<Grid item xs={12} md={6}>*/}
                  {/*  <Typography sx={{mb: 1}}>Fecha de nacimiento</Typography>*/}
                  {/*  <TextField*/}
                  {/*    variant="outlined"*/}
                  {/*    fullWidth*/}
                  {/*    type='date'*/}
                  {/*    {...register('birthday')}*/}
                  {/*    error={Boolean(errors?.birthday)}*/}
                  {/*  />*/}
                  {/*  <Typography variant='caption' fontWeight='bold'*/}
                  {/*              sx={{color: '#FF0000'}}>{errors?.birthday?.message}</Typography>*/}
                  {/*</Grid>*/}

                </Grid>
                <Grid item xs={12} sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  mt: 5,
                  flexWrap: 'wrap',
                  flexDirection: largeScreen ? 'row' : 'column-reverse'
                }}>
                  <Button
                    sx={{mt: !largeScreen ? 3 : 0}}
                    type='button'
                    fullWidth={!largeScreen}
                    onClick={() => router.back()}
                    variant='outlined'
                  >
                    Cancelar
                  </Button>
                  <Button
                    fullWidth={!largeScreen}
                    disabled={loading || Object.keys(errors).length > 0}
                    type='submit'
                    variant='contained'
                  >
                    Registrar formato de cliente
                  </Button>
                </Grid>
              </Container>
            </Grid>
          </Grid>
        </form>
      </>
    </AdminLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({req}) => {
  if (!parseCookie('isAuthenticated', req.headers.cookie!)) {
    return {
      redirect: {
        destination: '/autenticacion/login',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}




