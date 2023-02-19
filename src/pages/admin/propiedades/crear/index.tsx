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
import {useForm, FormProvider} from "react-hook-form";
import {Property} from "../../../../../interfaces/properties";
import {panels, PROPERTY_FILES_INITIAL_VALUE} from "../../../../../utils/mock-data";


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




