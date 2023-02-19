import React from 'react';
import {AdminLayout} from "../../../../../components/layouts";
import {
  Box,
  Typography,
  Button,
  useMediaQuery,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Icon
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
  FilesForm,
  LocationInformationForm
} from "../../../../../components/ui/admin/properties/createForm";
import {PROPERTY_FILES_INITIAL_VALUE} from "../../../../../utils/mock-data";

interface PanelProps {
  id: string;
  title: string;
  state: string;
  icon: JSX.Element;
  content: JSX.Element;
}

const panels: PanelProps[] = [
  {
    id: 'panel1',
    state: propertyAccordionStatus.generalInformation,
    title: 'Informacion general',
    icon:  <HandymanIcon /> ,
    content: < GeneralInformationForm/>
  },
  {
    id: 'panel2',
    state: propertyAccordionStatus.locationInformation,
    title: 'Ubicacion de inmueble',
    icon: < LocationOnIcon/>,
    content: < LocationInformationForm/>
  },
  {
    id: 'panel3',
    state: propertyAccordionStatus.imagesInformation,
    title: 'Fotografias y videos de inmueble',
    icon: < PermMediaIcon/>,
    content: <p>hello from images</p>
  },
  {
    id: 'panel4',
    state: propertyAccordionStatus.attributesInformation,
    title: 'Caracteristicas del inmueble',
    icon: < ListAltIcon/>,
    content: < AttributesInformationForm/>
  },
  {
    id: 'panel5',
    state: propertyAccordionStatus.clientDataInformation,
    title: 'Datos de negociacion y cliente',
    icon: < HandshakeIcon/>,
    content: < NegotiationInformationForm/>
  },
  {
    id: 'panel6',
    state: propertyAccordionStatus.filesInformation,
    title: 'Documentos legales',
    icon: < ArticleIcon/>,
    content: < FilesForm/>
  },
  {
    id: 'panel7',
    state: propertyAccordionStatus.publicationSourceInformation,
    title: 'Fuente de publicacion',
    icon: < ArticleIcon/>,
    content: < PublicationSourceForm/>
  },
]


export default function CreateNewPropertyPage() {
  const largeScreen = useMediaQuery((theme: any) => theme.breakpoints.up('md'))
  const methods = useForm<Property>({
    defaultValues: {
      // @ts-ignore
      // TODO corregir este tipado
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
            {
              panels.map(element => (
                <Accordion
                  key={element.id}
                  expanded={expanded === element.state}
                  onChange={handleChangePanel(element.state)}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{color: expanded === element.state ? '#fff' : 'secondary.main'}}/>}
                    aria-controls='general-information-panel-content'
                    id='general-information-panel'
                    sx={{
                      px: 3,
                      py: expanded === element.state ? 0 : 2,
                      backgroundColor: expanded === element.state ? 'primary.main' : '#fff',
                      mb: expanded === element.state ? 2 : 0
                  }}
                  >
                    <Box display='flex' alignItems='center'>
                      <Icon sx={{ mr: 3, color: expanded === element.state ? '#fff' : 'secondary.main' }}>
                        {element.icon}
                      </Icon>
                      {/*<HandymanIcon sx={{mr: 2, color: expanded === element.state ? '#fff' : 'secondary.main'}}/>*/}
                      <Typography variant='h6' color={expanded === element.state ? '#fff' : 'secondary'}>{element.title}</Typography>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
                    {element.content}
                  </AccordionDetails>
                </Accordion>
              ))
            }

            <button type='submit'> submit</button>
          </form>
        </FormProvider>

      </>
    </AdminLayout>
  )
}




