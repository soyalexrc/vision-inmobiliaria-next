import {ClientLayout} from 'components/layouts';
import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  useMediaQuery,
  Checkbox,
  TextField,
  Autocomplete, Button, IconButton, Divider
} from "@mui/material";
import FilePresentIcon from '@mui/icons-material/FilePresent';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {useDropzone} from 'react-dropzone';

const mainData = [
  {
    url: '',
    alt: '',
    image: '/images/register-banner.jpg'
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
          transform: 'translate(-50%, -50%)',

        }}
      >
        <Typography variant='h1' align='center' color='#fff' sx={{letterSpacing: '3px'}}>¿Te gustaria formar parte de
          nuestro equipo?</Typography>
      </Box>
    </Box>

  )
}

export default function WorkWithUsPage() {
  const largeScreen = useMediaQuery((theme: any) => theme.breakpoints.up('md'))

  const [myFiles, setMyFiles] = React.useState<any>([])

  const handleDrop = React.useCallback((acceptedFiles: any) => {
    setMyFiles([...myFiles, ...acceptedFiles])
  }, [myFiles])

  const {getRootProps, getInputProps,} = useDropzone({
    onDrop: handleDrop
  });


  const removeFile = (file: any) => () => {
    const newFiles = [...myFiles]
    newFiles.splice(newFiles.indexOf(file), 1)
    setMyFiles(newFiles)
  }

  const removeAll = () => {
    setMyFiles([])
  }


  return (
    <ClientLayout title='Vision Inmobiliaria - Trabaja con nosotros'>
      <>
        <BannerComponent item={mainData[0]}/>
        <Typography variant='h2' align='center' sx={{my: 3}}>Trabaja con nosotros!</Typography>

        <Container>
          <Grid container columnSpacing={3} sx={{my: 4}}>
            <Grid item xs={12} md={6} sx={{borderRight: largeScreen ? '1px solid lightgray' : 'transparent', px: 3}}>

              <Typography fontSize='17px'>
                <b>Vision Inmobiliaria,</b> ofrece la posibilidad de poner tu inmueble en venta a través de nosotros de
                una forma fácil, sencilla y de forma gratuita.
                Introduce los datos en el apartado que ves abajo y nos pondremos en contacto contigo lo antes posible...
              </Typography>
              <Box component='img' width='100%' sx={{mb: 2, mt: 4}} src='/images/about/office-1.jpg'/>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant='h4' sx={{mb: 2}}>Datos personales</Typography>
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

              <Box>
                <Box {...getRootProps({className: 'dropzone'})} p={5} sx={{border: '2px dashed gray'}} my={3}>
                  <input {...getInputProps()} />
                  <Box display='flex' alignItems='center' justifyContent='center'>
                    <FilePresentIcon/>
                    <Typography align='center' fontWeight='bold' color='gray'>Agrega tu cv aqui</Typography>
                  </Box>
                </Box>

                {
                  myFiles.length > 0 && myFiles.map((file: any) => (
                    <Box key={file.path}>
                      <Box display='flex' alignItems='center' justifyContent='space-between'>
                        <Box  display='flex' alignItems='center'>
                          <InsertDriveFileIcon sx={{mx: 2}}/>
                          <Typography>{file.path} </Typography>
                        </Box>
                        <IconButton onClick={removeFile(file)}><DeleteForeverIcon color='error'/></IconButton>
                      </Box>
                      <Divider />
                    </Box>
                  ))
                }
              </Box>
              <Box display='flex' alignItems='center' mt={5}>
                <Checkbox size='small'/>
                <Typography>
                  He leido y acepto las
                  <Typography
                    variant='caption'
                    sx={{
                      "&:hover": {
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
