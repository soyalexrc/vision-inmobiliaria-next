import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import { ADVISERS_DATA, AdviserPreview as Adviser } from '../../../utils/mock-data';
import NextLink from 'next/link';

export function Advisers() {
  return (
    <Box sx={{ py: 5, backgroundColor: '#f4f4f4' }}>
      <Typography align="center" variant="h2">
        Nuestros Asesores Integrales
      </Typography>
      <Typography align="center" variant="h5">
        Siempre a tu disposición
      </Typography>

      <Container sx={{ mt: 5 }}>
        <Grid container spacing={2}>
          {ADVISERS_DATA.map((element: Adviser) => (
            <Grid
              sx={{
                textDecoration: 'none',
              }}
              component={NextLink}
              href="blog"
              key={element.id}
              item
              xs={12}
              md={4}
            >
              <Box
                sx={{
                  cursor: 'pointer',
                  '&:hover': {
                    '& > h6': {
                      textDecoration: 'underline',
                    },
                  },
                }}
              >
                <Box component="img" width="100%" height="400px" sx={{ objectFit: 'cover' }} src={element.img} />
                {/*<Typography variant='h6' sx={{mt: 3}}>{element.title}</Typography>*/}
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
