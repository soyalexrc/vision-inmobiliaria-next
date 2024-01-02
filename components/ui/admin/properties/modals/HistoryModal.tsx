import React from 'react';

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
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export function HistoryModal({ close, open, data }: any) {
  function formatDate(dateStr: string) {
    const date = dateStr.split('T')[0];
    const time = dateStr.split('T')[1].split('.')[0];
    return `${date} - ${time}`;
  }

  return (
    <Dialog fullScreen open={open} onClose={close} aria-labelledby="responsive-dialog-title">
      <Box display="flex" justifyContent="flex-end" p={2}>
        <IconButton>
          <CloseIcon onClick={close} />
        </IconButton>
      </Box>
      {data && (
        <>
          <DialogContent sx={{ padding: '1rem 3rem' }}>
            <Typography variant="h1" color="primary">
              Historico de estatus{' '}
            </Typography>
            <Grid container spacing={2} sx={{ mt: 3 }}>
              {data.length < 1 && (
                <Grid item xs={12}>
                  <Typography>No hay record de status en esta propiedad...</Typography>
                </Grid>
              )}
              {data.length > 0 &&
                data.map((item: any) => (
                  <>
                    <Grid item xs={12} md={3}>
                      <Typography fontWeight="bold">Usuario</Typography>
                      <Typography>{item.username}</Typography>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <Typography fontWeight="bold">Fecha</Typography>
                      <Typography>{formatDate(item.created_date)}</Typography>
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
          </DialogContent>
          <DialogActions>
            <Button variant="contained" fullWidth onClick={close}>
              Cerrar
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
}
