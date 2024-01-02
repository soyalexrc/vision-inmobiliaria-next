import React from 'react';
import { Box, Button, Divider, Typography, Container, Grid, TextField, useMediaQuery } from '@mui/material';
import { useRouter } from 'next/router';
import { AdminLayout } from '../../../../components/layouts';
import NextLink from 'next/link';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { axiosInstance, parseCookie } from '../../../../utils';
import { useSnackbar } from 'notistack';
import { GetServerSideProps } from 'next';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  isInvestor: string;
  birthday: string;
  id: number | null;
  type: string;
}

const schema = yup
  .object({
    firstName: yup.string().required('Este campo es requerido'),
    lastName: yup.string().required('Este campo es requerido'),
    birthday: yup.string().required('Este campo es requerido'),
    email: yup.string().required('Este campo es requerido'),
    phone: yup.string().required('Este campo es requerido'),
    isInvestor: yup.string(),
  })
  .required();

export default function CreateNewOwnerPage() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const largeScreen = useMediaQuery((theme: any) => theme.breakpoints.up('md'));
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: yupResolver(schema), mode: 'all' });
  const onSubmit = handleSubmit((data) => createAlly(data));
  const [loading, setLoading] = React.useState<boolean>();

  async function createAlly(data: any) {
    const fullObj = { ...data };
    fullObj.type = 'Aliados';
    fullObj.id = null;
    try {
      setLoading(true);
      const response = await axiosInstance.post('owner/addNewData', fullObj);
      if (response.status === 200) {
        enqueueSnackbar('Se creo el aliado con exito!', { variant: 'success' });
        router.back();
      }
    } catch (e) {
      enqueueSnackbar('Error!', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <AdminLayout title="Crear nuevo aliado | Vision inmobiliaria">
      <>
        {/*TODO hacer un componente de breadcrumb*/}
        <Box display="flex" alignItems="center">
          <NextLink href="/admin/aliados">Aliados</NextLink>
          <ArrowRightIcon sx={{ color: 'gray' }} />
          <Typography> Crear nuevo aliado</Typography>
        </Box>
        <form onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={2}></Grid>
            <Grid item xs={12} md={8}>
              <Container maxWidth="md" sx={{ py: 5 }}>
                <Typography variant="h5" align="center" color="secondary.light">
                  Datos de asesor
                </Typography>
                <Grid container spacing={2} sx={{ mt: 3 }}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      sx={{ mt: 2, borderColor: 'red' }}
                      placeholder="Email"
                      {...register('email')}
                      error={Boolean(errors?.email)}
                      label="Email"
                      variant="outlined"
                    />
                    <Typography variant="caption" fontWeight="bold" sx={{ color: '#FF0000' }}>
                      {errors?.email?.message}
                    </Typography>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      sx={{ mt: 2, borderColor: 'red' }}
                      placeholder="Nombres"
                      {...register('firstName')}
                      error={Boolean(errors?.firstName)}
                      label="Nombres"
                      variant="outlined"
                    />
                    <Typography variant="caption" fontWeight="bold" sx={{ color: '#FF0000' }}>
                      {errors?.firstName?.message}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      sx={{ mt: 2, borderColor: 'red' }}
                      {...register('lastName')}
                      placeholder="Apellidos"
                      label="Apellidos"
                      variant="outlined"
                      error={Boolean(errors?.lastName)}
                    />
                    <Typography variant="caption" fontWeight="bold" sx={{ color: '#FF0000' }}>
                      {errors?.lastName?.message}
                    </Typography>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      sx={{ mt: 2 }}
                      placeholder="Numero de telefono"
                      {...register('phone')}
                      error={Boolean(errors?.phone)}
                      label="Numero de telefono"
                      variant="outlined"
                    />
                    <Typography variant="caption" fontWeight="bold" sx={{ color: '#FF0000' }}>
                      {errors?.phone?.message}
                    </Typography>
                  </Grid>
                </Grid>
              </Container>
              <Divider sx={{ borderWidth: '2px', my: 3 }} />
              <Container maxWidth="md" sx={{ py: 5 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Typography sx={{ mb: 1 }}>Fecha de nacimiento</Typography>
                    <TextField variant="outlined" fullWidth type="date" {...register('birthday')} error={Boolean(errors?.birthday)} />
                    <Typography variant="caption" fontWeight="bold" sx={{ color: '#FF0000' }}>
                      {errors?.birthday?.message}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mt: 5,
                    flexWrap: 'wrap',
                    flexDirection: largeScreen ? 'row' : 'column-reverse',
                  }}
                >
                  <Button
                    sx={{ mt: !largeScreen ? 3 : 0 }}
                    type="button"
                    fullWidth={!largeScreen}
                    onClick={() => router.back()}
                    variant="outlined"
                  >
                    Cancelar
                  </Button>
                  <Button fullWidth={!largeScreen} disabled={loading || Object.keys(errors).length > 0} type="submit" variant="contained">
                    Registrar propietario
                  </Button>
                </Grid>
              </Container>
            </Grid>
          </Grid>
        </form>
      </>
    </AdminLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  if (!parseCookie('isAuthenticated', req.headers.cookie!)) {
    return {
      redirect: {
        destination: '/autenticacion/login',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
