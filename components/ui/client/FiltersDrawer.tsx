import React from 'react';
import { constants } from '../../../utils';
import { Box, Divider, Drawer, IconButton, Typography, Grid, Button, TextField, Autocomplete } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';

const DrawerHeader = styled('div')(({ _ }: any) => ({
  display: 'flex',
  alignItems: 'center',
  // necessary for content to be below app bar
  // ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

interface FilterDrawerProps {
  handleDrawerChange: () => void;
  open: boolean;
}

const sampleOptions = [
  { title: 'Con piscina' },
  { title: 'Con pozo de agua' },
  { title: 'Con planta eléctrica' },
  { title: 'Inmueble piso bajo' },
  { title: 'Inmueble piso intermedio' },
  { title: 'Inmueble piso alto' },
  { title: 'Amoblado' },
  { title: 'Sin amoblar' },
];

const numberOfRooms = [{ label: 'De 1 a 2' }, { label: 'De 3 a 5' }, { label: 'Mas de 5' }];

const numberOfBaths = [{ label: 'De 1 a 2' }, { label: 'De 3 a 5' }, { label: 'Mas de 5' }];

const numberOfGarages = [{ label: '1' }, { label: '2 o mas' }];

function CustomField({ options, title, value, onChange, disabled = false, sx }: any) {
  return (
    <Box sx={sx}>
      {title && (
        <Typography variant="h6" sx={{ mb: 1 }}>
          {title}
        </Typography>
      )}
      <Autocomplete
        sx={sx}
        size="small"
        disablePortal
        value={value}
        onChange={onChange}
        options={options}
        disabled={disabled}
        getOptionLabel={(option) => option.label || ''}
        isOptionEqualToValue={(option, value) => option.label === value.label}
        renderOption={(props, option) => (
          <li key={option.id} {...props}>
            {option.label}
          </li>
        )}
        renderInput={(params) => <TextField {...params} label="Seleccionar" />}
      />
    </Box>
  );
}

export function FiltersDrawer({ open, handleDrawerChange }: FilterDrawerProps) {
  const [filters, setFilters] = React.useState({
    operation: { label: 'Comprar' },
    typeOfAsset: { label: '' },
    state: { label: '' },
    zone: { label: '' },
    priceFrom: '',
    priceTo: '',
    reference: '',
    moreOptions: [],
  });

  function handleChange(key: any, value: any) {
    setFilters((prevState) => ({
      ...prevState,
      [key]: value,
    }));

    if (key === 'operation' && value.label && value.label === 'Traspaso fondo de comercio') {
      setFilters((prevState) => ({
        ...prevState,
        typeOfAsset: { label: 'Local' },
      }));
    }
    if (key === 'state') {
      setFilters((prevState) => ({
        ...prevState,
        zone: { label: '' },
      }));
    }
  }

  function getZonesByState() {
    if (filters.state?.label === 'Carabobo') {
      return [
        { label: 'Valencia' },
        { label: 'Naguangua' },
        { label: 'San Diego' },
        { label: 'Guacara' },
        { label: 'Los Guayos' },
        { label: 'El Libertador' },
      ];
    } else if (filters.state?.label === 'Cojedes') {
      return [{ label: 'San Carlos' }];
    } else if (filters.state?.label === 'Falcón') {
      return [{ label: 'José Laurencio Silva ' }];
    } else {
      return [{ label: '' }];
    }
  }

  const handleFilter = () => {
    handleDrawerChange();
  };

  return (
    <Drawer
      variant="temporary"
      ModalProps={{ keepMounted: true }}
      onClose={handleDrawerChange}
      anchor="right"
      open={open}
      sx={{
        width: constants.DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: constants.DRAWER_WIDTH,
          boxSizing: 'border-box',
        },
      }}
    >
      <DrawerHeader sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.5rem 2rem' }}>
        <Typography variant="h4">Filtros de busqueda</Typography>
        <IconButton onClick={handleDrawerChange}>
          <CloseIcon />
        </IconButton>
      </DrawerHeader>
      <Divider />
      <Grid container>
        <Grid item xs={12} md={4} sx={{ p: 3 }}>
          <CustomField
            options={[{ label: '' }, { label: 'Carabobo' }, { label: 'Cojedes' }, { label: 'Falcón' }]}
            title="Estado"
            value={filters.state}
            sx={{ mb: 2 }}
            onChange={(_: any, newValue: any) => handleChange('state', newValue)}
          />
          <CustomField
            options={getZonesByState()}
            title="Municipio"
            sx={{ mb: 2 }}
            value={filters.zone}
            onChange={(_: any, newValue: any) => handleChange('zone', newValue)}
          />

          <Box mb={3}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Precio
            </Typography>
            <Box display="flex" alignItems="center">
              <TextField
                size="small"
                fullWidth
                label="Desde"
                variant="outlined"
                value={filters.priceFrom}
                onChange={(event) => handleChange('priceFrom', event.target.value)}
              />
              <Box mx={2}>-</Box>
              <TextField
                size="small"
                fullWidth
                label="Hasta"
                variant="outlined"
                value={filters.priceTo}
                onChange={(event) => handleChange('priceTo', event.target.value)}
              />
            </Box>
          </Box>

          <CustomField
            options={[
              { label: '' },
              { label: 'Casas' },
              { label: 'Townhouses' },
              { label: 'Apartamentos' },
              { label: 'Locales' },
              { label: 'Oficinas' },
              { label: 'Galpónes' },
              { label: 'Terrenos' },
              { label: 'Fincas' },
            ]}
            sx={{ mb: 2 }}
            title="Inmueble"
            value={filters.typeOfAsset}
            disabled={filters.operation?.label === 'Traspaso fondo de comercio'}
            onChange={(_: any, newValue: any) => handleChange('typeOfAsset', newValue)}
          />
          <CustomField title="Numero de dormitorios" options={numberOfRooms} sx={{ mb: 3 }} />
          <CustomField title="Numero de banos" options={numberOfBaths} sx={{ mb: 3 }} />
          <CustomField title="Numero de garajes" options={numberOfGarages} sx={{ mb: 3 }} />

          <Box mb={3}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Mas opciones
            </Typography>
            <Autocomplete
              size="small"
              multiple
              options={sampleOptions}
              getOptionLabel={(option: any) => option.title}
              renderInput={(params) => <TextField {...params} variant="outlined" placeholder="Seleccionar" />}
            />
          </Box>

          <Box mb={3}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Buscar por Codigo
            </Typography>
            <TextField
              value={filters.reference}
              onChange={(event) => handleChange('reference', event.target.value)}
              fullWidth
              size="small"
              label="Palabra clave / Codigo"
              variant="outlined"
            />
          </Box>

          <Button size="small" fullWidth variant="contained" onClick={handleFilter}>
            Buscar
          </Button>
        </Grid>
      </Grid>
    </Drawer>
  );
}
