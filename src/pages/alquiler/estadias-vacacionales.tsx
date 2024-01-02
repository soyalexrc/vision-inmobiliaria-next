import { ClientLayout } from 'components/layouts';
import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  useMediaQuery,
  Autocomplete,
  Button,
  IconButton,
  Pagination,
  Divider,
} from '@mui/material';

import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AppsIcon from '@mui/icons-material/Apps';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { ContactBanner, FiltersDrawer, LifestyleBanner } from '../../../components/ui/client';
import { LATEST_ELEMENTS_DATA } from '../../../utils/mock-data';

const mainData = [
  {
    url: '',
    alt: '',
    image: '/images/rent/rent-banner.jpg',
  },
];

const sampleOptions = [{ title: 'option 1' }, { title: 'option 2' }, { title: 'option 3' }, { title: 'option 4' }, { title: 'option 5' }];

const housingType = [
  { label: 'Aticos' },
  { label: 'Duplex' },
  { label: 'Pisos' },
  { label: 'Adosados' },
  { label: 'Casas' },
  { label: 'Chalets independientes' },
  { label: 'Pareados' },
  { label: 'Locales comerciales' },
  { label: 'Garajes' },
  { label: 'Naves industriales' },
  { label: 'Parcelas' },
];

const numberOfRooms = [{ label: 'De 1 a 2' }, { label: 'De 3 a 5' }, { label: 'Mas de 5' }];

const numberOfBaths = [{ label: 'De 1 a 2' }, { label: 'De 3 a 5' }, { label: 'Mas de 5' }];

const numberOfGarages = [{ label: '1' }, { label: '2 o mas' }];

function CustomField({ options, title, value, onChange, disabled = false, sx }: any) {
  return (
    <>
      <Typography variant="h6" sx={{ mb: 2 }}>
        {title}
      </Typography>
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
    </>
  );
}

function BannerComponent({ item }: any) {
  return (
    <Box
      sx={{
        position: 'relative',
      }}
    >
      <Box
        // onClick={() => goTo(item.url)}
        component="img"
        alt={item.alt}
        width="100%"
        height="100%"
        sx={{
          width: '100%',
          height: '350px',
          objectFit: 'cover',
          marginBottom: '-6px',
          filter: 'blur(1.82px) brightness(0.61)',
        }}
        src={item.image}
      />
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '100%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <Typography variant="h1" align="center" color="#fff" sx={{ letterSpacing: '3px' }}>
          Alquila con nosotros
        </Typography>
        <Typography variant="h6" align="center" color="#fff" sx={{ letterSpacing: '3px', mt: 2 }}>
          Consulta nuestra amplia oferta de inmuebles en alquiler y encuentra el que mejor se adapte a tus necesidades
        </Typography>
      </Box>
    </Box>
  );
}

function ProductComponent({ product, view }: any) {
  if (view === 'grid') {
    return (
      <Box
        sx={{
          height: 'auto',
          '&:hover': {
            '& h6': {
              textDecoration: 'underline',
              cursor: 'pointer',
            },
          },
        }}
      >
        <Box component="img" src={product.img} width="100%" sx={{ objectFit: 'cover', minHeight: '280px' }} />
        <Box
          sx={{
            backgroundColor: '#f6f6f6',
            p: 2,
            minHeight: '146px',
          }}
        >
          <Typography variant="h6" sx={{ mb: 2 }} align="center">
            {product.title}
          </Typography>
          <Box>
            <Box display="flex" alignItems="center" justifyContent="center" mt={3}>
              <Typography>{product.meters} m2</Typography>
              <Divider sx={{ mx: 2, borderWidth: '1px' }} orientation="vertical" flexItem />
              <Typography>{product.rooms} Habitaciones</Typography>
              <Divider sx={{ mx: 2, borderWidth: '1px' }} orientation="vertical" flexItem />
              <Typography>{product.bathrooms} Banos</Typography>
            </Box>

            {/*<Typography color='primary' variant='h3' align='center'>{product.price} €</Typography>*/}
          </Box>
        </Box>
      </Box>
    );
  }

  if (view === 'list') {
    return (
      <Box display="flex">
        <Box component="img" src={product.img} width="300px" sx={{ objectFit: 'cover', minHeight: '214px' }} />
        <Box
          sx={{
            backgroundColor: '#f6f6f6',
            p: 2,
            width: '100%',
          }}
        >
          <Typography variant="h6" sx={{ mb: 2 }} align="center">
            {product.title}
          </Typography>
          <Box>
            <Box display="flex" alignItems="center" justifyContent="center" mt={3}>
              <Typography>{product.meters} m2</Typography>
              <Divider sx={{ mx: 2, borderWidth: '1px' }} orientation="vertical" flexItem />
              <Typography>{product.rooms} Habitaciones</Typography>
              <Divider sx={{ mx: 2, borderWidth: '1px' }} orientation="vertical" flexItem />
              <Typography>{product.bathrooms} Banos</Typography>
            </Box>

            <Typography color="primary" variant="h3" align="center">
              {product.price} €
            </Typography>
            <Typography sx={{ px: 3 }} fontSize="13px">
              {product.fullDescription}
            </Typography>
          </Box>
        </Box>
      </Box>
    );
  }

  return <></>;
}

