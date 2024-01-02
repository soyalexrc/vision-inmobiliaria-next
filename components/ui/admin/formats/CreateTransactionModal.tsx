import React, { useState } from 'react';

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Divider,
  IconButton,
  useMediaQuery,
  Typography,
  Grid,
  Container,
  TextField,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string } from 'yup';
import { axiosInstance } from '../../../../utils';
import { useRouter } from 'next/router';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { RHFAutocomplete } from '../../forms';
import { AuthContext } from '../../../../context/auth';

const schema = object({
  originEntity: string().required('Este campo es requerido'),
  destinyEntity: string().required('Este campo es requerido'),
  reason: string().required('Este campo es requerido'),
  amount: string().required('Este campo es requerido'),
  currency: string().required('Este campo es requerido'),
  way_to_pay: string().required('Este campo es requerido'),
  createdBy: string(),
}).required();

interface Transaction {
  originEntity: string;
  destinyEntity: string;
  reason: string;
  amount: string;
  currency: string;
  way_to_pay: string;
  createdBy: string;
}

export function CreateTransactionModal({ close, open }: any) {
  const router = useRouter();
  const { currentUser } = React.useContext(AuthContext);

  const { enqueueSnackbar } = useSnackbar();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm<Transaction>({
    resolver: yupResolver(schema),
    mode: 'all',
  });
  const [loading, setLoading] = useState(false);
  const onSubmit = handleSubmit((data) => createMoneyTransaction(data));
  const largeScreen = useMediaQuery((theme: any) => theme.breakpoints.up('md'));

  async function createMoneyTransaction(data: any) {
    const fullObj = { ...data };
    fullObj.createdBy = currentUser.username || '';
    // fullObj.canon = null;
    // fullObj.contract = null;
    // fullObj.client = null;
    // fullObj.guerantee = null;
    // fullObj.location = null;
    // fullObj.observations = null;
    // fullObj.pending_to_collect = null;
    // fullObj.property = null;
    // fullObj.service = null;
    // fullObj.tax_payer = null;
    // fullObj.type_of_property = null;
    // fullObj.type_of_service = null;
    // fullObj.total_due = null;
    // fullObj.transactionType = null;
    // fullObj.month = 'JULIO';
    fullObj.isTemporalTransaction = true;
    try {
      setLoading(true);
      const response = await axiosInstance.post(`format/cashFlow/transferAmount`, fullObj);
      if (response.status === 200) {
        router.back();
        enqueueSnackbar('Se registro el traslado con exito!', { variant: 'success' });
      }
    } catch (e) {
      enqueueSnackbar('Error!', { variant: 'error' });
    } finally {
      setLoading(false);
      close();
    }
  }

  return (
    <Dialog open={open} onClose={close}>
      <Box display="flex" justifyContent="flex-end" alignItems="center" px={2} pt={2}>
        <IconButton>
          <CloseIcon onClick={close} />
        </IconButton>
      </Box>
      <Box p={2}>
        <form onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Container maxWidth="md">
                <Typography variant="h5" align="center" color="secondary.light">
                  Datos de traslado
                </Typography>
                <Grid container spacing={2} sx={{ mt: 3 }}>
                  <Grid item xs={12} md={5}>
                    <RHFAutocomplete
                      name="originEntity"
                      size="small"
                      control={control}
                      options={[
                        'Banco Nacional de Crédito (BNC)',
                        'Banesco Panamá',
                        'Banesco Venezuela',
                        'Banco Nacional de Terceros',
                        'Oficina Paseo La Granja',
                        'Oficina San Carlos',
                        'Tesorería',
                        'Ingreso a cuenta de terceros',
                      ]}
                      getOptionLabel={(option: any) => option || ''}
                      defaultValue={null}
                      label="Entidad"
                    />
                    <Typography variant="caption" fontWeight="bold" sx={{ color: '#FF0000' }}>
                      {errors?.originEntity?.message}
                    </Typography>
                  </Grid>
                  {largeScreen && (
                    <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <ArrowForwardIcon />
                    </Grid>
                  )}

                  <Grid item xs={12} md={5}>
                    <RHFAutocomplete
                      name="destinyEntity"
                      size="small"
                      control={control}
                      options={[
                        'Banco Nacional de Crédito (BNC)',
                        'Banesco Panamá',
                        'Banesco Venezuela',
                        'Banco Nacional de Terceros',
                        'Oficina Paseo La Granja',
                        'Oficina San Carlos',
                        'Tesorería',
                        'Ingreso a cuenta de terceros',
                      ]}
                      getOptionLabel={(option: any) => option || ''}
                      defaultValue={null}
                      label="Entidad"
                    />
                    <Typography variant="caption" fontWeight="bold" sx={{ color: '#FF0000' }}>
                      {errors?.destinyEntity?.message}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      size="small"
                      fullWidth
                      placeholder="Monto"
                      sx={{ mt: 2 }}
                      {...register('amount')}
                      error={Boolean(errors?.amount)}
                      label="Monto"
                      variant="outlined"
                    />
                    <Typography variant="caption" fontWeight="bold" sx={{ color: '#FF0000' }}>
                      {errors?.amount?.message}
                    </Typography>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <RHFAutocomplete
                      name="way_to_pay"
                      control={control}
                      options={['Efectivo', 'Transferencia', 'Pago Movil', 'Zelle']}
                      getOptionLabel={(option: any) => option || ''}
                      defaultValue={null}
                      size="small"
                    />
                    <Typography variant="caption" fontWeight="bold" sx={{ color: '#FF0000' }}>
                      {errors?.way_to_pay?.message}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <RHFAutocomplete
                      name="currency"
                      control={control}
                      size="small"
                      options={['$', 'Bs', '€']}
                      getOptionLabel={(option: any) => option || ''}
                      defaultValue={null}
                      label="Moneda"
                    />
                    <Typography variant="caption" fontWeight="bold" sx={{ color: '#FF0000' }}>
                      {errors?.currency?.message}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography sx={{ mb: 1 }}>Fecha de nacimiento</Typography>
                    <TextField
                      variant="outlined"
                      fullWidth
                      multiline
                      rows={4}
                      placeholder="Motivo"
                      label="Motivo"
                      {...register('reason')}
                      error={Boolean(errors?.reason)}
                    />
                    <Typography variant="caption" fontWeight="bold" sx={{ color: '#FF0000' }}>
                      {errors?.reason?.message}
                    </Typography>
                  </Grid>
                </Grid>
              </Container>
              <Container maxWidth="md" sx={{ py: 5 }}>
                <Grid
                  item
                  xs={12}
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    mt: 5,
                  }}
                >
                  <Button fullWidth={!largeScreen} disabled={loading || Object.keys(errors).length > 0} type="submit" variant="contained">
                    Guardar cambios
                  </Button>
                </Grid>
              </Container>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Dialog>
  );
}
