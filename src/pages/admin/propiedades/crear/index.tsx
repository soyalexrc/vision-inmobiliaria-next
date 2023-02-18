import React from 'react';
import {AdminLayout} from "../../../../../components/layouts";
import {
  Box,
  Typography,
  Button,
  useMediaQuery,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HandymanIcon from '@mui/icons-material/Handyman';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ArticleIcon from '@mui/icons-material/Article';
import HandshakeIcon from '@mui/icons-material/Handshake';
import {useForm, FormProvider} from "react-hook-form";
import {propertyAccordionStatus} from '../../../../../utils/constants';
import {Property} from "../../../../../interfaces/properties";
import {
  GeneralInformationForm,
  AttributesInformationForm,
  NegotiationInformationForm,
  PublicationSourceForm,
  FilesForm
} from "../../../../../components/ui/admin/properties/createForm";
import {PROPERTY_FILES_INITIAL_VALUE} from "../../../../../utils/mock-data";


export default function CreateNewPropertyPage() {
  const largeScreen = useMediaQuery((theme: any) => theme.breakpoints.up('md'))
  const methods = useForm<Property>({
    defaultValues: {
      files: [...PROPERTY_FILES_INITIAL_VALUE]
    }
  });
  const onSubmit = methods.handleSubmit((data: any) => console.log(data));
  const [expanded, setExpanded] = React.useState<string | boolean>(false);

  const handleChangePanel = (panel: string) => (event: any, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false)
  }

  return (
    <AdminLayout title='Crear nueva propiedad | Vision inmobiliaria'>
      <>
        <Box display='flex' justifyContent='space-between' flexWrap='wrap' my={3}>
          <Typography variant='h2'>Registro de propiedad</Typography>
          <Button fullWidth={!largeScreen} sx={{mt: !largeScreen ? 2 : 0}} onClick={() => {
          }}
                  variant='outlined' color='primary'>Vista previa</Button>
        </Box>
        <FormProvider {...methods}>
          <form onSubmit={onSubmit}>
            <Accordion
              expanded={expanded === propertyAccordionStatus.generalInformation}
              onChange={handleChangePanel(propertyAccordionStatus.generalInformation)}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon color='secondary'/>}
                aria-controls='general-information-panel-content'
                id='general-information-panel'
                sx={{p: 3}}
              >
                <Box display='flex' alignItems='center'>
                  <HandymanIcon color='secondary' sx={{mr: 2}}/>
                  <Typography variant='h6'>Informacion General</Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <GeneralInformationForm/>
              </AccordionDetails>
            </Accordion>

            <Accordion
              expanded={expanded === propertyAccordionStatus.locationInformation}
              onChange={handleChangePanel(propertyAccordionStatus.locationInformation)}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon color='secondary'/>}
                aria-controls='location-information-panel-content'
                id='location-information-panel'
                sx={{p: 3}}
              >
                <Box display='flex' alignItems='center'>
                  <LocationOnIcon color='secondary' sx={{mr: 2}}/>
                  <Typography variant='h6'>Ubicacion de inmueble</Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <p>Ubicacion de inmueble </p>
              </AccordionDetails>
            </Accordion>

            <Accordion
              expanded={expanded === propertyAccordionStatus.imagesInformation}
              onChange={handleChangePanel(propertyAccordionStatus.imagesInformation)}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon color='secondary'/>}
                aria-controls='images-information-panel-content'
                id='images-information-panel'
                sx={{p: 3}}
              >
                <Box display='flex' alignItems='center'>
                  <PermMediaIcon color='secondary' sx={{mr: 2}}/>
                  <Typography variant='h6'>Fotografias y videos de inmueble</Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <p>Fotografias y videos de inmueble </p>
              </AccordionDetails>
            </Accordion>

            <Accordion
              expanded={expanded === propertyAccordionStatus.attributesInformation}
              onChange={handleChangePanel(propertyAccordionStatus.attributesInformation)}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon color='secondary'/>}
                aria-controls='attributes-information-panel-content'
                id='attributes-information-panel'
                sx={{p: 3}}
              >
                <Box display='flex' alignItems='center'>
                  <ListAltIcon color='secondary' sx={{mr: 2}}/>
                  <Typography variant='h6'>Caracteristicas del inmueble</Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <AttributesInformationForm/>
              </AccordionDetails>
            </Accordion>

            <Accordion
              expanded={expanded === propertyAccordionStatus.clientDataInformation}
              onChange={handleChangePanel(propertyAccordionStatus.clientDataInformation)}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon color='secondary'/>}
                aria-controls='client-data-information-panel-content'
                id='client-data-information-panel'
                sx={{p: 3}}
              >
                <Box display='flex' alignItems='center'>
                  <HandshakeIcon color='secondary' sx={{mr: 2}}/>
                  <Typography variant='h6'>Datos de negociacion y cliente</Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <NegotiationInformationForm />
              </AccordionDetails>
            </Accordion>

            <Accordion
              expanded={expanded === propertyAccordionStatus.filesInformation}
              onChange={handleChangePanel(propertyAccordionStatus.filesInformation)}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon color='secondary'/>}
                aria-controls='files-information-panel-content'
                id='files-information-panel'
                sx={{p: 3}}
              >
                <Box display='flex' alignItems='center'>
                  <ArticleIcon color='secondary' sx={{mr: 2}}/>
                  <Typography variant='h6'>Documentos legales</Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <FilesForm />
              </AccordionDetails>
            </Accordion>

            <Accordion
              expanded={expanded === propertyAccordionStatus.publicationSourceInformation}
              onChange={handleChangePanel(propertyAccordionStatus.publicationSourceInformation)}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon color='secondary'/>}
                aria-controls='publication-source-information-panel-content'
                id='publication-source-information-panel'
                sx={{p: 3}}
              >
                <Box display='flex' alignItems='center'>
                  <ArticleIcon color='secondary' sx={{mr: 2}}/>
                  <Typography variant='h6'>Fuente de publicacion</Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <PublicationSourceForm />
              </AccordionDetails>
            </Accordion>

            <button type='submit'> submit</button>
          </form>
        </FormProvider>

      </>
    </AdminLayout>
  )
}




