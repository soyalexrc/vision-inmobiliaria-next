import { ClientLayout } from 'components/layouts';
import React from 'react';
import { Box, Typography } from '@mui/material';

const mainData = [
  {
    url: '',
    alt: '',
    image: '/images/about/aboutBanner.jpg',
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
          Lo que nuestros clientes dicen de nosotros
        </Typography>
      </Box>
    </Box>
  );
}

export default function CommentsPage() {
  return (
    <ClientLayout title="Vision Inmobiliaria - Acerca de vision - Comentarios">
      <>
        <BannerComponent item={mainData[0]} />
      </>
    </ClientLayout>
  );
}
