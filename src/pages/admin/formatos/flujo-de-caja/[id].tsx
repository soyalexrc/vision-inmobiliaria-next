import React from 'react';
import {
  Box,
  Button,
  Divider,
  Typography,
  Container,
  Grid,
  TextField,
  useMediaQuery, FormControlLabel, Switch
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
import {Owner} from "../../../../../interfaces";
import {useDropzone} from "react-dropzone";

const schema = yup.object({
  month: yup.string().required('Este campo es requerido'),
  client: yup.string().required('Este campo es requerido'),
  date: yup.string().required('Este campo es requerido'),
  property: yup.object(),
  reason: yup.string().required('Este campo es requerido'),
  service: yup.string().required('Este campo es requerido'),
  type_of_service: yup.string().required('Este campo es requerido'),
  transaction_type: yup.string().required('Este campo es requerido'),
  amount: yup.string(),
  total_due: yup.string(),
  pending_to_collect: yup.string(),
  way_to_pay: yup.string().required('Este campo es requerido'),
  entity: yup.string().required('Este campo es requerido'),
  location: yup.string(),
  observations: yup.string(),
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
  const watchedProperty = watch('property');
  const watchedTransactionType = watch('transaction_type')
  const onSubmit = handleSubmit((data) => editFormat(data));
  const [hasProperty, setHasProperty] = React.useState<boolean>(true)
  const [loading, setLoading] = React.useState<boolean>()
  const [loadingData, setLoadingData] = React.useState<boolean>(true)
  const [options, setOptions] = React.useState<any[]>([])
  const [properties, setProperties] = React.useState<Owner[]>([])
  const [filtersData, setFiltersData] = React.useState<any>({
    filters: [],
    pageNumber: 1,
    pageSize: 10
  });

  const [myFiles, setMyFiles] = React.useState<any>([])

  const handleDrop = React.useCallback((acceptedFiles: any) => {
    setMyFiles([...myFiles, ...acceptedFiles])
  }, [myFiles])

  const {getRootProps, getInputProps,} = useDropzone({
    onDrop: handleDrop
  });


  const removeFile = (file: any) => () => {
    const newFiles = [...myFiles]
    newFiles.splice(newFiles.indexOf(file), 1)
    setMyFiles(newFiles)
  }

  const removeAll = () => {
    setMyFiles([])
  }
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

  React.useEffect(() => {
    if (watchedTransactionType === 'Cuenta por cobrar' || watchedTransactionType === 'Cuenta por pagar') {
      // if (watchedService)
      setValue('pending_to_collect', '');
      setValue('total_due', '');
      setValue('amount', '')
    }
  }, [watchedTransactionType])

  function showAmountField() {
    return watchedTransactionType === 'Ingreso' ||  watchedTransactionType === 'Egreso' ||  watchedTransactionType === 'Interbancaria'
  }

  async function getProperties(data: any) {
    try {
      const response = await axiosInstance.post('/property/getallDataFilter', data);
      if (response.status === 200) {
        setProperties(response.data.data)
      }
    } catch (err) {
      enqueueSnackbar(`Error ${JSON.stringify(err)}`, {variant: 'error'})
    }
  }

  React.useEffect(() => {
    getProperties(filtersData);
  }, [])


  React.useEffect(() => {
    setValue('property', {})
    setValue('location', '')
  }, [hasProperty])



  return (
    <AdminLayout title='Crear nuevo formato de flujo de caja | Vision inmobiliaria'>
      <Box>
        {loadingData && <p>Cargando...</p>}
        {
          !loadingData &&
          <>
            {/*TODO hacer un componente de breadcrumb*/}
            <Box display='flex' alignItems='center' mb={2}>
              <NextLink href='/admin/formatos/flujo-de-caja'>Formatos de flujo de caja</NextLink>
              <ArrowRightIcon sx={{color: 'gray'}}/>
              <Typography> Editar formato de flujo de caja</Typography>
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
                      <Grid item xs={12}>
                        <Box display='flex' justifyContent='space-between'>
                          <Typography fontWeight='bold' >Seleccionar propiedad</Typography>
                          <FormControlLabel
                              control={
                                <Switch size='small' checked={hasProperty} onChange={() => setHasProperty(!hasProperty)}  />
                              }
                              label={hasProperty ? 'Aplica' : 'No aplica'}
                          />
                        </Box>
                        <RHFAutocomplete
                            disabled={!hasProperty}
                            name="property"
                            control={control}
                            options={properties}
                            getOptionLabel={(option: any) => option.code  || ''}
                            defaultValue={null}
                            label='Seleccionar propiedad'
                        />
                        <Typography variant='caption' fontWeight='bold'
                                    sx={{color: '#FF0000'}}>
                        </Typography>
                      </Grid>
                      <Grid item xs={12} >
                        <TextField
                          fullWidth
                          sx={{mt: 2, borderColor: 'red'}}
                          placeholder='Ubicacion'
                          disabled={!watchedProperty}
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
                          options={['$', 'Bs', '€',]}
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
                          options={['Banco Nacional de Crédito (BNC)', 'Banesco Panamá', 'Banesco Venezuela', 'Banco Nacional de Terceros', 'Oficina Paseo La Granja', 'Oficina San Carlos', 'Tesorería', 'Ingreso a cuenta de terceros']}
                          getOptionLabel={(option: any) => option || ''}
                          defaultValue={null}
                          label='Entidad'
                        />
                        <Typography variant='caption' fontWeight='bold'
                                    sx={{color: '#FF0000'}}>{errors?.entity?.message}</Typography>
                      </Grid>
                      {
                          showAmountField() &&
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
                      }


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

                      {
                          watchedTransactionType === 'Ingreso' &&
                          <>
                            <Grid item xs={12} md={6}>
                              <TextField
                                  fullWidth
                                  sx={{mt: 2, borderColor: 'red'}}
                                  placeholder='Monto por pagar'
                                  {...register('total_due')}
                                  error={Boolean(errors?.total_due)}
                                  label='Monto por pagar'
                                  variant="outlined"
                              />
                              <Typography variant='caption' fontWeight='bold'
                                          sx={{color: '#FF0000'}}>{errors?.total_due?.message}</Typography>
                            </Grid>

                            <Grid item xs={12} md={6}>
                              <TextField
                                  fullWidth
                                  sx={{mt: 2, borderColor: 'red'}}
                                  placeholder='Monto por cobrar'
                                  {...register('pending_to_collect')}
                                  error={Boolean(errors?.pending_to_collect)}
                                  label='Monto por cobrar'
                                  variant="outlined"
                              />
                              <Typography variant='caption' fontWeight='bold'
                                          sx={{color: '#FF0000'}}>{errors?.pending_to_collect?.message}</Typography>
                            </Grid>
                          </>
                      }
                      {
                          watchedTransactionType === 'Cuenta por cobrar' &&
                          <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                sx={{mt: 2, borderColor: 'red'}}
                                placeholder='Monto por cobrar'
                                {...register('pending_to_collect')}
                                error={Boolean(errors?.pending_to_collect)}
                                label='Monto por cobrar'
                                variant="outlined"
                            />
                            <Typography variant='caption' fontWeight='bold'
                                        sx={{color: '#FF0000'}}>{errors?.pending_to_collect?.message}</Typography>
                          </Grid>
                      }
                      {
                          watchedTransactionType === 'Cuenta por pagar' &&
                          <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                sx={{mt: 2, borderColor: 'red'}}
                                placeholder='Monto por pagar'
                                {...register('total_due')}
                                error={Boolean(errors?.total_due)}
                                label='Monto por pagar'
                                variant="outlined"
                            />
                            <Typography variant='caption' fontWeight='bold'
                                        sx={{color: '#FF0000'}}>{errors?.total_due?.message}</Typography>
                          </Grid>
                      }

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

                      {/*<Grid item xs={12}>*/}
                      {/*  <Box {...getRootProps({className: 'dropzone'})} p={5} sx={{border: '2px dashed gray'}} my={3}>*/}
                      {/*    <input {...getInputProps()} />*/}
                      {/*    <Box display='flex' alignItems='center' justifyContent='center'>*/}
                      {/*      <FilePresentIcon/>*/}
                      {/*      <Typography align='center' fontWeight='bold' color='gray'>Adjuntar evidencias</Typography>*/}
                      {/*    </Box>*/}
                      {/*  </Box>*/}

                      {/*  {*/}
                      {/*      myFiles.length > 0 && myFiles.map((file: any) => (*/}
                      {/*          <Box key={file.path}>*/}
                      {/*            <Box display='flex' alignItems='center' justifyContent='space-between'>*/}
                      {/*              <Box  display='flex' alignItems='center'>*/}
                      {/*                <InsertDriveFileIcon sx={{mx: 2}}/>*/}
                      {/*                <Typography>{file.path} </Typography>*/}
                      {/*              </Box>*/}
                      {/*              <IconButton onClick={removeFile(file)}><DeleteForeverIcon color='error'/></IconButton>*/}
                      {/*            </Box>*/}
                      {/*            <Divider />*/}
                      {/*          </Box>*/}
                      {/*      ))*/}
                      {/*  }*/}
                      {/*</Grid>*/}

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
                        Registrar formato de flujo de caja
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




