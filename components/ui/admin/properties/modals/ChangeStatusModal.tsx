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
  Typography, Grid, InputLabel, Select, MenuItem, FormControl
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close'

import {axiosInstance} from "../../../../../utils";
import {useSnackbar} from "notistack";

export function ChangeStatusModal({close, open, data, trigger, reload}: any) {
  const largeScreen = useMediaQuery((theme: any) => theme.breakpoints.up('md'));
  const { enqueueSnackbar} = useSnackbar()

  React.useEffect(() => {
    console.log(data);
  }, [open])

  async function middleWare(id: any, value: any) {
    const payload = {
      comments: '',
      property_id: data.id,
      status: value,
      user_id: 'id de user',
      username: 'user name de usaer'
    }
    console.log(id, value, payload);
    await updateStatusProperty(id, value, payload)
    if (value === 'Cerrado por Externo') {
      console.log('handle trigger')
      trigger()
    }
    close();
  }


  async function updateStatusProperty(id: any, status: string, payload: any) {
    try {
      const response = await axiosInstance.put("property/updateStatus", {id, property_status: status})
      console.log(response);
      if (response.status === 200) {
        enqueueSnackbar('Se cambio el estado de la propiedad con exito!', {variant: 'success'});
        await updateHistory(payload);
      }
    } catch (e) {
      enqueueSnackbar('No se pudo cambiar el estatus de la propiedad, ocurrio un error!', {variant: 'error'})
    }
  }

  async function updateHistory(payload: any) {
    try {
      const response = await axiosInstance.post("property/addHistoric", payload)
      if (response.status === 200) {
        enqueueSnackbar('Se actualizo el historial de la propiedad con exito!', {variant: 'success'});
        reload();
      }
    } catch (e) {
      enqueueSnackbar('No se pudo cambiar el estatus de la propiedad, ocurrio un error!', {variant: 'error'})
    }
  }



  return (
    <Dialog
      open={open}
      onClose={close}
      aria-labelledby="responsive-dialog-title"
    >
      <Box display='flex' justifyContent='flex-end' p={2}>
        <IconButton>
          <CloseIcon onClick={close}/>
        </IconButton>
      </Box>
      {data &&
        <>
          <DialogContent sx={{padding: '1rem 3rem'}}>
            <Typography variant='h5' sx={{ mb: 3 }} color='primary'>Cambio de estatus</Typography>
            <FormControl sx={{ width: largeScreen ? 300 : '100%' }} >
              <InputLabel id="demo-simple-select-label">Estatus</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={data.property_status}
                label="Estatus"
                onChange={(e) => middleWare(data.id, e.target.value)}
              >
                <MenuItem value='Incompleto'>Incompleto</MenuItem>
                <MenuItem value='Reservado'>Reservado</MenuItem>
                <MenuItem value='Suspendido'>Suspendido</MenuItem>
                <MenuItem value='Cerrado por Vision'>Cerrado por Vision</MenuItem>
                <MenuItem value='Cerrado por Externo'>Cerrado por Externo</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button variant='contained' fullWidth onClick={close}>
              Cerrar
            </Button>
          </DialogActions>
        </>
      }
    </Dialog>
  )
}
