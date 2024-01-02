import React from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  useMediaQuery,
  Paper,
  Typography,
  Grid,
  TextField,
  InputAdornment,
  Divider,
  Select,
  MenuItem,
  FormControl,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { axiosInstance } from '../../../../../utils';
import { useSnackbar } from 'notistack';

export function CommissionModal({ close, open, data, reload }: any) {
  const largeScreen = useMediaQuery((theme: any) => theme.breakpoints.up('md'));
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [currentStatus, setCurrentStatus] = React.useState<string>(data?.property_status);
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
    id: data.id,
    idSeller: 'id seller',
  });

  const [customCommission, setCustomCommission] = React.useState(false);

  function handleChange(key: any, value: any) {
    if (key === 'commission') {
      if (value === 'Otro') setCustomCommission(true);
      if (value !== 'Otro') {
        setComissionData((prevState) => ({
          ...prevState,
          customCommission: null,
        }));
        setCustomCommission(false);
      }
    }
    setComissionData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  }

  function percentage(num: any, per: any) {
    return (num / 100) * per;
  }

  function validation() {
    const { finalPrice, commisionRoyalty, commission, customCommission } = comissionData;
    let currentCommission = customCommission ? customCommission : commission;
    return !(currentCommission !== 'Otro' && finalPrice && commisionRoyalty);
  }

  function handleRegisterData() {
    // updateSellerAndCommission(comissionData)
    close();
  }

  const handleRejectChanges = async () => {
    const payload = {
      comments: 'Se cancelo el cierre por externo...',
      property_id: data.id,
      status: currentStatus,
      user_id: 'id de user',
      username: 'user name de usaer',
    };

    await updateStatusProperty(data.id, currentStatus, payload);
    close();
  };

  async function updateStatusProperty(id: any, status: string, payload: any) {
    try {
      const response = await axiosInstance.put('property/updateStatus', { id, property_status: status });
      if (response.status === 200) {
        enqueueSnackbar('Se cambio el estado de la propiedad al ultimo estado registrado', { variant: 'info' });
        await updateHistory(payload);
      }
    } catch (e) {
      enqueueSnackbar('No se pudo cambiar el estatus de la propiedad, ocurrio un error!', { variant: 'error' });
    }
  }

  async function updateHistory(payload: any) {
    try {
      const response = await axiosInstance.post('property/addHistoric', payload);
      if (response.status === 200) {
        enqueueSnackbar('Se actualizo el historial de la propiedad con exito!', { variant: 'success' });
        reload();
      }
    } catch (e) {
      enqueueSnackbar('No se pudo cambiar el estatus de la propiedad, ocurrio un error!', { variant: 'error' });
    }
  }

  React.useEffect(() => {
    let commission = comissionData.customCommission ? comissionData.customCommission : comissionData.commission;
    setComissionData((prevState: any) => ({
      ...prevState,
      commissionSeller: percentage(commission, comissionData.finalPrice) / 2,
      commisionRoyaltySeller: percentage(comissionData.commisionRoyalty, percentage(commission, comissionData.finalPrice) / 2),
    }));
  }, [comissionData.finalPrice, comissionData.commission, comissionData.customCommission, comissionData.commisionRoyalty]);
  return (
    <Dialog fullScreen open={open} onClose={close} aria-labelledby="responsive-dialog-title">
      <Paper elevation={2} sx={{ display: 'flex', justifyContent: 'center', padding: '1rem 3rem' }}>
        <Box>
          <Typography align="center" variant="h3" color="primary">
            VENTA CERRADO CON EXTERNO
          </Typography>
          {data && (
            <Typography align="center" fontWeight="bold" style={{ color: 'gray' }}>
              {data.code}
            </Typography>
          )}
        </Box>
      </Paper>
      {data && (
        <>
          <DialogContent sx={{ padding: '1rem 3rem' }}>
            <Grid container spacing={2} sx={{ mt: 10 }}>
              <Grid item xs={12} md={4}>
                <Typography fontWeight="bold" sx={{ mb: 1 }}>
                  Precio final
                </Typography>
                <TextField
                  color="secondary"
                  fullWidth
                  placeholder="0.00"
                  value={comissionData.finalPrice}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">$</InputAdornment>,
                  }}
                  onChange={(e) => handleChange('finalPrice', e.target.value)}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography fontWeight="bold" sx={{ mb: 1 }}>
                  Porcentage Comisión Cobrada
                </Typography>
                <FormControl fullWidth>
                  <Select
                    color="secondary"
                    id="demo-simple-select"
                    value={comissionData.commission}
                    onChange={(e) => handleChange('commission', e.target.value)}
                  >
                    <MenuItem value="5">5%</MenuItem>
                    <MenuItem value="Otro">Otro</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                {customCommission && (
                  <>
                    <Typography fontWeight="bold" sx={{ mb: 1 }}>
                      Porcentage Comisión Cobrada
                    </Typography>
                    <TextField
                      color="secondary"
                      fullWidth
                      placeholder="0%"
                      value={comissionData.customCommission}
                      onChange={(e) => handleChange('customCommission', e.target.value)}
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
                  value={comissionData.commissionSeller ? comissionData.commissionSeller : 0}
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
                  value={comissionData.commisionRoyalty}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">%</InputAdornment>,
                  }}
                  onChange={(e) => handleChange('commisionRoyalty', e.target.value)}
                  variant="outlined"
                />
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
                  placeholder="0.00"
                  value={comissionData.commisionRoyaltySeller ? comissionData.commisionRoyaltySeller : 0}
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
                  value={comissionData.externalFistName}
                  onChange={(e) => handleChange('externalFistName', e.target.value)}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <Typography fontWeight="bold" sx={{ mb: 1 }}>
                  Apellidos
                </Typography>
                <TextField
                  color="secondary"
                  fullWidth
                  value={comissionData.externalLastName}
                  onChange={(e) => handleChange('externalLastName', e.target.value)}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <Typography fontWeight="bold" sx={{ mb: 1 }}>
                  C.I.
                </Typography>
                <TextField
                  color="secondary"
                  fullWidth
                  value={comissionData.externalIdentification}
                  onChange={(e) => handleChange('externalIdentification', e.target.value)}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <Typography fontWeight="bold" sx={{ mb: 1 }}>
                  Empresa
                </Typography>
                <TextField
                  color="secondary"
                  fullWidth
                  value={comissionData.externalCompany}
                  onChange={(e) => handleChange('externalCompany', e.target.value)}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <Typography fontWeight="bold" sx={{ mb: 1 }}>
                  Teléfono
                </Typography>
                <TextField
                  color="secondary"
                  fullWidth
                  value={comissionData.externalPhoneNumber}
                  onChange={(e) => handleChange('externalPhoneNumber', e.target.value)}
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
                  value={comissionData.externalObservations}
                  onChange={(e) => handleChange('externalObservations', e.target.value)}
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
                  value={comissionData.commisionRoyaltySeller ? comissionData.commisionRoyaltySeller : 0}
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" fullWidth onClick={handleRejectChanges}>
              Regresar
            </Button>
            <Button variant="contained" fullWidth onClick={handleRegisterData} disabled={validation() || loading}>
              {loading ? 'Registrando...' : 'Registrar'}
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
}
