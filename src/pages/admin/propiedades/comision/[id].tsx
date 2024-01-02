import React from 'react';
import { Box, Divider, Grid, Typography, TextField, InputAdornment, FormControl, Select, MenuItem, Button } from '@mui/material';
import { AdminLayout } from '../../../../../components/layouts';
import { axiosInstance } from '../../../../../utils';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

interface FormValues {
  finalPrice: string;
  commission: string;
  customCommission: string | null;
  commissionSeller: string;
  commisionRentalType: string;
  commisionRoyalty: string;
  commisionRoyaltySeller: string;
  externalCompany: string;
  externalFistName: string;
  externalIdentification: string;
  externalLastName: string;
  externalObservations: string;
  externalPhoneNumber: string;
}

const schema = yup
  .object({
    finalPrice: yup.string().required('Este campo es requerido'),
    commission: yup.string(),
    customCommission: yup.string(),
    commisionRentalType: yup.string().required('Este campo es requerido'),
    commissionSeller: yup.string().required('Este campo es requerido'),
    commisionRoyalty: yup.string().required('Este campo es requerido'),
    commisionRoyaltySeller: yup.string().required('Este campo es requerido'),
    externalCompany: yup.string().required('Este campo es requerido'),
    externalFistName: yup.string().required('Este campo es requerido'),
    externalIdentification: yup.string().required('Este campo es requerido'),
    externalLastName: yup.string().required('Este campo es requerido'),
    externalObservations: yup.string().required('Este campo es requerido'),
    externalPhoneNumber: yup.string().required('Este campo es requerido'),
  })
  .required();

