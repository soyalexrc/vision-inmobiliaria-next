import { ClientLayout } from 'components/layouts';
import React from 'react';

import { Box, Container, Grid, Typography, Button, Divider } from '@mui/material';
import { useRouter } from 'next/router';

const mainData = [
  {
    url: '',
    alt: '',
    image: '/images/about/aboutBanner.jpg',
  },
];

const offices = ['', '', '', '', '', ''];

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
        <Typography variant="h1" color="#fff" sx={{ letterSpacing: '3px' }}>
          Comienza una nueva ilusion
        </Typography>
      </Box>
    </Box>
  );
}

export default function AboutUsPage() {
  const router = useRouter();

  React.useEffect(() => {
    if (router.asPath.split('#').length > 0) {
      const el: any = document.getElementById('equipo-de-trabajo');
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo(0, 0);
    }
  }, [router]);

  return (
    <ClientLayout title="Vision Inmobiliaria - Acerca de vision">
      <>
        <BannerComponent item={mainData[0]} />
        <Typography variant="h5" align="center" sx={{ my: 3, letterSpacing: '4px' }}>
          VISION INMMOBILIARIA
        </Typography>
        <Typography variant="h2" align="center" sx={{ my: 3 }}>
          Profesionales con más de veinte años de <br />
          experiencia
        </Typography>

        <Container>
          <Divider />
          <Grid container spacing={2} sx={{ my: 7 }}>
            <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Box component="img" width="100%" src="/images/about/about-image.jpg" />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography px={2} fontSize="17px">
                Grupo Induo, es una empresa de intermediación inmobiliaria y gestión de activos, compuesta por profesionales con más de
                veinte años de experiencia en el sector. Actualmente gestionamos el patrimonio inmobiliario de particulares, entidades
                financieras y fondos de inversión, ya sea residencial, comercial y terciario. También realizamos operaciones de Sale & Lease
                back. Disponemos de profesionales altamente cualificados para ofrecer a nuestros clientes seguridad y profesionalidad ante
                cualquier proyecto inmobiliario. Nuestro trabajo consiste en proporcionar a nuestros clientes el tipo de activo que más se
                ajuste a sus intereses. Ofrecemos nuestros servicios tanto a particulares, empresas y fondos de inversión, adecuando cada
                tipo de operación a las preferencias y capacidad de cada uno.
              </Typography>
            </Grid>
          </Grid>
        </Container>
        <Box
          sx={{
            position: 'relative',
          }}
        >
          <Box
            component="img"
            src="/images/about/about-image-2.jpg"
            width="100%"
            height="500px"
            sx={{
              filter: ' brightness(0.9)',
              objectFit: 'cover',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <Typography align="center" sx={{ mb: 3, letterSpacing: '3px' }} variant="h2">
              Tu hogar te espera aqui
            </Typography>
            <Typography>
              Únicamente al lugar donde vivimos, en el que sentimos seguridad y calma, podemos llamar hogar. En Induo sabemos que no siempre
              es fácil encontrar ese sueño en forma de casa, que tan importante es para cualquier persona. Por ello dedicamos todos nuestros
              esfuerzos en hacer realidad esta ilusión, un hogar hecho a tu medida.
            </Typography>
            <Box display="flex" justifyContent="center" mt={5}>
              <Button variant="contained">Contáctanos</Button>
            </Box>
          </Box>
        </Box>
        <Container sx={{ my: 2 }} id="equipo-de-trabajo">
          <Grid container spacing={2}>
            {offices.map((office: any, index: number) => (
              <Grid key={index + 200} item xs={12} sm={6} md={4}>
                <Box component="img" width="100%" src={`/images/about/office-${index + 1}.jpg`} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </>
    </ClientLayout>
  );
}
