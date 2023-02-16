import React from 'react';
import {Box, Container, Typography, useMediaQuery} from "@mui/material";
import {LIFESTYLE_BANNER_DATA} from "../../../utils/mock-data";
import CarouselCenterMode from "../carousel/CarouselCenterMode";

export function LifestyleBanner() {
  const largeScreen = useMediaQuery((theme: any) => theme.breakpoints.up('md'))

  return (
    <Box sx={{backgroundColor: '#f4f4f4'}} py={5}>
      {
        largeScreen  ? (
          <Container maxWidth='xl'>
            <Typography variant='h2' align='center'>Encuentra tu inmueble ideal</Typography>
            <Box display='flex' justifyContent='center' alignItems='center' gap={2} m={4}>
              <CarouselCenterMode
                data={LIFESTYLE_BANNER_DATA}
              />

            </Box>
          </Container>
        ) : (
          <Box>
            <Typography variant='h2' align='center'>Encuentra tu inmueble ideal</Typography>
            <Box display='flex' justifyContent='center' alignItems='center' gap={2} m={4}>
              <CarouselCenterMode
                data={LIFESTYLE_BANNER_DATA}
              />

            </Box>
          </Box>
        )
      }
    </Box>
  )
}