export default function ComissionPropertyPage() {
  const [propertyData, setPropertyData] = React.useState<any>({});
  const [loading, setLoading] = React.useState<boolean>(true);
  const { enqueueSnackbar } = useSnackbar();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    mode: 'all',
  });
  const finalPriceWatched = watch('finalPrice');
  const comissionPercentageWatched = watch('commission');
  const customComissionPercentageWatched = watch('customCommission');
  const commisionRoyaltyWatched = watch('commisionRoyalty');

  const onSubmit = handleSubmit((data) => updateSellerAndCommission(data));
  const router = useRouter();
  const id = router.query?.id;

  async function updateSellerAndCommission(payload: any) {
    try {
      setLoading(true);
      const response = await axiosInstance.put('property/updateSellerAndComission', payload);
      if (response.status === 200) {
        enqueueSnackbar('Se actualizo la informacion de comisiones con exito!', { variant: 'success' });
        // await getProperties({
        //   filters: [],
        //   pageNumber: 1,
        //   pageSize: 10
        // })
      }
    } catch (e) {
      enqueueSnackbar('No se pudo registrar la informacion, ocurrio un error!', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  }

  async function getPropertyById() {
    try {
      const response = await axiosInstance.get(`property/getById?id=${id}`);
      if (response.status === 200) {
        setPropertyData(response.data);
      }
    } catch (err) {
      enqueueSnackbar(`Error ${JSON.stringify(err)}`, { variant: 'error' });
    } finally {
      setLoading(false);
    }
  }

  const [comissionData, setComissionData] = React.useState({
    finalPrice: null,
    commission: null,
    customCommission: null,
    commisionRentalType: '',
    commisionRoyalty: null,
    commisionRoyaltySeller: null,
    commissionSeller: null,
    externalCompany: '',
    externalFistName: '',
    externalIdentification: '',
    externalLastName: '',
    externalObservations: '',
    externalPhoneNumber: '',
    // id: id,
    // idSeller: getUser().id
  });

  function percentage(num: any, per: any, isSpecial: boolean = false): string {
    const number = typeof num === 'string' ? Number(num) : num;
    const percentage = typeof per === 'string' ? Number(per) : per;
    const result = isSpecial ? ((number / 100) * percentage) / 2 : (number / 100) * percentage;
    return result.toString();
  }

  React.useEffect(() => {
    if (id) {
      getPropertyById();
    }
  }, [id]);

  React.useEffect(() => {
    const commissionSeller =
      comissionPercentageWatched === 'Otro'
        ? percentage(customComissionPercentageWatched, finalPriceWatched, true)
        : percentage(comissionPercentageWatched, finalPriceWatched, true);
    const commissionRyaltySeller =
      comissionPercentageWatched === 'Otro'
        ? percentage(commisionRoyaltyWatched, percentage(customComissionPercentageWatched, finalPriceWatched, true))
        : percentage(commisionRoyaltyWatched, percentage(comissionPercentageWatched, finalPriceWatched, true));
    setValue('commissionSeller', commissionSeller);
    setValue('commisionRoyaltySeller', commissionRyaltySeller);

    //  TODO Todo el valor queda atrasado....
  }, [comissionPercentageWatched, customComissionPercentageWatched, finalPriceWatched, commisionRoyaltyWatched]);

  return (
    <AdminLayout title="Cierre de venta externo">
      <Box p={5}>
        {/*TODO hacer un componente de breadcrumb*/}
        <Box display="flex" alignItems="center" mb={4}>
          <NextLink href="/admin/propiedades">Propiedades</NextLink>
          <ArrowRightIcon sx={{ color: 'gray' }} />
          <Typography> Cierre de venta externo</Typography>
        </Box>
        {propertyData && !loading && (
          <form onSubmit={onSubmit}>
            <>
              <Box>
                <Typography align="center" variant="h3" color="primary">
                  VENTA CERRADO CON EXTERNO
                </Typography>
                {propertyData && (
                  <Typography align="center" fontWeight="bold" style={{ color: 'gray' }}>
                    {propertyData.property?.code}
                  </Typography>
                )}
              </Box>

              <Grid container spacing={2} sx={{ mt: 10 }}>
                <Grid item xs={12} md={4}>
                  <Typography fontWeight="bold" sx={{ mb: 1 }}>
                    Precio final
                  </Typography>
                  <TextField
                    color="secondary"
                    fullWidth
                    placeholder="0.00"
                    InputProps={{
                      endAdornment: <InputAdornment position="end">$</InputAdornment>,
                    }}
                    {...register('finalPrice')}
                    error={Boolean(errors?.finalPrice)}
                    variant="outlined"
                  />
                  <Typography variant="caption" fontWeight="bold" sx={{ color: '#FF0000' }}>
                    {errors?.finalPrice?.message}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography fontWeight="bold" sx={{ mb: 1 }}>
                    Porcentage Comisión Cobrada
                  </Typography>
                  <FormControl fullWidth>
                    <Select color="secondary" disabled={!finalPriceWatched} {...register('commission')} error={Boolean(errors?.commission)}>
                      <MenuItem value="5">5%</MenuItem>
                      <MenuItem value="Otro">Otro</MenuItem>
                    </Select>
                  </FormControl>
                  <Typography variant="caption" fontWeight="bold" sx={{ color: '#FF0000' }}>
                    {errors?.commission?.message}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  {comissionPercentageWatched === 'Otro' && (
                    <>
                      <Typography fontWeight="bold" sx={{ mb: 1 }}>
                        Porcentage Comisión Cobrada
                      </Typography>
                      <TextField
                        color="secondary"
                        fullWidth
                        placeholder="0%"
                        {...register('customCommission')}
                        error={Boolean(errors?.customCommission)}
                        variant="outlined"
                      />
                    </>
                  )}
                </Grid>
              </Grid>
              <Divider sx={{ my: 5 }} />
              <Typography variant="h5">Comisión de Venta</Typography>
              <Typography variant="caption" sx={{ mb: 3 }}>
                Seleccione la comision asociada al inmueble
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <Typography fontWeight="bold" sx={{ mb: 1 }}>
                    Comisión Captador
                  </Typography>
                  <TextField
                    sx={{
                      backgroundColor: '#e9ecef',
                    }}
                    color="secondary"
                    fullWidth
                    disabled
                    placeholder="0.00"
                    {...register('commissionSeller')}
                    error={Boolean(errors?.commissionSeller)}
                    InputProps={{
                      endAdornment: <InputAdornment position="end">%</InputAdornment>,
                    }}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography fontWeight="bold" sx={{ mb: 1 }}>
                    % Que Aplica Nivel Captador{' '}
                  </Typography>
                  <TextField
                    color="secondary"
                    fullWidth
                    placeholder="0.00"
                    {...register('commisionRoyalty')}
                    error={Boolean(errors?.commisionRoyalty)}
                    InputProps={{
                      endAdornment: <InputAdornment position="end">%</InputAdornment>,
                    }}
                    variant="outlined"
                  />
                  <Typography variant="caption" fontWeight="bold" sx={{ color: '#FF0000' }}>
                    {errors?.commisionRoyalty?.message}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography fontWeight="bold" sx={{ mb: 1 }}>
                    Royalty Captador
                  </Typography>
                  <TextField
                    color="secondary"
                    sx={{
                      backgroundColor: '#e9ecef',
                    }}
                    fullWidth
                    disabled
                    {...register('commisionRoyaltySeller')}
                    error={Boolean(errors?.commisionRoyaltySeller)}
                    placeholder="0.00"
                    InputProps={{
                      endAdornment: <InputAdornment position="end">%</InputAdornment>,
                    }}
                    variant="outlined"
                  />
                </Grid>
              </Grid>

              <Divider sx={{ my: 5 }} />
              <Typography variant="h5" sx={{ mb: 3 }}>
                Asesor Inmobiliario Externo
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={3}>
                  <Typography fontWeight="bold" sx={{ mb: 1 }}>
                    Nombres
                  </Typography>
                  <TextField
                    color="secondary"
                    fullWidth
                    {...register('externalFistName')}
                    error={Boolean(errors?.externalFistName)}
                    variant="outlined"
                  />
                  <Typography variant="caption" fontWeight="bold" sx={{ color: '#FF0000' }}>
                    {errors?.externalFistName?.message}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Typography fontWeight="bold" sx={{ mb: 1 }}>
                    Apellidos
                  </Typography>
                  <TextField
                    color="secondary"
                    fullWidth
                    {...register('externalLastName')}
                    error={Boolean(errors?.externalLastName)}
                    variant="outlined"
                  />
                  <Typography variant="caption" fontWeight="bold" sx={{ color: '#FF0000' }}>
                    {errors?.externalLastName?.message}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Typography fontWeight="bold" sx={{ mb: 1 }}>
                    C.I.
                  </Typography>
                  <TextField
                    color="secondary"
                    fullWidth
                    {...register('externalIdentification')}
                    error={Boolean(errors?.externalIdentification)}
                    variant="outlined"
                  />
                  <Typography variant="caption" fontWeight="bold" sx={{ color: '#FF0000' }}>
                    {errors?.externalIdentification?.message}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Typography fontWeight="bold" sx={{ mb: 1 }}>
                    Empresa
                  </Typography>
                  <TextField
                    color="secondary"
                    fullWidth
                    {...register('externalCompany')}
                    error={Boolean(errors?.externalCompany)}
                    variant="outlined"
                  />
                  <Typography variant="caption" fontWeight="bold" sx={{ color: '#FF0000' }}>
                    {errors?.externalCompany?.message}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Typography fontWeight="bold" sx={{ mb: 1 }}>
                    Teléfono
                  </Typography>
                  <TextField
                    color="secondary"
                    fullWidth
                    {...register('externalPhoneNumber')}
                    error={Boolean(errors?.externalPhoneNumber)}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography fontWeight="bold" sx={{ mb: 1 }}>
                    Observaciones
                  </Typography>
                  <TextField
                    color="secondary"
                    fullWidth
                    multiline
                    rows={5}
                    {...register('externalObservations')}
                    error={Boolean(errors?.externalObservations)}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <Typography fontWeight="bold" sx={{ mb: 1 }}>
                    Royalty total de ingresos Vision Inmobiliaria
                  </Typography>
                  <TextField
                    color="secondary"
                    fullWidth
                    sx={{
                      backgroundColor: '#e9ecef',
                    }}
                    disabled
                    {...register('commisionRoyaltySeller')}
                    error={Boolean(errors?.commisionRoyaltySeller)}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} md={9} />
                <Grid item xs={6} sx={{ mt: 5 }}>
                  <Button fullWidth variant="outlined">
                    Cancelar
                  </Button>
                </Grid>
                <Grid item xs={6} sx={{ mt: 5 }}>
                  <Button fullWidth variant="contained">
                    Guardar cambios
                  </Button>
                </Grid>
              </Grid>
            </>
          </form>
        )}
        {loading && <p>cargando...</p>}
      </Box>
    </AdminLayout>
  );
}
