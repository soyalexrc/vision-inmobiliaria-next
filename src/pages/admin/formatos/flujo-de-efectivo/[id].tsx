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
import {SERVICE_OPTIONS, SERVICE_TYPE_OPTIONS, TYPE_OF_PROPERTY} from "../../../../../utils/properties";
import {RHFAutocomplete} from "../../../../../components/ui/forms";

const schema = yup.object({
  month: yup.string().required('Este campo es requerido'),
  client: yup.string().required('Este campo es requerido'),
  date: yup.string().required('Este campo es requerido'),
  property: yup.string().required('Este campo es requerido'),
  type_of_property: yup.string().required('Este campo es requerido'),
  reason: yup.string().required('Este campo es requerido'),
  service: yup.string().required('Este campo es requerido'),
  type_of_service: yup.string().required('Este campo es requerido'),
  transaction_type: yup.string().required('Este campo es requerido'),
  amount: yup.string().required('Este campo es requerido'),
  total_due: yup.string().required('Este campo es requerido'),
  pending_to_collect: yup.string().required('Este campo es requerido'),
  way_to_pay: yup.string().required('Este campo es requerido'),
  entity: yup.string().required('Este campo es requerido'),
  location: yup.string().required('Este campo es requerido'),
  observations: yup.string().required('Este campo es requerido'),
  canon: yup.string(),
  guarantee: yup.string(),
  contract: yup.string(),
  tax_payer: yup.string(),
  currency: yup.string().required('Este campo es requerido'),
}).required();

