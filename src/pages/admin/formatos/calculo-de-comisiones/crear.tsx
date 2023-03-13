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
import {FormatCommissionCalculation} from "../../../../../interfaces";

const schema = yup.object({
  date_application: yup.string(),
  bill_number: yup.string(),
  property: yup.string(),
  client: yup.string(),
  adviser_in_charge: yup.string(),
  procedure: yup.string(),
  status: yup.string(),
  price_procedure: yup.string(),
  total_paid: yup.string(),
  total_due: yup.string(),
  price_per_stage_process: yup.string(),
  expenses: yup.string(),
  lawyer_calculation_20: yup.string(),
  lawyer_calculation_30: yup.string(),
  lawyer_calculation_40: yup.string(),
  adviser_calculation_10: yup.string(),
  company_profit: yup.string(),
  stationary: yup.string(),
  total_paid_lawyer: yup.string(),
  total_due_lawyer: yup.string(),
  payment_date_lawyer: yup.string(),
  status_lawyer: yup.string(),
  total_paid_adviser: yup.string(),
  total_due_adviser: yup.string(),
  payment_date_adviser: yup.string(),
  status_adviser: yup.string(),
})

export default function CommissionCalculationCreateFormat() {
  const router = useRouter();
  const {enqueueSnackbar} = useSnackbar()
  const largeScreen = useMediaQuery((theme: any) => theme.breakpoints.up('md'));
  const {register, handleSubmit, formState: {errors}} = useForm<FormatCommissionCalculation>({
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
      const response = await axiosInstance.post('format/commission/addNewData', fullObj);
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
    <AdminLayout title='Crear nuevo formato de calculo de comision | Vision inmobiliaria'>
      <>
        {/*TODO hacer un componente de breadcrumb*/}
        <Box display='flex' alignItems='center'>
          <NextLink href='/admin/formatos/calculo-de-comisiones'>Formatos de calculo de comisiones</NextLink>
          <ArrowRightIcon sx={{color: 'gray'}}/>
          <Typography> Crear nuevo formato de calculo de comisiones</Typography>
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
                      placeholder='Fecha de solicitud'
                      {...register('date_application')}
                      error={Boolean(errors?.date_application)}
                      label='Fecha de solicitud'
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      sx={{mt: 2, borderColor: 'red'}}
                      placeholder='Numero de factura'
                      {...register('bill_number')}
                      error={Boolean(errors?.bill_number)}
                      label='Numero de factura'
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      sx={{mt: 2, borderColor: 'red'}}
                      placeholder='Inmueble'
                      {...register('property')}
                      error={Boolean(errors?.property)}
                      label='Inmueble'
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
                      placeholder='Asesor a cargo'
                      {...register('adviser_in_charge')}
                      error={Boolean(errors?.adviser_in_charge)}
                      label='Asesor a cargo'
                      variant="outlined"
                    />
                    <Typography variant='caption' fontWeight='bold'
                                sx={{color: '#FF0000'}}>{errors?.adviser_in_charge?.message}</Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      sx={{mt: 2, borderColor: 'red'}}
                      placeholder='Tramite'
                      {...register('procedure')}
                      error={Boolean(errors?.procedure)}
                      label='Tramite'
                      variant="outlined"
                    />
                    <Typography variant='caption' fontWeight='bold'
                                sx={{color: '#FF0000'}}>{errors?.procedure?.message}</Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      sx={{mt: 2, borderColor: 'red'}}
                      placeholder='Estatus (Culminado o en curso)'
                      {...register('status')}
                      error={Boolean(errors?.status)}
                      label='Estatus (Culminado o en curso)'
                      variant="outlined"
                    />
                    <Typography variant='caption' fontWeight='bold'
                                sx={{color: '#FF0000'}}>{errors?.status?.message}</Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      sx={{mt: 2, borderColor: 'red'}}
                      placeholder='Precio de tramite'
                      {...register('price_procedure')}
                      error={Boolean(errors?.price_procedure)}
                      label='Precio de tramite'
                      variant="outlined"
                    />
                    <Typography variant='caption' fontWeight='bold'
                                sx={{color: '#FF0000'}}>{errors?.price_procedure?.message}</Typography>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      sx={{mt: 2, borderColor: 'red'}}
                      placeholder='Pago / Abono'
                      {...register('total_paid')}
                      error={Boolean(errors?.total_paid)}
                      label='Pago / Abono'
                      variant="outlined"
                    />
                    <Typography variant='caption' fontWeight='bold'
                                sx={{color: '#FF0000'}}>{errors?.total_paid?.message}</Typography>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      sx={{mt: 2, borderColor: 'red'}}
                      placeholder='Por cobrar}'
                      {...register('total_due')}
                      error={Boolean(errors?.total_due)}
                      label='Por cobrar}'
                      variant="outlined"
                    />
                    <Typography variant='caption' fontWeight='bold'
                                sx={{color: '#FF0000'}}>{errors?.total_due?.message}</Typography>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      sx={{mt: 2, borderColor: 'red'}}
                      placeholder='Precio por etapa del proceso'
                      {...register('price_per_stage_process')}
                      error={Boolean(errors?.price_per_stage_process)}
                      label='Precio por etapa del proceso'
                      variant="outlined"
                    />
                    <Typography variant='caption' fontWeight='bold'
                                sx={{color: '#FF0000'}}>{errors?.price_per_stage_process?.message}</Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      sx={{mt: 2, borderColor: 'red'}}
                      placeholder='Gastos'
                      {...register('expenses')}
                      error={Boolean(errors?.expenses)}
                      label='Gastos'
                      variant="outlined"
                    />
                    <Typography variant='caption' fontWeight='bold'
                                sx={{color: '#FF0000'}}>{errors?.expenses?.message}</Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      sx={{mt: 2, borderColor: 'red'}}
                      placeholder='Calculo abogado 20%'
                      {...register('lawyer_calculation_20')}
                      error={Boolean(errors?.lawyer_calculation_20)}
                      label='Calculo abogado 20%'
                      variant="outlined"
                    />
                    <Typography variant='caption' fontWeight='bold'
                                sx={{color: '#FF0000'}}>{errors?.lawyer_calculation_20?.message}</Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      sx={{mt: 2, borderColor: 'red'}}
                      placeholder='Calculo abogado 30%'
                      {...register('lawyer_calculation_30')}
                      error={Boolean(errors?.lawyer_calculation_30)}
                      label='Calculo abogado 30%'
                      variant="outlined"
                    />
                    <Typography variant='caption' fontWeight='bold'
                                sx={{color: '#FF0000'}}>{errors?.lawyer_calculation_30?.message}</Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      sx={{mt: 2, borderColor: 'red'}}
                      placeholder='Calculo abogado 40%'
                      {...register('lawyer_calculation_40')}
                      error={Boolean(errors?.lawyer_calculation_40)}
                      label='Calculo abogado 40%'
                      variant="outlined"
                    />
                    <Typography variant='caption' fontWeight='bold'
                                sx={{color: '#FF0000'}}>{errors?.lawyer_calculation_40?.message}</Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      sx={{mt: 2, borderColor: 'red'}}
                      placeholder='Calculo de asesor 10%'
                      {...register('adviser_calculation_10')}
                      error={Boolean(errors?.adviser_calculation_10)}
                      label='Calculo de asesor 10%'
                      variant="outlined"
                    />
                    <Typography variant='caption' fontWeight='bold'
                                sx={{color: '#FF0000'}}>{errors?.adviser_calculation_10?.message}</Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      sx={{mt: 2, borderColor: 'red'}}
                      placeholder='Ganancia de la empresa'
                      {...register('company_profit')}
                      error={Boolean(errors?.company_profit)}
                      label='Ganancia de la empresa'
                      variant="outlined"
                    />
                    <Typography variant='caption' fontWeight='bold'
                                sx={{color: '#FF0000'}}>{errors?.company_profit?.message}</Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      sx={{mt: 2, borderColor: 'red'}}
                      placeholder='Papeleria'
                      {...register('stationary')}
                      error={Boolean(errors?.stationary)}
                      label='Papeleria'
                      variant="outlined"
                    />
                    <Typography variant='caption' fontWeight='bold'
                                sx={{color: '#FF0000'}}>{errors?.stationary?.message}</Typography>
                  </Grid>


                </Grid>
              </Container>
              <Divider sx={{borderWidth: '2px', my: 3}}/>
              <Container sx={{ py: 5 }} maxWidth='md'>
                <Typography variant='h5' align='center' color='secondary.light'>Estatus pago de abogado</Typography>
                <Grid container spacing={2} sx={{ mt: 3 }}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      sx={{mt: 2, borderColor: 'red'}}
                      placeholder='Monto pagado'
                      {...register('total_paid_lawyer')}
                      error={Boolean(errors?.total_paid_lawyer)}
                      label='Monto pagado'
                      variant="outlined"
                    />
                    <Typography variant='caption' fontWeight='bold'
                                sx={{color: '#FF0000'}}>{errors?.total_paid_lawyer?.message}</Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      sx={{mt: 2, borderColor: 'red'}}
                      placeholder='Por pagar'
                      {...register('total_due_lawyer')}
                      error={Boolean(errors?.total_due_lawyer)}
                      label='Por pagar'
                      variant="outlined"
                    />
                    <Typography variant='caption' fontWeight='bold'
                                sx={{color: '#FF0000'}}>{errors?.total_due_lawyer?.message}</Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      sx={{mt: 2, borderColor: 'red'}}
                      placeholder='Fecha de pago'
                      {...register('payment_date_lawyer')}
                      error={Boolean(errors?.payment_date_lawyer)}
                      label='Fecha de pago'
                      variant="outlined"
                    />
                    <Typography variant='caption' fontWeight='bold'
                                sx={{color: '#FF0000'}}>{errors?.payment_date_lawyer?.message}</Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      sx={{mt: 2, borderColor: 'red'}}
                      placeholder='Estatus'
                      {...register('status_lawyer')}
                      error={Boolean(errors?.status_lawyer)}
                      label='Estatus'
                      variant="outlined"
                    />
                    <Typography variant='caption' fontWeight='bold'
                                sx={{color: '#FF0000'}}>{errors?.status_lawyer?.message}</Typography>
                  </Grid>
                </Grid>
              </Container>
              <Divider sx={{borderWidth: '2px', my: 3}}/>
              <Container sx={{ py: 5 }} maxWidth='md'>
                <Typography variant='h5' align='center' color='secondary.light'>Estatus pago de asesor</Typography>
                <Grid container spacing={2} sx={{ mt: 3 }}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      sx={{mt: 2, borderColor: 'red'}}
                      placeholder='Monto pagado'
                      {...register('total_paid_adviser')}
                      error={Boolean(errors?.total_paid_adviser)}
                      label='Monto pagado'
                      variant="outlined"
                    />
                    <Typography variant='caption' fontWeight='bold'
                                sx={{color: '#FF0000'}}>{errors?.total_paid_adviser?.message}</Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      sx={{mt: 2, borderColor: 'red'}}
                      placeholder='Por pagar'
                      {...register('total_due_adviser')}
                      error={Boolean(errors?.total_due_adviser)}
                      label='Por pagar'
                      variant="outlined"
                    />
                    <Typography variant='caption' fontWeight='bold'
                                sx={{color: '#FF0000'}}>{errors?.total_due_adviser?.message}</Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      sx={{mt: 2, borderColor: 'red'}}
                      placeholder='Fecha de pago'
                      {...register('payment_date_adviser')}
                      error={Boolean(errors?.payment_date_adviser)}
                      label='Fecha de pago'
                      variant="outlined"
                    />
                    <Typography variant='caption' fontWeight='bold'
                                sx={{color: '#FF0000'}}>{errors?.payment_date_adviser?.message}</Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      sx={{mt: 2, borderColor: 'red'}}
                      placeholder='Estatus'
                      {...register('status_adviser')}
                      error={Boolean(errors?.status_adviser)}
                      label='Estatus'
                      variant="outlined"
                    />
                    <Typography variant='caption' fontWeight='bold'
                                sx={{color: '#FF0000'}}>{errors?.status_adviser?.message}</Typography>
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
                    Registrar formato de calculo de comisiones
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




