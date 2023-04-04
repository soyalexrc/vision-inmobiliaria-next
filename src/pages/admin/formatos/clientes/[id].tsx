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
  contact: yup.string(),
  tenant: yup.string(),
  property: yup.string(),
  location: yup.string(),
  lease_fee: yup.string(),
  lease_fee_status: yup.string(),
  owner_payment_status: yup.string(),
  status_condo_cleanliness_payment: yup.string(),
  status_electricity_payment: yup.string(),
  date_to_collect_lease_fee: yup.string(),
  next_adjustment: yup.string(),
  next_subcription: yup.string(),
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

export default function UpdateClientFormat() {
  const router = useRouter();
  const id = router.query?.id;
  const {enqueueSnackbar} = useSnackbar()
  const largeScreen = useMediaQuery((theme: any) => theme.breakpoints.up('md'));
  const {register, handleSubmit, formState: {errors}, setValue } = useForm<Formatclients>({
    resolver: yupResolver(schema),
    mode: 'all'
  });
  const onSubmit = handleSubmit((data) => editFormat(data));
  const [loading, setLoading] = React.useState<boolean>()
  const [loadingData, setLoadingData] = React.useState<boolean>(true)

  async function getFormatById() {
    try {
      const response = await axiosInstance.get(`format/client/getById?id=${id}`);

      if (response.status === 200 && response.data.length > 0) {
        const {
          contact,
          tenant,
          property,
          location,
          lease_fee,
          lease_fee_status,
          owner_payment_status,
          status_condo_cleanliness_payment,
          status_electricity_payment,
          date_to_collect_lease_fee,
          next_adjustment,
          next_subcription,
          observations,
          january,
          february,
          march,
          april,
          may,
          june,
          july,
          august,
          september,
          october,
          november,
          december
        } = response.data[0];

        setValue('tenant', tenant, {});
        setValue('contact', contact, {});
        setValue('property', property, {});
        setValue('location', location, {});
        setValue('lease_fee', lease_fee, {});
        setValue('lease_fee_status', lease_fee_status, {});
        setValue('owner_payment_status', owner_payment_status, {});
        setValue('status_condo_cleanliness_payment', status_condo_cleanliness_payment, {});
        setValue('status_electricity_payment', status_electricity_payment, {});
        setValue('date_to_collect_lease_fee', date_to_collect_lease_fee, {});
        setValue('next_adjustment', next_adjustment, {});
        setValue('next_subcription', next_subcription, {});
        setValue('next_subcription', next_subcription, {});
        setValue('january', january, {});
        setValue('february', february, {});
        setValue('march', march, {});
        setValue('april', april, {});
        setValue('may', may, {});
        setValue('june', june, {});
        setValue('july', july, {});
        setValue('august', august, {});
        setValue('september', september, {});
        setValue('october', october, {});
        setValue('november', november, {});
        setValue('december', december, {});
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
      const response = await axiosInstance.put(`format/client/updateData`, fullObj);
      if (response.status === 200) {
        router.back()
        enqueueSnackbar('Se edito el aliado con exito!', {variant: 'success'} )
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


  return (
    <AdminLayout title='Crear nuevo formato de cliente | Vision inmobiliaria'>
      <Box>
        {loadingData && <p>Cargando...</p>}
        {
          !loadingData &&
          <>
            {/*TODO hacer un componente de breadcrumb*/}
            <Box display='flex' alignItems='center'>
              <NextLink href='/admin/formatos/clientes'>Formatos de cliente</NextLink>
              <ArrowRightIcon sx={{color: 'gray'}}/>
              <Typography> Editar nuevo formato de cliente</Typography>
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
                          placeholder='Inquilino'
                          {...register('tenant')}
                          error={Boolean(errors?.tenant)}
                          label='Inquilino'
                          variant="outlined"
                        />
                      </Grid>
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


                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          sx={{mt: 2, borderColor: 'red'}}
                          placeholder='Fecha de cobranza'
                          {...register('date_to_collect_lease_fee')}
                          error={Boolean(errors?.date_to_collect_lease_fee)}
                          label='Fecha de cobranza'
                          variant="outlined"
                        />
                        <Typography variant='caption' fontWeight='bold'
                                    sx={{color: '#FF0000'}}>{errors?.date_to_collect_lease_fee?.message}</Typography>
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          sx={{mt: 2, borderColor: 'red'}}
                          placeholder='Proximo ajuste'
                          {...register('next_adjustment')}
                          error={Boolean(errors?.next_adjustment)}
                          label='Proximo ajuste'
                          variant="outlined"
                        />
                        <Typography variant='caption' fontWeight='bold'
                                    sx={{color: '#FF0000'}}>{errors?.next_adjustment?.message}</Typography>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          sx={{mt: 2, borderColor: 'red'}}
                          placeholder='Proxima subscripcion'
                          {...register('next_subcription')}
                          error={Boolean(errors?.next_subcription)}
                          label='Proxima subscripcion'
                          variant="outlined"
                        />
                        <Typography variant='caption' fontWeight='bold'
                                    sx={{color: '#FF0000'}}>{errors?.next_subcription?.message}</Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          multiline
                          rows={5}
                          sx={{mt: 2, borderColor: 'red'}}
                          placeholder='Observaciones'
                          {...register('observations')}
                          error={Boolean(errors?.observations)}
                          label='Observaciones'
                          variant="outlined"
                        />
                        <Typography variant='caption' fontWeight='bold'
                                    sx={{color: '#FF0000'}}>{errors?.observations?.message}</Typography>
                      </Grid>

                    </Grid>
                  </Container>
                  <Divider sx={{borderWidth: '2px', my: 3}}/>
                  <Container maxWidth='md' sx={{py: 5}}>
                    <Typography variant='h5' align='center' color='secondary.light'>Comentarios por mes</Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={3}>
                        <TextField
                          fullWidth
                          multiline
                          maxRows={5}
                          sx={{mt: 2, borderColor: 'red'}}
                          placeholder='Enero'
                          {...register('january')}
                          error={Boolean(errors?.january)}
                          label='Enero'
                          variant="outlined"
                        />
                        <Typography variant='caption' fontWeight='bold'
                                    sx={{color: '#FF0000'}}>{errors?.january?.message}</Typography>
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <TextField
                          fullWidth
                          multiline
                          maxRows={5}
                          sx={{mt: 2, borderColor: 'red'}}
                          placeholder='Febrero'
                          {...register('february')}
                          error={Boolean(errors?.february)}
                          label='Febrero'
                          variant="outlined"
                        />
                        <Typography variant='caption' fontWeight='bold'
                                    sx={{color: '#FF0000'}}>{errors?.february?.message}</Typography>
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <TextField
                          fullWidth
                          multiline
                          maxRows={5}
                          sx={{mt: 2, borderColor: 'red'}}
                          placeholder='Marzo'
                          {...register('march')}
                          error={Boolean(errors?.march)}
                          label='Marzo'
                          variant="outlined"
                        />
                        <Typography variant='caption' fontWeight='bold'
                                    sx={{color: '#FF0000'}}>{errors?.march?.message}</Typography>
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <TextField
                          fullWidth
                          multiline
                          maxRows={5}
                          sx={{mt: 2, borderColor: 'red'}}
                          placeholder='Abril'
                          {...register('april')}
                          error={Boolean(errors?.april)}
                          label='Abril'
                          variant="outlined"
                        />
                        <Typography variant='caption' fontWeight='bold'
                                    sx={{color: '#FF0000'}}>{errors?.april?.message}</Typography>
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <TextField
                          fullWidth
                          multiline
                          maxRows={5}
                          sx={{mt: 2, borderColor: 'red'}}
                          placeholder='Mayo'
                          {...register('may')}
                          error={Boolean(errors?.may)}
                          label='Mayo'
                          variant="outlined"
                        />
                        <Typography variant='caption' fontWeight='bold'
                                    sx={{color: '#FF0000'}}>{errors?.may?.message}</Typography>
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <TextField
                          fullWidth
                          multiline
                          maxRows={5}
                          sx={{mt: 2, borderColor: 'red'}}
                          placeholder='Junio'
                          {...register('june')}
                          error={Boolean(errors?.june)}
                          label='Junio'
                          variant="outlined"
                        />
                        <Typography variant='caption' fontWeight='bold'
                                    sx={{color: '#FF0000'}}>{errors?.june?.message}</Typography>
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <TextField
                          fullWidth
                          multiline
                          maxRows={5}
                          sx={{mt: 2, borderColor: 'red'}}
                          placeholder='Julio'
                          {...register('july')}
                          error={Boolean(errors?.july)}
                          label='Julio'
                          variant="outlined"
                        />
                        <Typography variant='caption' fontWeight='bold'
                                    sx={{color: '#FF0000'}}>{errors?.july?.message}</Typography>
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <TextField
                          fullWidth
                          multiline
                          maxRows={5}
                          sx={{mt: 2, borderColor: 'red'}}
                          placeholder='Agosto'
                          {...register('august')}
                          error={Boolean(errors?.august)}
                          label='Agosto'
                          variant="outlined"
                        />
                        <Typography variant='caption' fontWeight='bold'
                                    sx={{color: '#FF0000'}}>{errors?.august?.message}</Typography>
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <TextField
                          fullWidth
                          multiline
                          maxRows={5}
                          sx={{mt: 2, borderColor: 'red'}}
                          placeholder='Septiembre'
                          {...register('september')}
                          error={Boolean(errors?.september)}
                          label='Septiembre'
                          variant="outlined"
                        />
                        <Typography variant='caption' fontWeight='bold'
                                    sx={{color: '#FF0000'}}>{errors?.september?.message}</Typography>
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <TextField
                          fullWidth
                          multiline
                          maxRows={5}
                          sx={{mt: 2, borderColor: 'red'}}
                          placeholder='Octubre'
                          {...register('october')}
                          error={Boolean(errors?.october)}
                          label='Octubre'
                          variant="outlined"
                        />
                        <Typography variant='caption' fontWeight='bold'
                                    sx={{color: '#FF0000'}}>{errors?.october?.message}</Typography>
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <TextField
                          fullWidth
                          multiline
                          maxRows={5}
                          sx={{mt: 2, borderColor: 'red'}}
                          placeholder='Novienbre'
                          {...register('november')}
                          error={Boolean(errors?.november)}
                          label='Novienbre'
                          variant="outlined"
                        />
                        <Typography variant='caption' fontWeight='bold'
                                    sx={{color: '#FF0000'}}>{errors?.november?.message}</Typography>
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <TextField
                          fullWidth
                          multiline
                          maxRows={5}
                          sx={{mt: 2, borderColor: 'red'}}
                          placeholder='Diciembre'
                          {...register('december')}
                          error={Boolean(errors?.december)}
                          label='Diciembre'
                          variant="outlined"
                        />
                        <Typography variant='caption' fontWeight='bold'
                                    sx={{color: '#FF0000'}}>{errors?.december?.message}</Typography>
                      </Grid>

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




