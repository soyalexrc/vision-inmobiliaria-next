import React from 'react';
import {Box, Button, Typography} from "@mui/material";
import {useRouter} from "next/router";

export function ContactBanner() {
  const router = useRouter()
  return (
    <Box sx={{
      backgroundImage: `url("/images/contact-banner.jpg")`,
      height: 'auto',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      minHeight: 400,
      py: 5,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>


      <Box display='flex' height='100%' flexDirection='column' alignItems='center' justifyContent='center'>
        <Typography align='center' variant='h2' color='#ffffff'>
          Te asesoramos para conseguir el inmueble <br/>
          que estas buscando, de forma transparente y segura.
        </Typography>
        <Button variant='contained' onClick={() => router.push('/contacto')} sx={{mt: 3}}>Contáctanos </Button>
      </Box>
    </Box>
  )
}
