import React from 'react';
import { Box, Button, Divider, Typography, Container, Grid, TextField, MenuItem, Select, FormControl, useMediaQuery } from '@mui/material';
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
import { RHFSelect } from '../../../../components/ui/forms';
import { Owner } from '../../../../interfaces';

const schema = yup
  .object({
    firstName: yup.string().required('Este campo es requerido'),
    lastName: yup.string().required('Este campo es requerido'),
    birthday: yup.string().required('Este campo es requerido'),
    email: yup.string().required('Este campo es requerido'),
    phone: yup.string().required('Este campo es requerido'),
    isInvestor: yup.string().required('Este campo es requerido'),
  })
  .required();

export default function EditOwnerPage() {
  const router = useRouter();
  const id = router.query?.id;
  const { enqueueSnackbar } = useSnackbar();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm<Owner>({
    resolver: yupResolver(schema),
    mode: 'all',
  });
  const onSubmit = handleSubmit((data) => editOwner(data));

  const largeScreen = useMediaQuery((theme: any) => theme.breakpoints.up('md'));
  const [loading, setLoading] = React.useState<boolean>(false);
  const [loadingData, setLoadingData] = React.useState<boolean>(true);
  async function getOwnerById() {
    try {
      const response = await axiosInstance.get(`/owner/getById?id=${id}`);
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

  async function editOwner(data: any) {
    const fullObj = { ...data };
    fullObj.type = 'Propietarios';
    fullObj.id = id;
    try {
      setLoading(true);
      const response = await axiosInstance.put(`/owner/updateData`, fullObj);
      if (response.status === 200) {
        enqueueSnackbar('Se creo el propietario con exito!', { variant: 'success' });
        router.back();
      }
    } catch (e) {
      enqueueSnackbar('Error!', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    getOwnerById();
  }, []);

  return (
    <AdminLayout title="Editar propietario | Vision inmobiliaria">
      <>
        {loadingData && <p>Cargando...</p>}
        {!loadingData && (
          <>
            {/*TODO hacer un componente de breadcrumb*/}
            <Box display="flex" alignItems="center">
              <NextLink href="/admin/propietarios">Propietarios</NextLink>
              <ArrowRightIcon sx={{ color: 'gray' }} />
              <Typography> Editar propietario</Typography>
            </Box>
            <form onSubmit={onSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={2}></Grid>
                <Grid item xs={12} md={8}>
                  <Container maxWidth="md" sx={{ py: 5 }}>
                    <Typography variant="h5" align="center" color="secondary.light">
                      Datos de propietario
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
                      <Grid item xs={12} md={6}>
                        <RHFSelect name="isInvestor" label="Es inversor?" defaultValue={'No'} control={control}>
                          <MenuItem value="Si">Si</MenuItem>
                          <MenuItem value="No">No</MenuItem>
                        </RHFSelect>
                        <Typography variant="caption" fontWeight="bold" sx={{ color: '#FF0000' }}>
                          {errors?.isInvestor?.message}
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
