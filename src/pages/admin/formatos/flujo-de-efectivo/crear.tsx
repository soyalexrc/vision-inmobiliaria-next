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
import {FormatCashFlow} from "../../../../../interfaces/formats";

const schema = yup.object({
  month: yup.string(),
  client: yup.string(),
  date: yup.string(),
  property: yup.string(),
  reason: yup.string(),
  service: yup.string(),
  transaction_type: yup.string(),
  amount: yup.string(),
  total_due: yup.string(),
  pending_to_collect: yup.string(),
  way_to_pay: yup.string(),
  location: yup.string(),
  amount_inserted_third_party_banks: yup.string(),
  status: yup.string(),
}).required();

export default function CashFlowCreateFormat() {
  const router = useRouter();
  const {enqueueSnackbar} = useSnackbar()
  const largeScreen = useMediaQuery((theme: any) => theme.breakpoints.up('md'));
  const {register, handleSubmit, formState: {errors}} = useForm<FormatCashFlow>({
    resolver: yupResolver(schema),
    mode: 'all'
  });
  const onSubmit = handleSubmit((data) => createFormat(data));
  const [loading, setLoading] = React.useState<boolean>()

  async function createFormat(data: any) {
    const fullObj = {...data};
    fullObj.createdAt = new Date();
    console.log(fullObj)
    try {
      setLoading(true);
      const response = await axiosInstance.post('format/cashFlow/addNewData', fullObj);
      if (response.status === 200) {
        enqueueSnackbar('Se creo el formato con exito!', {variant: 'success'})
        router.back()
      }
    } catch (e) {
      enqueueSnackbar('Error!', {variant: 'error'})
    } finally {
      setLoading(false);
    }
  }

  return (
    <AdminLayout title='Crear nuevo formato de flujo de efectivo | Vision inmobiliaria'>
      <>
        {/*TODO hacer un componente de breadcrumb*/}
        <Box display='flex' alignItems='center'>
          <NextLink href='/admin/formatos/flujo-de-efectivo'>Formatos de flujo de efectivo</NextLink>
          <ArrowRightIcon sx={{color: 'gray'}}/>
          <Typography> Crear nuevo formato de flujo de efectivo</Typography>
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
                      placeholder='Mes'
                      {...register('month')}
                      error={Boolean(errors?.month)}
                      label='Mes'
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      sx={{mt: 2, borderColor: 'red'}}
                      placeholder='Fecha'
                      {...register('date')}
                      error={Boolean(errors?.date)}
                      label='Fecha'
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
                      placeholder='Cliente'
                      {...register('client')}
                      error={Boolean(errors?.client)}
                      label='Cliente'
                      variant="outlined"
                    />
                    <Typography variant='caption' fontWeight='bold'
                                sx={{color: '#FF0000'}}>{errors?.client?.message}</Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      sx={{mt: 2, borderColor: 'red'}}
                      placeholder='Concepto'
                      {...register('reason')}
                      error={Boolean(errors?.reason)}
                      label='Concepto'
                      variant="outlined"
                    />
                    <Typography variant='caption' fontWeight='bold'
                                sx={{color: '#FF0000'}}>{errors?.reason?.message}</Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      sx={{mt: 2, borderColor: 'red'}}
                      placeholder='Servicio'
                      {...register('service')}
                      error={Boolean(errors?.service)}
                      label='Servicio'
                      variant="outlined"
                    />
                    <Typography variant='caption' fontWeight='bold'
                                sx={{color: '#FF0000'}}>{errors?.service?.message}</Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      sx={{mt: 2, borderColor: 'red'}}
                      placeholder='Tipo de transaccion'
                      {...register('transaction_type')}
                      error={Boolean(errors?.transaction_type)}
                      label='Tipo de transaccion'
                      variant="outlined"
                    />
                    <Typography variant='caption' fontWeight='bold'
                                sx={{color: '#FF0000'}}>{errors?.transaction_type?.message}</Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      sx={{mt: 2, borderColor: 'red'}}
                      placeholder='Monto'
                      {...register('amount')}
                      error={Boolean(errors?.amount)}
                      label='Monto'
                      variant="outlined"
                    />
                    <Typography variant='caption' fontWeight='bold'
                                sx={{color: '#FF0000'}}>{errors?.amount?.message}</Typography>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      sx={{mt: 2, borderColor: 'red'}}
                      placeholder='Por pagar'
                      {...register('total_due')}
                      error={Boolean(errors?.total_due)}
                      label='Por pagar'
                      variant="outlined"
                    />
                    <Typography variant='caption' fontWeight='bold'
                                sx={{color: '#FF0000'}}>{errors?.total_due?.message}</Typography>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      sx={{mt: 2, borderColor: 'red'}}
                      placeholder='Por cobrar}'
                      {...register('pending_to_collect')}
                      error={Boolean(errors?.pending_to_collect)}
                      label='Por cobrar}'
                      variant="outlined"
                    />
                    <Typography variant='caption' fontWeight='bold'
                                sx={{color: '#FF0000'}}>{errors?.pending_to_collect?.message}</Typography>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      sx={{mt: 2, borderColor: 'red'}}
                      placeholder='Forma de pago'
                      {...register('way_to_pay')}
                      error={Boolean(errors?.way_to_pay)}
                      label='Forma de pago'
                      variant="outlined"
                    />
                    <Typography variant='caption' fontWeight='bold'
                                sx={{color: '#FF0000'}}>{errors?.way_to_pay?.message}</Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      sx={{mt: 2, borderColor: 'red'}}
                      placeholder='Ubicacion / Entidad'
                      {...register('location')}
                      error={Boolean(errors?.location)}
                      label='Ubicacion / Entidad'
                      variant="outlined"
                    />
                    <Typography variant='caption' fontWeight='bold'
                                sx={{color: '#FF0000'}}>{errors?.location?.message}</Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      sx={{mt: 2, borderColor: 'red'}}
                      placeholder='Monto ingresado a cuenta de terceros'
                      {...register('amount_inserted_third_party_banks')}
                      error={Boolean(errors?.amount_inserted_third_party_banks)}
                      label='Monto ingresado a cuenta de terceros'
                      variant="outlined"
                    />
                    <Typography variant='caption' fontWeight='bold'
                                sx={{color: '#FF0000'}}>{errors?.amount_inserted_third_party_banks?.message}</Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      sx={{mt: 2, borderColor: 'red'}}
                      placeholder='Estatus'
                      {...register('status')}
                      error={Boolean(errors?.status)}
                      label='Estatus'
                      variant="outlined"
                    />
                    <Typography variant='caption' fontWeight='bold'
                                sx={{color: '#FF0000'}}>{errors?.status?.message}</Typography>
                  </Grid>

                </Grid>
              </Container>
              <Divider sx={{borderWidth: '2px', my: 3}}/>
              <Container maxWidth='md' sx={{py: 5}}>
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
                    Registrar formato de flujo de efectivo
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




