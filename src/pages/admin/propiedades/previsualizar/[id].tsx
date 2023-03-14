import React from 'react';
import {Box, Button, Container, DialogActions, DialogContent, Paper, Divider, Grid, Typography} from "@mui/material";
import {axiosInstance} from "../../../../../utils";
import {useSnackbar} from "notistack";
import {useRouter} from "next/router";
import NextLink from "next/link";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

export default function PreviewPropertyPage() {
  const [propertyData, setPropertyData] = React.useState<any>({})
  const [loading, setLoading] = React.useState<boolean>(true)
  const {enqueueSnackbar} = useSnackbar()
  const router = useRouter()
  const id = router.query?.id;
  console.log(id)

  async function getPropertyById() {
    try {
      const response = await axiosInstance.get(`property/getById?id=${id}`);
      if (response.status === 200) {
        setPropertyData(response.data)
      }
    } catch (err) {
      enqueueSnackbar(`Error ${JSON.stringify(err)}`, {variant: 'error'})
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    const dataFromStorage = JSON.parse(sessionStorage.getItem('propertyToPrevisualize') ?? '')
    setTimeout(() => {
      setPropertyData(dataFromStorage)
      console.log(dataFromStorage)
      setLoading(false)
    }, 2000)
  }, [])

  return (
      <Container maxWidth='xl' sx={{ p: 2 }}>
        <Paper elevation={5} sx={{ m: 5, p: 5 }}>
          {
            propertyData && !loading &&
            <>
              <Typography
                variant='h1'
                color='primary'
              >
                {propertyData?.property?.propertyType || 'No Data'} {propertyData?.property?.operationType || 'No Data'}
              </Typography>

              <Box my={4} display='flex' flexWrap='wrap' justifyContent='center'>
                {
                  propertyData?.images?.length < 1 &&
                  <Typography>No hay imagenes disponibles...</Typography>
                }
                {
                  propertyData?.images?.length > 0 && propertyData?.images?.map((image: any, index: number) => (
                    // <Box m={2} width={200} height={200} border='1px solid lightgray'/>
                    <Box
                      key={index + 1}
                      component='img'
                      sx={{maxHeight: 200, maxWidth: 200, width: '100%', height: '100%'}}
                      src={`http://100.42.69.119:3000/images/${image.imageData}`}
                    />
                  ))
                }
              </Box>
              <Divider sx={{my: 2, borderWidth: '2px'}}/>
              <Box display='flex' justifyContent='space-between' flexWrap='wrap'>
                <Box>
                  <Typography variant='h5' color='secondary'>Descripcion</Typography>
                  <Typography>{propertyData?.property?.description}</Typography>
                </Box>
                <Box>
                  <Typography variant='h5' color='secondary'>Precio</Typography>
                  <Typography>$ {propertyData?.clientData?.price}</Typography>
                </Box>
              </Box>
              <Box my={2}>
                <Typography
                  variant='caption'
                >
                  El precio de este inmueble y sus modificaciones son establecidas por su propietario.
                </Typography>
              </Box>
              <Divider sx={{my: 2, borderWidth: '2px'}}/>
              <Box>
                <Typography sx={{mb: 3}} variant='h5' color='secondary'>Datos generales</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={3}>
                    <Typography fontWeight='bold'>Tipo de mercado</Typography>
                    <Typography>{propertyData?.property?.propertyCondition}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Typography fontWeight='bold'>m² de terreno</Typography>
                    <Typography>{propertyData?.property?.footageGround}</Typography>
                  </Grid>
                  {
                    propertyData?.property?.footageBuilding &&
                    <Grid item xs={12} sm={6} md={3}>
                      <Typography fontWeight='bold'>m² de construccion</Typography>
                      <Typography>{propertyData?.property?.footageBuilding}</Typography>
                    </Grid>
                  }
                  <Grid item xs={12} sm={6} md={3}>
                    <Typography fontWeight='bold'>Estacionamientos</Typography>
                    <Typography>{propertyData?.location?.parkingNumber}</Typography>
                  </Grid>
                </Grid>
              </Box>
              <Divider sx={{my: 2, borderWidth: '2px'}}/>
              <Box>
                <Typography sx={{mb: 3}} variant='h5' color='secondary'>Ubicacion</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={3}>
                    <Typography fontWeight='bold'>Pais</Typography>
                    <Typography>{propertyData?.location?.country}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Typography fontWeight='bold'>Estado</Typography>
                    <Typography>{propertyData?.location?.state}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Typography fontWeight='bold'>Municipio</Typography>
                    <Typography>{propertyData?.location?.city}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Typography fontWeight='bold'>Urbanizacion</Typography>
                    <Typography>{propertyData?.location?.municipality}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Typography fontWeight='bold'>Punto de referencia</Typography>
                    <Typography>{propertyData?.location?.referencePoint}</Typography>
                  </Grid>
                </Grid>
              </Box>
              <Divider sx={{my: 2, borderWidth: '2px'}}/>
              <Box>
                <Typography sx={{mb: 3}} variant='h5' color='secondary'>Caracteristicas generales</Typography>
                <Grid container spacing={2}>
                  {
                    propertyData.attributes?.filter((x: any) => x.category === 'General').length > 0 && propertyData?.attributes?.filter((x: any) => x.category === 'General').map((item: any, index: number) => (
                      <Grid key={index + 1} item xs={12} sm={6} md={3}>
                        <Typography fontWeight='bold'>{item.label}</Typography>
                        <Typography>{item.value}</Typography>
                      </Grid>
                    ))
                  }
                </Grid>
                <Divider sx={{my: 2, borderWidth: '2px'}}/>
                <Typography sx={{mb: 3}} variant='h5' color='secondary'>Caracteristicas de la residencia</Typography>
                <Grid container spacing={2}>
                  {
                    propertyData.attributes
                      .filter((x: any) => x.category === 'Property').length > 0 && propertyData?.attributes?.filter((x: any) => x.category === 'Property').map((item: any, index: number) => (
                      <Grid key={index + 1} item xs={12} sm={6} md={3}>
                        <Typography fontWeight='bold'>{item.label}</Typography>
                        <Typography>{item.value}</Typography>
                      </Grid>
                    ))
                  }
                </Grid>
                <Divider sx={{my: 2, borderWidth: '2px'}}/>
                <Typography
                  sx={{mb: 3}}
                  variant='h5'
                  color='secondary'
                >
                  Lo que incluye la negociación del inmueble
                </Typography>
                <Grid container spacing={2}>
                  {
                    propertyData.attributes?.filter((x: any) => x.category === 'Furniture').length > 0 && propertyData.attributes?.filter((x: any) => x.category === 'Furniture').map((item: any, index: number) => (
                      <Grid key={index + 1} item xs={12} sm={6} md={3}>
                        <Typography fontWeight='bold'>{item.label}</Typography>
                        <Typography>{item.value}</Typography>
                      </Grid>
                    ))
                  }
                </Grid>
                <Divider sx={{my: 2, borderWidth: '2px'}}/>
                <Typography sx={{mb: 3}} variant='h5' color='secondary'>Otras caracteristicas</Typography>
                <Grid container spacing={2}>
                  {
                    propertyData.attributes
                      .filter((x: any) => x.category === 'Custom').length > 0 && propertyData.attributes?.filter((x: any) => x.category === 'Custom').map((item: any, index: number) => (
                      <Grid key={index + 1} item xs={12} sm={6} md={3}>
                        <Typography fontWeight='bold'>{item.label}</Typography>
                        <Typography>{item.value}</Typography>
                      </Grid>
                    ))
                  }
                </Grid>
              </Box>
            </>
          }
          {loading && <p>cargando...</p>}
        </Paper>
      </Container>
  )
}