export default function UpdateCashFlowFormat() {
  const router = useRouter();
  const id = router.query?.id;
  const {enqueueSnackbar} = useSnackbar()
  const largeScreen = useMediaQuery((theme: any) => theme.breakpoints.up('md'));
  const {register, handleSubmit, formState: {errors}, setValue, watch, control } = useForm<FormatCashFlow>({
    resolver: yupResolver(schema),
    mode: 'all'
  });

  const watchedService = watch('service')
  const onSubmit = handleSubmit((data) => editFormat(data));
  const [loading, setLoading] = React.useState<boolean>()
  const [loadingData, setLoadingData] = React.useState<boolean>(true)
  const [options, setOptions] = React.useState<any[]>([])

  async function getFormatById() {
    try {
      const response = await axiosInstance.get(`format/cashFlow/getById?id=${id}`);
      if (response.status === 200 && response.data.length > 0) {
        const {
          month,
          client,
          date,
          property,
          type_of_property,
          reason,
          service,
          type_of_service,
          transaction_type,
          amount,
          total_due,
          pending_to_collect,
          way_to_pay,
          entity,
          location,
          observations,
          canon,
          guarantee,
          contract,
          tax_payer,
          currency,
        } = response.data[0];
        setValue('month', month, {})
        setValue('client', client, {})
        setValue('date', date, {})
        setValue('property', property, {})
        setValue('type_of_property', type_of_property, {})
        setValue('reason', reason, {})
        setValue('service', service, {})
        setValue('type_of_service', type_of_service, {})
        setValue('transaction_type', transaction_type, {})
        setValue('amount', amount, {})
        setValue('total_due', total_due, {})
        setValue('pending_to_collect', pending_to_collect, {})
        setValue('way_to_pay', way_to_pay, {})
        setValue('entity', entity, {})
        setValue('location', location, {})
        setValue('observations', observations, {})
        setValue('canon', canon, {})
        setValue('guarantee', guarantee, {})
        setValue('contract', contract, {})
        setValue('tax_payer', tax_payer, {})
        setValue('currency', currency, {})
      }
    } catch (err) {
      enqueueSnackbar(`Error ${JSON.stringify(err)}`, { variant: 'error' })
    } finally {
      setLoadingData(false);
    }
  }

  async function editFormat(data: any) {
    const fullObj = {...data};
    fullObj.updatedAt = new Date();
    fullObj.id = id;
    try {
      setLoading(true);
      const response = await axiosInstance.put(`format/cashFlow/updateData`, fullObj);
      if (response.status === 200) {
        router.back()
        enqueueSnackbar('Se edito el formato con exito!', {variant: 'success'} )
      }
    } catch (e) {
      enqueueSnackbar('Error!', {variant: 'error'} )
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    getFormatById()
  }, [])

  React.useEffect(() => {
    setValue('type_of_service', '')
    if (watchedService === 'Inmobiliario') setOptions(SERVICE_TYPE_OPTIONS.inmueble)
    if (watchedService === 'Legal') setOptions(SERVICE_TYPE_OPTIONS.legal)
    if (watchedService === 'Contabilidad') setOptions(SERVICE_TYPE_OPTIONS.accounting)
    if (watchedService === 'Administración Inmuebles Alquilados') setOptions(SERVICE_TYPE_OPTIONS.propertiesAdministration)
    if (watchedService === 'Limpieza (Ama de Llaves)') setOptions(SERVICE_TYPE_OPTIONS.cleanliness)
    if (watchedService === 'Administración Empresas') setOptions(SERVICE_TYPE_OPTIONS.companyAdministration)
    if (watchedService === 'Remodelación/ Acondicionamiento de Espacios') setOptions(SERVICE_TYPE_OPTIONS.remodeling)
    if (watchedService === 'Mantenimiento de Equipos Domésticos e Industriales') setOptions(SERVICE_TYPE_OPTIONS.maintenance)
  }, [watchedService])


  return (
    <AdminLayout title='Crear nuevo formato de flujo de efectivo | Vision inmobiliaria'>
      <Box>
        {loadingData && <p>Cargando...</p>}
        {
          !loadingData &&
          <>
            {/*TODO hacer un componente de breadcrumb*/}
            <Box display='flex' alignItems='center'>
              <NextLink href='/admin/formatos/flujo-de-efectivo'>Formatos de cliente</NextLink>
              <ArrowRightIcon sx={{color: 'gray'}}/>
              <Typography> Editar formato de flujo de efectivo</Typography>
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
                          disabled
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
                          type='date'
                          {...register('date')}
                          error={Boolean(errors?.date)}
                          label='Fecha'
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <RHFAutocomplete
                          name="type_of_property"
                          control={control}
                          options={TYPE_OF_PROPERTY}
                          getOptionLabel={(option: any) => option || ''}
                          defaultValue={null}
                          label='Tipo de Inmueble'
                        />
                        <Typography variant='caption' fontWeight='bold'
                                    sx={{color: '#FF0000'}}>{errors?.type_of_property?.message}</Typography>
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
                      <Grid item xs={12} >
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
                      <Grid item xs={12}>
                        <Divider sx={{ my: 2 }} />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <RHFAutocomplete
                          name="service"
                          control={control}
                          options={SERVICE_OPTIONS}
                          getOptionLabel={(option: any) => option || ''}
                          defaultValue={null}
                          label='Servicio'
                        />
                        <Typography variant='caption' fontWeight='bold'
                                    sx={{color: '#FF0000'}}>{errors?.service?.message}</Typography>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <RHFAutocomplete
                          name="type_of_service"
                          control={control}
                          options={options}
                          disabled={options.length < 1}
                          getOptionLabel={(option: any) => option || ''}
                          defaultValue={null}
                          label='Tipo de servicio'
                        />
                        <Typography variant='caption' fontWeight='bold'
                                    sx={{color: '#FF0000'}}>{errors?.type_of_service?.message}</Typography>
                      </Grid>
                      {
                        watchedService === 'Administración Inmuebles Alquilados' &&
                        <>
                          <Grid item xs={12} md={4}>
                            <TextField
                              fullWidth
                              sx={{mt: 2, borderColor: 'red'}}
                              placeholder='Canon'
                              disabled
                              {...register('canon')}
                              error={Boolean(errors?.canon)}
                              label='Canon'
                              variant="outlined"
                            />
                          </Grid>
                          <Grid item xs={12} md={4}>
                            <TextField
                              fullWidth
                              sx={{mt: 2, borderColor: 'red'}}
                              placeholder='Garantía '
                              disabled
                              {...register('guarantee')}
                              error={Boolean(errors?.guarantee)}
                              label='Garantía '
                              variant="outlined"
                            />
                          </Grid>
                          <Grid item xs={12} md={4}>
                            <TextField
                              fullWidth
                              sx={{mt: 2, borderColor: 'red'}}
                              placeholder='Contrato'
                              disabled
                              {...register('contract')}
                              error={Boolean(errors?.contract)}
                              label='Contrato'
                              variant="outlined"
                            />
                          </Grid>
                        </>
                      }
                      {
                        watchedService === 'Contabilidad' &&
                        <Grid item xs={12}>
                          <RHFAutocomplete
                            name="tax_payer"
                            control={control}
                            options={['Ordinario Natural', 'Ordinario Jurídico', 'Especial']}
                            getOptionLabel={(option: any) => option || ''}
                            defaultValue={null}
                            label='Contribuyente'
                          />
                        </Grid>
                      }
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
                      <Grid item xs={12}>
                        <Divider sx={{ my: 2 }} />
                      </Grid>


                      <Grid item xs={12} md={5}>
                        <RHFAutocomplete
                          name="transaction_type"
                          control={control}
                          options={['Ingreso', 'Egreso', 'Ingreso a cuenta de terceros', 'Interbancaria']}
                          getOptionLabel={(option: any) => option || ''}
                          defaultValue={null}
                          label='Tipo de transaccion'
                        />
                        <Typography variant='caption' fontWeight='bold'
                                    sx={{color: '#FF0000'}}>{errors?.transaction_type?.message}</Typography>
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <RHFAutocomplete
                          name="currency"
                          control={control}
                          options={['$ Estados Unidos', 'Bs', 'Euros',]}
                          getOptionLabel={(option: any) => option || ''}
                          defaultValue={null}
                          label='Moneda'
                        />
                        <Typography variant='caption' fontWeight='bold'
                                    sx={{color: '#FF0000'}}>{errors?.currency?.message}</Typography>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <RHFAutocomplete
                          name="way_to_pay"
                          control={control}
                          options={['Efectivo', 'Transferencia', 'Pago Movil', 'Zelle']}
                          getOptionLabel={(option: any) => option || ''}
                          defaultValue={null}
                          label='Forma de pago'
                        />
                        <Typography variant='caption' fontWeight='bold'
                                    sx={{color: '#FF0000'}}>{errors?.way_to_pay?.message}</Typography>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <RHFAutocomplete
                          name="entity"
                          control={control}
                          options={['Banco Nacional de Crédito (BNC)', 'Banesco Panamá', 'Banesco Venezuela', 'Banco Nacional de Terceros', 'Oficina Paseo La Granja', 'Oficina San Carlos', 'Tesorería']}
                          getOptionLabel={(option: any) => option || ''}
                          defaultValue={null}
                          label='Entidad'
                        />
                        <Typography variant='caption' fontWeight='bold'
                                    sx={{color: '#FF0000'}}>{errors?.entity?.message}</Typography>
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
                          placeholder='Retencion para pagos'
                          {...register('total_due')}
                          error={Boolean(errors?.total_due)}
                          label='Retencion para pagos'
                          variant="outlined"
                        />
                        <Typography variant='caption' fontWeight='bold'
                                    sx={{color: '#FF0000'}}>{errors?.total_due?.message}</Typography>
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          sx={{mt: 2, borderColor: 'red'}}
                          placeholder='Por cobrar'
                          {...register('pending_to_collect')}
                          error={Boolean(errors?.pending_to_collect)}
                          label='Por cobrar'
                          variant="outlined"
                        />
                        <Typography variant='caption' fontWeight='bold'
                                    sx={{color: '#FF0000'}}>{errors?.pending_to_collect?.message}</Typography>
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          multiline
                          minRows={3}
                          sx={{mt: 2, borderColor: 'red'}}
                          placeholder='Observacion'
                          {...register('observations')}
                          error={Boolean(errors?.observations)}
                          label='Observacion'
                          variant="outlined"
                        />
                        <Typography variant='caption' fontWeight='bold'
                                    sx={{color: '#FF0000'}}>{errors?.observations?.message}</Typography>
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
        }
      </Box>
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




