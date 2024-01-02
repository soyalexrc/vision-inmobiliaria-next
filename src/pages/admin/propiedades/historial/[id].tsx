import React from 'react';
import { AdminLayout } from '../../../../../components/layouts';
import { Box, Button, DialogActions, DialogContent, Divider, Grid, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { axiosInstance } from '../../../../../utils';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
export default function HistoricPropertyPage() {
  const [historyData, setHistoryData] = React.useState<any>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const id = router.query?.id;

  async function getPropertyHistory() {
    try {
      const response = await axiosInstance.get(`property/getHistoricByPropertyId?property_id=${id}`);
      if (response.status === 200) {
        setHistoryData(response.data);
      }
    } catch (e) {
      enqueueSnackbar('No se consiguio informacion de esta propiedad, ocurrio un error!', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    if (id) {
      getPropertyHistory();
    }
  }, [id]);

  return (
    <AdminLayout title="Historico de propiedad | Vision Inmobiliaria">
      <>
        {/*TODO hacer un componente de breadcrumb*/}
        <Box display="flex" alignItems="center" mb={4}>
          <NextLink href="/admin/propiedades">Propiedades</NextLink>
          <ArrowRightIcon sx={{ color: 'gray' }} />
          <Typography> Historico de estatus de propiedad</Typography>
        </Box>
        {loading && <p>cargando...</p>}
        {!loading && historyData && (
          <>
            <Typography variant="h1" align="center" color="primary">
              Historico de estatus{' '}
            </Typography>
            <Grid container spacing={2} sx={{ mt: 3 }}>
              {historyData.length < 1 && (
                <Grid item xs={12}>
                  <Typography>No hay record de status en esta propiedad...</Typography>
                </Grid>
              )}
              {historyData.length > 0 &&
                historyData.map((item: any) => (
                  <>
                    <Grid item xs={12} md={3}>
                      <Typography fontWeight="bold">Usuario</Typography>
                      <Typography>{item.username}</Typography>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <Typography fontWeight="bold">Fecha</Typography>
                      <Typography>{item.created_date}</Typography>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <Typography fontWeight="bold">Estatus</Typography>
                      <Typography>{item.status}</Typography>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <Typography fontWeight="bold">Comentarios</Typography>
                      <Typography>{item.comments}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Divider sx={{ my: 2, borderWidth: '2px' }} />
                    </Grid>
                  </>
                ))}
            </Grid>
          </>
        )}
      </>
    </AdminLayout>
  );
}
