import React from 'react';
import {ClientLayout} from 'components/layouts';
import mainBanner1 from "@/assets/images/banners/mainbanner-1.jpg";
import {
  Box,
  Container,
  Grid,
  Typography,
  useMediaQuery,
  TextField,
  Autocomplete, Button, Checkbox
} from "@mui/material";

const mainData = [
  {
    url: '',
    alt: '',
    image: '/images/banners/mainbanner-1.jpg'
  }
]

const options = [
  {label: 'option 1'}
]

function BannerComponent({item}: any) {

  return (
    <Box
      sx={{
        position: 'relative',
      }}
    >
      <Box
        // onClick={() => goTo(item.url)}
        component='img'
        alt={item.alt}
        width='100%'
        height='100%'
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
          transform: 'translate(-50%, -50%)'
        }}
      >
        <Typography variant='h1' color='#fff' sx={{ letterSpacing: '3px' }}>Contáctanos y te ayudaremos</Typography>
      </Box>
    </Box>

  )
}
export default function ContactPage() {
  const largeScreen = useMediaQuery((theme: any) => theme.breakpoints.up('md'))

  return (
    <ClientLayout title='Vision Inmobiliaria - Contacto'>
      <>
        <BannerComponent item={mainData[0]}/>
        <Typography variant='h2' align='center' sx={{my: 3}}>Contáctanos</Typography>

        <Container>
          <Grid container columnSpacing={3} sx={{my: 4}}>
            <Grid item xs={12} md={6} sx={{borderRight: largeScreen ? '1px solid lightgray' : 'transparent', px: 3}}>
              <Typography variant='h3'>Vision Inmobiliaria</Typography>
              <Typography>Calle Virgen del Amparo 22</Typography>
              <Typography>19003 – Guadalajara</Typography>
              <Typography variant='h4'>998 88 77 77 77 </Typography>

              <Box component='img' width='100%' src='/images/map.png'/>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant='h4' sx={{mb: 2}}>Mis Datos</Typography>
              <Box>
                <Typography sx={{mb: 1}}>Nombre *</Typography>
                <TextField size='small' fullWidth placeholder='Nombre'/>
              </Box>
              <Grid container spacing={2} sx={{mt: 1}}>
                <Grid item xs={6}>
                  <Box>
                    <Typography sx={{mb: 1}}>e-mail *</Typography>
                    <TextField size='small' fullWidth placeholder='e-mail'/>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box>
                    <Typography sx={{mb: 1}}>Teléfono *</Typography>
                    <TextField size='small' fullWidth placeholder='Teléfono'/>
                  </Box>
                </Grid>
              </Grid>
              <Typography variant='h4' sx={{my: 2}}>Estoy interesado en</Typography>
              <Grid container spacing={2} >
                <Grid item xs={6}>
                  <Box>
                    <Typography sx={{mb: 1}}>Tipo de inmueble</Typography>
                    <Autocomplete
                      size='small'
                      disablePortal
                      id="custom-combo-box"
                      options={options}
                      renderInput={(params) => <TextField {...params} placeholder="Elija un tipo"/>}
                    />
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box>
                    <Typography sx={{mb: 1}}>Tipo de operacion</Typography>
                    <Autocomplete
                      size='small'
                      disablePortal
                      id="custom-combo-box"
                      options={options}
                      renderInput={(params) => <TextField {...params} placeholder="Elija operacion"/>}
                    />
                  </Box>
                </Grid>
              </Grid>
              <Box mt={2}>
                <Typography sx={{mb: 1}}>Precio maximo *</Typography>
                <TextField size='small' fullWidth placeholder='Precio'/>
              </Box>
              <Grid container spacing={2} sx={{mt: 1}}>
                <Grid item xs={6}>
                  <Box>
                    <Typography sx={{mb: 1}}>Poblacion *</Typography>
                    <TextField size='small' fullWidth placeholder='Poblacion'/>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box>
                    <Typography sx={{mb: 1}}>Zona *</Typography>
                    <TextField size='small' fullWidth placeholder='Zona'/>
                  </Box>
                </Grid>
              </Grid>
              <Box sx={{my: 2}}>
                <Typography sx={{mb: 1}}>Mensaje *</Typography>
                <TextField
                  fullWidth
                  multiline
                  minRows={5}
                />
              </Box>
              <Box display='flex' alignItems='center'>
                <Checkbox size='small'/>
                <Typography>
                  He leido y acepto las
                  <Typography
                    variant='caption'
                    sx={{
                      "&:hover" : {
                        textDecoration: 'underline',
                        cursor: 'pointer',
                        color: 'primary.main'
                      }
                    }}
                  > condiciones legales y de politica de privacidad</Typography>
                </Typography>
              </Box>
              <Button variant='contained' size='small' fullWidth>Enviar</Button>
            </Grid>
          </Grid>
        </Container>
      </>
    </ClientLayout>
  )
}
