import React from 'react';
import { Box, Button, Divider, Typography, Container, Grid, TextField, useMediaQuery } from '@mui/material';
import { useRouter } from 'next/router';
import { AdminLayout } from '../../../../../components/layouts';
import NextLink from 'next/link';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { axiosInstance, parseCookie } from '../../../../../utils';
import { useSnackbar } from 'notistack';
import { GetServerSideProps } from 'next';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FormatCommissionCalculation } from '../../../../../interfaces';

const schema = yup
  .object({
    month: yup.string(),
    client: yup.string(),
    adviser_in_charge: yup.string(),
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
  })
  .required();

export default function UpdateCommissionCalculationFormat() {
  const router = useRouter();
  const id = router.query?.id;
  const { enqueueSnackbar } = useSnackbar();
  const largeScreen = useMediaQuery((theme: any) => theme.breakpoints.up('md'));
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormatCommissionCalculation>({
    resolver: yupResolver(schema),
    mode: 'all',
  });
  const onSubmit = handleSubmit((data) => editFormat(data));
  const [loading, setLoading] = React.useState<boolean>();
  const [loadingData, setLoadingData] = React.useState<boolean>(true);

  async function getFormatById() {
    try {
      const response = await axiosInstance.get(`format/commission/getById?id=${id}`);
      if (response.status === 200 && response.data.length > 0) {
        const {
          date_application,
          bill_number,
          property,
          client,
          adviser_in_charge,
          procedure,
          status,
          price_procedure,
          total_paid,
          total_due,
          price_per_stage_process,
          expenses,
          lawyer_calculation_20,
          lawyer_calculation_30,
          lawyer_calculation_40,
          adviser_calculation_10,
          company_profit,
          stationary,
          total_paid_lawyer,
          total_due_lawyer,
          payment_date_lawyer,
          status_lawyer,
          total_paid_adviser,
          total_due_adviser,
          payment_date_adviser,
          status_adviser,
        } = response.data[0];
        setValue('date_application', date_application, {});
        setValue('bill_number', bill_number, {});
        setValue('property', property, {});
        setValue('client', client, {});
        setValue('adviser_in_charge', adviser_in_charge, {});
        setValue('procedure', procedure, {});
        setValue('status', status, {});
        setValue('price_procedure', price_procedure, {});
        setValue('total_paid', total_paid, {});
        setValue('total_due', total_due, {});
        setValue('price_per_stage_process', price_per_stage_process, {});
        setValue('expenses', expenses, {});
        setValue('lawyer_calculation_20', lawyer_calculation_20, {});
        setValue('lawyer_calculation_30', lawyer_calculation_30, {});
        setValue('lawyer_calculation_40', lawyer_calculation_40, {});
        setValue('adviser_calculation_10', adviser_calculation_10, {});
        setValue('company_profit', company_profit, {});
        setValue('stationary', stationary, {});
        setValue('total_paid_lawyer', total_paid_lawyer, {});
        setValue('total_due_lawyer', total_due_lawyer, {});
        setValue('payment_date_lawyer', payment_date_lawyer, {});
        setValue('status_lawyer', status_lawyer, {});
        setValue('total_paid_adviser', total_paid_adviser, {});
        setValue('total_due_adviser', total_due_adviser, {});
        setValue('payment_date_adviser', payment_date_adviser, {});
        setValue('status_adviser', status_adviser, {});
      }
    } catch (err) {
      enqueueSnackbar(`Error ${JSON.stringify(err)}`, { variant: 'error' });
    } finally {
      setLoadingData(false);
    }
  }

  async function editFormat(data: any) {
    const fullObj = { ...data };
    fullObj.updatedAt = new Date();
    fullObj.id = id;
    try {
      setLoading(true);
      const response = await axiosInstance.put(`format/commission/updateData`, fullObj);
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
    getFormatById();
  }, []);

  return (
    <AdminLayout title="Crear nuevo formato de cliente | Vision inmobiliaria">
      <Box>
        {loadingData && <p>Cargando...</p>}
        {!loadingData && (
          <>
            {/*TODO hacer un componente de breadcrumb*/}
            <Box display="flex" alignItems="center">
              <NextLink href="/admin/formatos/calculo-de-comisiones">Formatos de calculo de comision</NextLink>
              <ArrowRightIcon sx={{ color: 'gray' }} />
              <Typography> Editar nuevo formato de calculo de comision</Typography>
            </Box>
            <form onSubmit={onSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={2}></Grid>
                <Grid item xs={12} md={8}>
                  <Container maxWidth="md" sx={{ py: 5 }}>
                    <Typography variant="h5" align="center" color="secondary.light">
                      Datos de formato
                    </Typography>
                    <Grid container spacing={2} sx={{ mt: 3 }}>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          sx={{ mt: 2, borderColor: 'red' }}
                          placeholder="Fecha de solicitud"
                          {...register('date_application')}
                          error={Boolean(errors?.date_application)}
                          label="Fecha de solicitud"
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          sx={{ mt: 2, borderColor: 'red' }}
                          placeholder="Numero de factura"
                          {...register('bill_number')}
                          error={Boolean(errors?.bill_number)}
                          label="Numero de factura"
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          sx={{ mt: 2, borderColor: 'red' }}
                          placeholder="Inmueble"
                          {...register('property')}
                          error={Boolean(errors?.property)}
                          label="Inmueble"
                          variant="outlined"
                        />
                        <Typography variant="caption" fontWeight="bold" sx={{ color: '#FF0000' }}>
                          {errors?.property?.message}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          sx={{ mt: 2, borderColor: 'red' }}
                          placeholder="Cliente"
                          {...register('client')}
                          error={Boolean(errors?.client)}
                          label="Cliente"
                          variant="outlined"
                        />
                        <Typography variant="caption" fontWeight="bold" sx={{ color: '#FF0000' }}>
                          {errors?.client?.message}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          sx={{ mt: 2, borderColor: 'red' }}
                          placeholder="Asesor a cargo"
                          {...register('adviser_in_charge')}
                          error={Boolean(errors?.adviser_in_charge)}
                          label="Asesor a cargo"
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          sx={{ mt: 2, borderColor: 'red' }}
                          placeholder="Tramite"
                          {...register('procedure')}
                          error={Boolean(errors?.procedure)}
                          label="Tramite"
                          variant="outlined"
                        />
                        <Typography variant="caption" fontWeight="bold" sx={{ color: '#FF0000' }}>
                          {errors?.procedure?.message}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          sx={{ mt: 2, borderColor: 'red' }}
                          placeholder="Estatus (Culminado o en curso)"
                          {...register('status')}
                          error={Boolean(errors?.status)}
                          label="Estatus (Culminado o en curso)"
                          variant="outlined"
                        />
                        <Typography variant="caption" fontWeight="bold" sx={{ color: '#FF0000' }}>
                          {errors?.status?.message}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          sx={{ mt: 2, borderColor: 'red' }}
                          placeholder="Precio de tramite"
                          {...register('price_procedure')}
                          error={Boolean(errors?.price_procedure)}
                          label="Precio de tramite"
                          variant="outlined"
                        />
                        <Typography variant="caption" fontWeight="bold" sx={{ color: '#FF0000' }}>
                          {errors?.price_procedure?.message}
                        </Typography>
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          sx={{ mt: 2, borderColor: 'red' }}
                          placeholder="Pago / Abono"
                          {...register('total_paid')}
                          error={Boolean(errors?.total_paid)}
                          label="Pago / Abono"
                          variant="outlined"
                        />
                        <Typography variant="caption" fontWeight="bold" sx={{ color: '#FF0000' }}>
                          {errors?.total_paid?.message}
                        </Typography>
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          sx={{ mt: 2, borderColor: 'red' }}
                          placeholder="Por cobrar}"
                          {...register('total_due')}
                          error={Boolean(errors?.total_due)}
                          label="Por cobrar}"
                          variant="outlined"
                        />
                        <Typography variant="caption" fontWeight="bold" sx={{ color: '#FF0000' }}>
                          {errors?.total_due?.message}
                        </Typography>
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          sx={{ mt: 2, borderColor: 'red' }}
                          placeholder="Precio por etapa del proceso"
                          {...register('price_per_stage_process')}
                          error={Boolean(errors?.price_per_stage_process)}
                          label="Precio por etapa del proceso"
                          variant="outlined"
                        />
                        <Typography variant="caption" fontWeight="bold" sx={{ color: '#FF0000' }}>
                          {errors?.price_per_stage_process?.message}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          sx={{ mt: 2, borderColor: 'red' }}
                          placeholder="Gastos"
                          {...register('expenses')}
                          error={Boolean(errors?.expenses)}
                          label="Gastos"
                          variant="outlined"
                        />
                        <Typography variant="caption" fontWeight="bold" sx={{ color: '#FF0000' }}>
                          {errors?.expenses?.message}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          sx={{ mt: 2, borderColor: 'red' }}
                          placeholder="Calculo abogado 20%"
                          {...register('lawyer_calculation_20')}
                          error={Boolean(errors?.lawyer_calculation_20)}
                          label="Calculo abogado 20%"
                          variant="outlined"
                        />
                        <Typography variant="caption" fontWeight="bold" sx={{ color: '#FF0000' }}>
                          {errors?.lawyer_calculation_20?.message}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          sx={{ mt: 2, borderColor: 'red' }}
                          placeholder="Calculo abogado 30%"
                          {...register('lawyer_calculation_30')}
                          error={Boolean(errors?.lawyer_calculation_30)}
                          label="Calculo abogado 30%"
                          variant="outlined"
                        />
                        <Typography variant="caption" fontWeight="bold" sx={{ color: '#FF0000' }}>
                          {errors?.lawyer_calculation_30?.message}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          sx={{ mt: 2, borderColor: 'red' }}
                          placeholder="Calculo abogado 40%"
                          {...register('lawyer_calculation_40')}
                          error={Boolean(errors?.lawyer_calculation_40)}
                          label="Calculo abogado 40%"
                          variant="outlined"
                        />
                        <Typography variant="caption" fontWeight="bold" sx={{ color: '#FF0000' }}>
                          {errors?.lawyer_calculation_40?.message}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          sx={{ mt: 2, borderColor: 'red' }}
                          placeholder="Calculo de asesor 10%"
                          {...register('adviser_calculation_10')}
                          error={Boolean(errors?.adviser_calculation_10)}
                          label="Calculo de asesor 10%"
                          variant="outlined"
                        />
                        <Typography variant="caption" fontWeight="bold" sx={{ color: '#FF0000' }}>
                          {errors?.adviser_calculation_10?.message}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          sx={{ mt: 2, borderColor: 'red' }}
                          placeholder="Ganancia de la empresa"
                          {...register('company_profit')}
                          error={Boolean(errors?.company_profit)}
                          label="Ganancia de la empresa"
                          variant="outlined"
                        />
                        <Typography variant="caption" fontWeight="bold" sx={{ color: '#FF0000' }}>
                          {errors?.company_profit?.message}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          sx={{ mt: 2, borderColor: 'red' }}
                          placeholder="Papeleria"
                          {...register('stationary')}
                          error={Boolean(errors?.stationary)}
                          label="Papeleria"
                          variant="outlined"
                        />
                        <Typography variant="caption" fontWeight="bold" sx={{ color: '#FF0000' }}>
                          {errors?.stationary?.message}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Container>
                  <Divider sx={{ borderWidth: '2px', my: 3 }} />
                  <Container sx={{ py: 5 }} maxWidth="md">
                    <Typography variant="h5" align="center" color="secondary.light">
                      Estatus pago de abogado
                    </Typography>
                    <Grid container spacing={2} sx={{ mt: 3 }}>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          sx={{ mt: 2, borderColor: 'red' }}
                          placeholder="Monto pagado"
                          {...register('total_paid_lawyer')}
                          error={Boolean(errors?.total_paid_lawyer)}
                          label="Monto pagado"
                          variant="outlined"
                        />
                        <Typography variant="caption" fontWeight="bold" sx={{ color: '#FF0000' }}>
                          {errors?.total_paid_lawyer?.message}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          sx={{ mt: 2, borderColor: 'red' }}
                          placeholder="Por pagar"
                          {...register('total_due_lawyer')}
                          error={Boolean(errors?.total_due_lawyer)}
                          label="Por pagar"
                          variant="outlined"
                        />
                        <Typography variant="caption" fontWeight="bold" sx={{ color: '#FF0000' }}>
                          {errors?.total_due_lawyer?.message}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          sx={{ mt: 2, borderColor: 'red' }}
                          placeholder="Fecha de pago"
                          {...register('payment_date_lawyer')}
                          error={Boolean(errors?.payment_date_lawyer)}
                          label="Fecha de pago"
                          variant="outlined"
                        />
                        <Typography variant="caption" fontWeight="bold" sx={{ color: '#FF0000' }}>
                          {errors?.payment_date_lawyer?.message}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          sx={{ mt: 2, borderColor: 'red' }}
                          placeholder="Estatus"
                          {...register('status_lawyer')}
                          error={Boolean(errors?.status_lawyer)}
                          label="Estatus"
                          variant="outlined"
                        />
                        <Typography variant="caption" fontWeight="bold" sx={{ color: '#FF0000' }}>
                          {errors?.status_lawyer?.message}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Container>
                  <Divider sx={{ borderWidth: '2px', my: 3 }} />
                  <Container sx={{ py: 5 }} maxWidth="md">
                    <Typography variant="h5" align="center" color="secondary.light">
                      Estatus pago de asesor
                    </Typography>
                    <Grid container spacing={2} sx={{ mt: 3 }}>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          sx={{ mt: 2, borderColor: 'red' }}
                          placeholder="Monto pagado"
                          {...register('total_paid_adviser')}
                          error={Boolean(errors?.total_paid_adviser)}
                          label="Monto pagado"
                          variant="outlined"
                        />
                        <Typography variant="caption" fontWeight="bold" sx={{ color: '#FF0000' }}>
                          {errors?.total_paid_adviser?.message}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          sx={{ mt: 2, borderColor: 'red' }}
                          placeholder="Por pagar"
                          {...register('total_due_adviser')}
                          error={Boolean(errors?.total_due_adviser)}
                          label="Por pagar"
                          variant="outlined"
                        />
                        <Typography variant="caption" fontWeight="bold" sx={{ color: '#FF0000' }}>
                          {errors?.total_due_adviser?.message}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          sx={{ mt: 2, borderColor: 'red' }}
                          placeholder="Fecha de pago"
                          {...register('payment_date_adviser')}
                          error={Boolean(errors?.payment_date_adviser)}
                          label="Fecha de pago"
                          variant="outlined"
                        />
                        <Typography variant="caption" fontWeight="bold" sx={{ color: '#FF0000' }}>
                          {errors?.payment_date_adviser?.message}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          sx={{ mt: 2, borderColor: 'red' }}
                          placeholder="Estatus"
                          {...register('status_adviser')}
                          error={Boolean(errors?.status_adviser)}
                          label="Estatus"
                          variant="outlined"
                        />
                        <Typography variant="caption" fontWeight="bold" sx={{ color: '#FF0000' }}>
                          {errors?.status_adviser?.message}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Container>
                  <Divider sx={{ borderWidth: '2px', my: 3 }} />
                  <Container maxWidth="md" sx={{ py: 5 }}>
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
                      <Button
                        fullWidth={!largeScreen}
                        disabled={loading || Object.keys(errors).length > 0}
                        type="submit"
                        variant="contained"
                      >
                        Editar formato de calculo de comisiones
                      </Button>
                    </Grid>
                  </Container>
                </Grid>
              </Grid>
            </form>
          </>
        )}
      </Box>
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
