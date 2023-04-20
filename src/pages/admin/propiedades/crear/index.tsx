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
  Icon,
  Grid,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {useForm, FormProvider} from "react-hook-form";
import {Property} from "../../../../../interfaces";
import {panels, PROPERTY_FILES_INITIAL_VALUE} from "../../../../../utils/mock-data";
import {useRouter} from "next/router";
import {axiosInstance} from "../../../../../utils";
import {useSnackbar} from "notistack";
import axios from "axios";
import {AuthContext} from "../../../../../context/auth";


export default function CreateNewPropertyPage() {
  const router = useRouter();
  const largeScreen = useMediaQuery((theme: any) => theme.breakpoints.up('md'))
  const methods = useForm<Property>({
    defaultValues: {
      // @ts-ignore
      // TODO corregir este tipado
      property: {
        property_status: 'Incompleto'
      }
    }
  });
  const onSubmit = methods.handleSubmit((data) => createNewProperty(data));
  const [expanded, setExpanded] = React.useState<string | boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const {enqueueSnackbar} = useSnackbar()
  const handleChangePanel = (panel: string) => (event: any, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false)
  }

  const createNewProperty = async (data: Property) => {
    const fullObj = {...data};
    fullObj.property.ally = fullObj.property.ally.id;
    fullObj.property.owner = fullObj.property.owner.id;
    fullObj.property.adviser = fullObj.property.adviser.id;
    console.log(fullObj)
    try {
      setLoading(true);
      const response = await axiosInstance.post('property/addNewData', data);
      if (response.status === 200) {
        enqueueSnackbar('Se registro la propiedad con exito!', {variant: 'success'})
        router.back()
      }
    } catch (err) {
      enqueueSnackbar("Ocurrio un error", {variant: 'error'})
    } finally {
      setLoading(false);
    }
  }

  const handleGoToPrevisualize = () => {
    const valueToSend = JSON.stringify(methods.control._formValues);
    sessionStorage.setItem('propertyToPrevisualize', valueToSend);
    window.open(`/admin/propiedades/previsualizar/${router.query?.id}`, '_blank', 'popup=true')
  }


  return (
    <AdminLayout title='Crear nueva propiedad | Vision inmobiliaria'>
      <>
        <Box display='flex' justifyContent='space-between' flexWrap='wrap' my={3}>
          <Typography variant='h2'>Registro de propiedad</Typography>
          <Button fullWidth={!largeScreen} sx={{mt: !largeScreen ? 2 : 0}} onClick={handleGoToPrevisualize}
                  variant='outlined' color='primary'>Vista previa</Button>
        </Box>
        <FormProvider {...methods}>
          <form>
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
                      <Icon sx={{mr: 3, color: expanded === element.state ? '#fff' : 'secondary.main'}}>
                        {element.icon}
                      </Icon>
                      {/*<HandymanIcon sx={{mr: 2, color: expanded === element.state ? '#fff' : 'secondary.main'}}/>*/}
                      <Typography variant='h6'
                                  color={expanded === element.state ? '#fff' : 'secondary'}>{element.title}</Typography>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
                    {element.content}
                  </AccordionDetails>
                </Accordion>
              ))
            }
            <Grid container spacing={2} sx={{mt: 3}}>
              <Grid item xs={6}>
                <Button onClick={() => router.back()} fullWidth variant='outlined' color='primary'>Cancelar</Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  disabled={loading}
                  fullWidth
                  onClick={onSubmit}
                  variant='contained'
                  color='primary'>{loading ? 'Registrando informacion' : 'Registrar propiedad'}</Button>
              </Grid>
            </Grid>
          </form>
        </FormProvider>

      </>
    </AdminLayout>
  )
}