export default function VacationStaysPage() {
  const largeScreen = useMediaQuery((theme: any) => theme.breakpoints.up('md'));
  const [viewType, setViewType] = React.useState('grid');
  const [filtersDrawerOpen, setFiltersDrawerOpen] = React.useState(false);

  const [filters, setFilters] = React.useState({
    operation: { label: 'Alquilar' },
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

  return (
    <ClientLayout title="Vision Inmobiliaria - Alquiler de inmuebles - Estadias Vacacionales">
      <>
        <BannerComponent item={mainData[0]} />
        <Container>
          <Grid container columnSpacing={5} rowSpacing={2} sx={{ my: 3 }}>
            {largeScreen && (
              <Grid item xs={12} md={4}>
                <Button size="small">
                  <ArrowLeftIcon />
                  Volver
                </Button>
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

                <Button size="small" fullWidth variant="contained">
                  Buscar
                </Button>
              </Grid>
            )}
            <Grid item container spacing={2} xs={12} md={8}>
              <Grid item xs={12}>
                <Typography align={'center'} variant="h3">
                  14 Inmuebles en alquiler
                </Typography>
              </Grid>
              <Grid item xs={largeScreen ? 6 : 12} sx={{ display: 'flex', alignItems: 'center' }}>
                <Box mr={2}>Ordenar por</Box>
                <CustomField options={housingType} sx={{ width: '200px' }} />
              </Grid>

              {!largeScreen && (
                <Grid item xs={12}>
                  <Button fullWidth size="small" variant="contained" onClick={() => setFiltersDrawerOpen(true)}>
                    Filtros
                  </Button>
                </Grid>
              )}

              {largeScreen && (
                <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Box display="flex">
                    <IconButton onClick={() => setViewType('grid')}>
                      <AppsIcon color={viewType === 'grid' ? 'primary' : 'action'} />
                    </IconButton>
                    <IconButton onClick={() => setViewType('list')}>
                      <FormatListBulletedIcon color={viewType === 'list' ? 'primary' : 'action'} />
                    </IconButton>
                    <IconButton onClick={() => setViewType('map')}>
                      <LocationOnIcon color={viewType === 'map' ? 'primary' : 'action'} />
                    </IconButton>
                  </Box>
                </Grid>
              )}
              {viewType !== 'map' &&
                LATEST_ELEMENTS_DATA.map((element: any, index) => (
                  <Grid item xs={12} key={index + 10} sm={viewType === 'grid' ? 6 : 12}>
                    <ProductComponent product={element} view={viewType} />
                  </Grid>
                ))}
              {viewType === 'map' && (
                <Box mt={6} component="img" width="100%" src="/images/map.png" height="750px" sx={{ objectFit: 'cover' }} />
              )}
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: largeScreen ? 'flex-end' : 'center' }}>
                <Pagination sx={{ my: 5 }} count={10} variant="outlined" shape="rounded" />
              </Grid>
            </Grid>
          </Grid>
        </Container>
        <LifestyleBanner />
        <ContactBanner />
        <FiltersDrawer handleDrawerChange={() => setFiltersDrawerOpen(!filtersDrawerOpen)} open={filtersDrawerOpen} />
      </>
    </ClientLayout>
  );
}
