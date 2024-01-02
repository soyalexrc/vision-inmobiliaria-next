import React from 'react';
import { Autocomplete, Box, Button, Divider, Drawer, Grid, IconButton, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import { mockCorredors, mockOperationType, mockRealStateType, mockStates } from '../../../../utils/mock-data';

interface PropertiesFiltersDrawerProps {
  open: boolean;
  closeAction: () => void;
  applyFilters: () => void;
  selectFilter: (param: string, value: string | null, type: string) => void;
  largeScreen: boolean;
  filters: any[];
}

export function CashFlowFilterDrawer({
  open,
  closeAction,
  applyFilters,
  largeScreen,
  filters,
  selectFilter,
}: PropertiesFiltersDrawerProps) {
  return (
    <Drawer anchor="right" open={open} onClose={closeAction}>
      <Box sx={{ width: largeScreen ? 600 : 365 }}>
        <Box p={2}>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Typography variant="h5">Filtros</Typography>
            <IconButton onClick={closeAction}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider sx={{ my: 2 }} />
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6">Busqueda por mes</Typography>
              <Autocomplete
                sx={{ mt: 1 }}
                fullWidth
                disablePortal
                options={['ENERO', 'FEBRERO']}
                value={['ENERO', 'FEBRERO'].filter((element, index) => filters.length > 0 && filters[index]?.value === element)[0] ?? ''}
                getOptionLabel={(option) => option || ''}
                renderOption={(props, option) => (
                  <li key={option} {...props}>
                    {option}
                  </li>
                )}
                onChange={(e, newValue) => selectFilter('month', newValue, 'EQUAL')}
                renderInput={(params) => <TextField {...params} label="Busqueda por mes" />}
              />
            </Grid>
            <Grid item xs={12} md={6}></Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="h6">Tipo de inmueble</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6">Tipo de operacion</Typography>
            </Grid>
          </Grid>
        </Box>
        <Box
          sx={{
            position: largeScreen ? 'absolute' : 'relative',
            bottom: 0,
            left: 0,
            right: 0,
            mt: !largeScreen ? 5 : 0,
          }}
        >
          <Button fullWidth size="large" variant="contained" color="secondary" onClick={applyFilters}>
            Filtrar
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
}
