import React from 'react';
import {Box, Container, Typography, Grid} from "@mui/material";
import {SERVICES_DATA} from "../../../utils/mock-data";

export function OurServices() {
  return (
    <Box sx={{
      backgroundImage: `url("/images/services-banner.jpg")`,
      height: 'auto',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      py: 5
    }}>
      {/*<Box component='img' src={banner} width='100%' height='auto'/>*/}
      <Box >
        <Typography sx={{ mt: 5 }} letterSpacing={3} align='center' variant='h4'  color='#ffff'>Porque no somos otra inmobiliaria mas, somos integrales.</Typography>
        <Typography sx={{ mb: 5 }} variant='h2' align='center' color='#ffff'>Nuestros servicios</Typography>
        <Container sx={{ mt: 8 }}>
          <Grid container spacing={2}  justifyContent='center'>
            {
              SERVICES_DATA.map(element => (
                <Grid item xs={12} md={3} key={element.title}>
                  <Box display='flex' justifyContent='center'>
                    <Box  component='img' src={element.img} />
                  </Box>
                  <Typography sx={{ mb: 4, mt: 2 }} align='center' variant='h4' color='#ffff'>{element.title}</Typography>
                </Grid>
              ))
            }
          </Grid>
        </Container>
      </Box>
    </Box>
  )
}
