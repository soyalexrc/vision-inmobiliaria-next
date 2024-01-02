import { ClientLayout } from 'components/layouts';
import React from 'react';
import { Box, Container, Grid, Typography, Checkbox, TextField, useMediaQuery, Paper } from '@mui/material';
import { useRouter } from 'next/router';

const mainData = [
  {
    url: '',
    alt: '',
    image: '/images/new-construction-banner.jpg',
  },
];

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
          transform: 'translate(-50%, -50%)',
        }}
      >
        <Typography variant="h1" align="center" color="#fff" sx={{ letterSpacing: '3px' }}>
          Conoce nuestro servicios
        </Typography>
        <Typography variant="h6" align="center" color="#fff" sx={{ letterSpacing: '3px', mt: 2 }}>
          Es nuestro trabajo el proporcionarte el tipo de inmueble que más se ajuste a sus intereses
        </Typography>
      </Box>
    </Box>
  );
}

export default function ServicesPage() {
  const largeScreen = useMediaQuery((theme: any) => theme.breakpoints.up('md'));

  const router = useRouter();

  React.useEffect(() => {
    if (router.asPath) {
      const element: any = document.getElementById(router.asPath.split('#')[1]);
      const yOffset = -100;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({ top: y, behavior: 'smooth' });
    } else {
      window.scrollTo(0, 0);
    }
  }, [router]);

  return (
    <ClientLayout title="Vision Inmobiliaria - Servicios">
      <>
        <BannerComponent item={mainData[0]} />
        <Container>
          <Grid container columnSpacing={5} rowSpacing={2} sx={{ my: 3 }} direction={largeScreen ? 'row' : 'column-reverse'}>
            <Grid item xs={12} md={3}>
              <Box sx={{ mb: 3 }}>
                <Typography align="center" variant="h3">
                  Contacto directo
                </Typography>
                <Typography align="center" variant="h6">
                  {' '}
                  949 994 994
                </Typography>
                <Typography align="center">correo@correo.com</Typography>
              </Box>
              <Box>
                <Typography align="center" variant="h4">
                  Mas informacion
                </Typography>
                <Typography>Si deseas más información sobre esta propiedad, por favor, rellena el formulario.</Typography>
              </Box>
              <Box sx={{ my: 2 }}>
                <Typography sx={{ mb: 1 }}> Nombre y apellidos *</Typography>
                <TextField variant="outlined" size="small" fullWidth />
              </Box>
              <Box sx={{ my: 2 }}>
                <Typography sx={{ mb: 1 }}> Email *</Typography>
                <TextField variant="outlined" size="small" fullWidth />
              </Box>
              <Box sx={{ my: 2 }}>
                <Typography sx={{ mb: 1 }}> Telefono *</Typography>
                <TextField variant="outlined" size="small" fullWidth />
              </Box>
              <Box sx={{ my: 2 }}>
                <Typography sx={{ mb: 1 }}> Nombre y apellidos *</Typography>
                <TextField multiline minRows={10} variant="outlined" size="small" fullWidth />
              </Box>
              <Box display="flex" alignItems="center">
                <Checkbox size="small" />
                <Typography>
                  Si, he leido y acepto las
                  <Typography
                    variant="caption"
                    sx={{
                      '&:hover': {
                        textDecoration: 'underline',
                        cursor: 'pointer',
                        color: 'primary.main',
                      },
                    }}
                  >
                    {' '}
                    condiciones de uso
                  </Typography>
                  <Typography variant="caption"> y la</Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      '&:hover': {
                        textDecoration: 'underline',
                        cursor: 'pointer',
                        color: 'primary.main',
                      },
                    }}
                  >
                    {' '}
                    politica de privacidad
                  </Typography>
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={9}>
              {[
                { label: 'Servicios inmobiliarios', id: 'inmobiliario' },
                { label: 'Administración de inmuebles alquilados', id: 'administracion-de-inmuebles-alquilados' },
                { label: 'Trámites legales', id: 'tramites-legales' },
                { label: 'Gestión contable', id: 'gestion-contable' },
                { label: 'Ama de llaves (limpieza)', id: 'ama-de-llaves' },
                { label: 'Remodelación', id: 'remodelacion' },
                { label: 'Mantenimiento de inmuebles', id: 'mantenimiento-de-inmuebles' },
              ].map((element, index) => (
                <Paper
                  key={index + 100}
                  elevation={2}
                  sx={{ display: 'flex', my: 5, position: 'relative', flexDirection: largeScreen ? 'row' : 'column' }}
                  id={element.id}
                >
                  <Box
                    sx={{
                      position: 'absolute',
                      ...(largeScreen ? { bottom: 0 } : { top: 0 }),
                      left: 0,
                      backgroundColor: 'primary.main',
                      px: 2,
                    }}
                  >
                    <Typography variant="h3" color="#fff">
                      {index + 1}
                    </Typography>
                  </Box>
                  <Box component="img" src="/images/latestElements/latest-1.jpg" width={largeScreen ? 300 : '100%'} />
                  <Box p={2}>
                    <Typography variant="h3">{element.label}</Typography>
                    <Typography>
                      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard
                      dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type
                      specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining
                      essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
                      passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </Typography>
                  </Box>
                </Paper>
              ))}
            </Grid>
          </Grid>
        </Container>
      </>
    </ClientLayout>
  );
}
