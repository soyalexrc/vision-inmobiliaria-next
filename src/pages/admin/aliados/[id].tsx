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
import { Ally } from '../../../../interfaces';
import axios from 'axios';

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

export default function EditAllyPage() {
  const router = useRouter();
  const id = router.query?.id;
  const { enqueueSnackbar } = useSnackbar();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Ally>({
    resolver: yupResolver(schema),
    mode: 'all',
  });
  const onSubmit = handleSubmit((data) => editAlly(data));
  const largeScreen = useMediaQuery((theme: any) => theme.breakpoints.up('md'));
  const [loading, setLoading] = React.useState<boolean>(false);
  const [loadingData, setLoadingData] = React.useState<boolean>(true);
  async function getAllyById() {
    try {
      const response = await axiosInstance.get(`owner/getById?id=${id}`);
      if (response.status === 200 && response.data.recordset.length > 0) {
        const { first_name, last_name, phone, isInvestor, email, birthday } = response.data.recordset[0];
        setValue('firstName', first_name, {});
        setValue('lastName', last_name, {});
        setValue('phone', phone, {});
        setValue('isInvestor', isInvestor, {});
        setValue('email', email, {});
        setValue('birthday', birthday, {});
      }
    } catch (err) {
      enqueueSnackbar(`Error ${JSON.stringify(err)}`, { variant: 'error' });
    } finally {
      setLoadingData(false);
    }
  }

  async function editAlly(data: any) {
    const fullObj = { ...data };
    fullObj.type = 'Aliados';
    fullObj.id = id;
    try {
      setLoading(true);
      const response = await axiosInstance.put(`owner/updateData`, fullObj);
      if (response.status === 200) {
        router.back();
        enqueueSnackbar('Se edito el aliado con exito!', { variant: 'success' });
      }
    } catch (e) {
      enqueueSnackbar('Error!', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    getAllyById();
  }, []);

  return (
    <AdminLayout title="Editar propietario | Vision inmobiliaria">
      <>
        {loadingData && <p>Cargando...</p>}
        {!loadingData && (
          <>
            {/*TODO hacer un componente de breadcrumb*/}
            <Box display="flex" alignItems="center">
              <NextLink href="/admin/aliados">Aliados</NextLink>
              <ArrowRightIcon sx={{ color: 'gray' }} />
              <Typography> Editar aliado</Typography>
            </Box>
            <form onSubmit={onSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={2}></Grid>
                <Grid item xs={12} md={8}>
                  <Container maxWidth="md" sx={{ py: 5 }}>
                    <Typography variant="h5" align="center" color="secondary.light">
                      Datos de aliado
                    </Typography>
                    <Grid container spacing={2} sx={{ mt: 3 }}>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          sx={{ mt: 2 }}
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
                          sx={{ mt: 2 }}
                          {...register('firstName')}
                          error={Boolean(errors?.firstName)}
                          placeholder="Nombres"
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
                          sx={{ mt: 2 }}
                          placeholder="Apellidos"
                          {...register('lastName')}
                          error={Boolean(errors?.lastName)}
                          label="Apellidos"
                          variant="outlined"
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
                      <Button sx={{ mt: !largeScreen ? 3 : 0 }} fullWidth={!largeScreen} onClick={() => router.back()} variant="outlined">
                        Cancelar
                      </Button>
                      <Button
                        fullWidth={!largeScreen}
                        disabled={loading || Object.keys(errors).length > 0}
                        type="submit"
                        variant="contained"
                      >
                        Guardar cambios
                      </Button>
                    </Grid>
                  </Container>
                </Grid>
              </Grid>
            </form>
          </>
        )}
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
