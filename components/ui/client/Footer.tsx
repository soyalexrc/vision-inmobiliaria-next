import React from 'react';
import {Box, Container, Link, Grid, Typography, useMediaQuery, Divider} from "@mui/material";
import NextLink from 'next/link'
import {MENU_ITEMS, SOCIAL_MEDIA_DATA} from "../../../utils/mock-data";
import {TikTokIcon} from "./index";




export function Footer() {
  const largeScreen = useMediaQuery((theme: any) => theme.breakpoints.up('md'))

  return (
    <footer>
      <Box sx={{backgroundColor: 'primary.light'}} p={1}>

      </Box>
      <Container sx={{p: 2}}>
        <Grid container columnSpacing={10}>
          <Grid item xs={12} md={6}>
            <Box component='img' src='/icons/vision-icon.png' width={100}/>
            <Typography variant='caption'>
              Grupo Induo, es una empresa de intermediación inmobiliaria y gestión de activos, compuesta por
              profesionales con más de veinte años de experiencia en el sector.
            </Typography>
            <br/>
            <Typography variant='caption'>
              Actualmente gestionamos el patrimonio inmobiliario de particulares, entidades financieras y fondos de
              inversión, ya sea residencial, comercial y terciario.
              También realizamos operaciones de Sale & Lease back.
            </Typography>
            <br/>

            <Typography variant='caption'>
              Disponemos de profesionales altamente cualificados para ofrecer a nuestros clientes seguridad y
              profesionalidad ante cualquier proyecto inmobiliario. Nuestro trabajo consiste en proporcionar a nuestros
              clientes el tipo de activo que más se ajuste a sus intereses.
            </Typography>
            <br/>
            <Typography variant='caption'>
              Ofrecemos nuestros servicios tanto a particulares, empresas y fondos de inversión, adecuando cada tipo de
              operación a las preferencias y capacidad de cada uno.
            </Typography>


          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant='h6' fontWeight='bold' sx={{...(!largeScreen && {mt: 3})}}>Menu</Typography>
            {MENU_ITEMS.map((element: any) => (
              <Box key={element.path} my={2}>
                <NextLink href={element.path}>
                  {element.label}
                </NextLink>
              </Box>
            ))}
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant='h6' fontWeight='bold'
                        sx={{mb: 2, ...(!largeScreen && {mt: 3})}}>Contáctanos</Typography>
            <Grid container rowSpacing={2}>
              <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Link href="https://www.tiktok.com/@somosvisioninmobiliaria" target="_blank">
                  <TikTokIcon color='#610321' sx={{width: 25, height: 25}}/>
                </Link>
              </Grid>
              {
                SOCIAL_MEDIA_DATA.map((element, index) => (
                  <Grid item xs={4} key={element.path + index} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Link href={element.path} target="_blank">
                      {element.icon}
                    </Link>
                  </Grid>
                ))
              }
            </Grid>
            {/*<Typography>*/}
            {/*  Av. Feo La Cruz, CC Paseo La Granja, Local Mezz-6, Nivel Mezzanina, Sector La Granja, Municipio Naguanagua, Estado Carabobo*/}
            {/*</Typography>*/}
            {/*<Typography fontWeight='bold' sx={{ mt: 2 }}>Tel: <Link href="tel:949228463" target='_blank'>949 22 84 63</Link></Typography>*/}
            {/*<Typography fontWeight='bold' sx={{ mt: 2 }}> <Link href="mailto:ventas@visioninmobiliaria.com.ve" target='_blank'>ventas@visioninmobiliaria.com.ve</Link></Typography>*/}
          </Grid>
        </Grid>
      </Container>
      <Box sx={{backgroundColor: 'primary.light'}}>
        <Container>
          <Box display='flex' alignItems='center' p={1}>
            <Typography color='primary' component={NextLink} href='/legal/aviso-legal'> Aviso Legal</Typography>
            <Divider sx={{mx: 2, borderWidth: '1px'}} orientation='vertical' flexItem/>
            <Typography color='primary' component={NextLink} href='/legal/proteccion-de-datos'>Protección de datos</Typography>
            <Divider sx={{mx: 2, borderWidth: '1px'}} orientation='vertical' flexItem/>
            <Typography color='primary' component={NextLink} href='/legal/cookies'>Cookies</Typography>
            <Divider sx={{mx: 2, borderWidth: '1px'}} orientation='vertical' flexItem/>
            <Typography color='primary' component={Link} href='https://google.com' target='_blank'>Creado por LSM Sinergy</Typography>
            <Divider sx={{mx: 2, borderWidth: '1px'}} orientation='vertical' flexItem/>
            <Typography color='primary' component={NextLink} href='/admin'> Ingresar</Typography>
          </Box>
        </Container>
      </Box>
    </footer>
  )
}
