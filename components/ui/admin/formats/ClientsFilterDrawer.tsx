import React from 'react';
import {Autocomplete, Box, Button, Divider, Drawer, Grid, IconButton, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import {mockCorredors, mockOperationType, mockRealStateType, mockStates} from "../../../../utils/mock-data";

interface PropertiesFiltersDrawerProps {
  open: boolean;
  closeAction: () => void;
  applyFilters: () => void;
  largeScreen: boolean;

  selectFilter: (code: string, newValue: any) => void;
  filters: any
}

export function ClientsFilterDrawer (
  { open, closeAction, applyFilters, largeScreen, selectFilter, filters }: PropertiesFiltersDrawerProps) {
  return (
    <Drawer
      anchor='right'
      open={open}
      onClose={closeAction}
    >
      <Box sx={{width: largeScreen ? 600 : 365}}>
        <Box p={2}>
          <Box display='flex' alignItems='center' justifyContent='space-between'>
            <Typography variant='h5'>
              Filtros
            </Typography>
            <IconButton onClick={closeAction}>
              <CloseIcon/>
            </IconButton>
          </Box>
          <Divider sx={{ my: 2 }}/>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12}>
              <Typography variant='h6' color='primary'>General</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant='h6'>Busqueda por corredor</Typography>
              <Autocomplete
                sx={{ mt: 1}}
                fullWidth
                disablePortal
                id="combo-box-demo"
                options={mockCorredors}
                value={mockCorredors.filter(element => filters.includes(element))[0] ?? {}}
                getOptionLabel={(option) => option.name || ''}
                renderOption={(props, option) => (
                  <li key={option.name} {...props}>{option.name}</li>
                )}
                onChange={(e, newValue) => selectFilter('code', newValue)}
                renderInput={(params) =>
                  <TextField
                    {...params}
                    label="Busqueda por corredor"
                  />
                }
              />
            </Grid>
            <Grid item xs={12} md={6}></Grid>

            <Grid item xs={12} md={6} >
              <Typography variant='h6'>Tipo de inmueble</Typography>
              <Autocomplete
                sx={{ mt: 1}}
                fullWidth
                disablePortal
                id="combo-box-demo"
                options={mockRealStateType}
                value={mockRealStateType.filter(element => filters.includes(element))[0] ?? {}}
                getOptionLabel={(option) => option.name || ''}
                renderOption={(props, option) => (
                  <li key={option.name} {...props}>{option.name}</li>
                )}
                onChange={(e, newValue) => selectFilter('property_type', newValue)}
                renderInput={(params) =>
                  <TextField
                    {...params}
                    label="Tipo de inmueble"
                  />
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant='h6'>Tipo de operacion</Typography>
              <Autocomplete
                sx={{ mt: 1}}
                fullWidth
                disablePortal
                id="combo-box-demo"
                options={mockOperationType}
                value={mockOperationType.filter(element => filters.includes(element))[0] ?? {}}
                getOptionLabel={(option) => option.name || ''}
                renderOption={(props, option) => (
                  <li key={option.name} {...props}>{option.name}</li>
                )}
                onChange={(e, newValue) => selectFilter('operation_type', newValue)}
                renderInput={(params) =>
                  <TextField
                    {...params}
                    label="Tipo de operacion"
                  />
                }
              />
            </Grid>
            <Grid item xs={12}><Divider sx={{ my: 2 }} /></Grid>
            <Grid item xs={12}>
              <Typography variant='h6' color='primary'>Ubicacion</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant='h6'>Estado</Typography>
              <Autocomplete
                sx={{ mt: 1}}
                fullWidth
                disablePortal
                id="combo-box-demo"
                options={mockStates}
                value={mockStates.filter(element => filters.includes(element))[0] ?? {}}
                getOptionLabel={(option) => option.name || ''}
                renderOption={(props, option) => (
                  <li key={option.name} {...props}>{option.name}</li>
                )}
                onChange={(e, newValue) => selectFilter('state', newValue)}
                renderInput={(params) =>
                  <TextField
                    {...params}
                    label="Estado"
                  />
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant='h6'>Municipio</Typography>
              <Autocomplete
                sx={{ mt: 1}}
                fullWidth
                disabled
                disablePortal
                id="combo-box-demo"
                options={[{title: 'Municipio 1'}, {title: 'Municipio 2'}]}
                getOptionLabel={(option) => option.title || ''}
                renderOption={(props, option: any) => (
                  <li key={option._id} {...props}>{option.title}</li>
                )}
                onChange={(e, newValue) => selectFilter('', newValue)}
                renderInput={(params) =>
                  <TextField
                    {...params}
                    label="Municipio"
                  />
                }
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant='h6'>Urbanizacion</Typography>
              <Autocomplete
                sx={{ mt: 1}}
                fullWidth
                disabled
                disablePortal
                id="combo-box-demo"
                options={[{title: 'urbanizacion 1'}, {title: 'urbanizacion 2'}]}
                getOptionLabel={(option) => option.title || ''}
                renderOption={(props, option: any) => (
                  <li key={option._id} {...props}>{option.title}</li>
                )}
                onChange={(e, newValue) => selectFilter('', newValue)}
                renderInput={(params) =>
                  <TextField
                    {...params}
                    label="Urbanizacion"
                  />
                }
              />
            </Grid>


            <Grid item xs={12} md={6}>
              <Typography variant='h6'>Residencia</Typography>
              <Autocomplete
                sx={{ mt: 1}}
                fullWidth
                disabled
                disablePortal
                id="combo-box-demo"
                options={[{title: 'Residencia 1'}, {title: 'Residencia 2'}]}
                getOptionLabel={(option) => option.title || ''}
                renderOption={(props, option: any) => (
                  <li key={option._id} {...props}>{option.title}</li>
                )}
                onChange={(e, newValue) => selectFilter('', newValue)}
                renderInput={(params) =>
                  <TextField
                    {...params}
                    label="Residencia"
                  />
                }
              />
            </Grid>
          </Grid>
        </Box>
        <Box sx={{position: largeScreen ?  'absolute' : 'relative', bottom: 0, left: 0, right: 0, mt: !largeScreen ? 5 : 0}}>
          <Button fullWidth size='large' variant='contained' color='secondary'
                  onClick={applyFilters}>
            Filtrar
          </Button>
        </Box>
      </Box>
    </Drawer>
  )
}
