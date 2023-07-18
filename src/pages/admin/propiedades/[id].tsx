import React from 'react';
import {AdminLayout} from "../../../../components/layouts";
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
import {Property} from "../../../../interfaces/properties";
import {panels, PROPERTY_FILES_INITIAL_VALUE} from "../../../../utils/mock-data";
import {useRouter} from "next/router";
import {axiosInstance} from "../../../../utils";
import {useSnackbar} from "notistack";
import ConfirmationModal from "../../../../components/ui/ConfirmationModal";


export default function EditPropertyPage() {
  const router = useRouter();
  const id = router.query?.id;
  const largeScreen = useMediaQuery((theme: any) => theme.breakpoints.up('md'))
  const methods = useForm<Property>();
  const onSubmit = methods.handleSubmit((data: Property) => editProperty(data));
  const [expanded, setExpanded] = React.useState<string | boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [getLoading, setGetLoading] = React.useState<boolean>(true);
  const {enqueueSnackbar} = useSnackbar()
  const [open, setOpen] = React.useState<boolean>(false)
  const [confirmationType, setConfirmationType] = React.useState<string>('')
  const handleChangePanel = (panel: string) => (event: any, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false)
  }

  const editProperty = async (data: Property) => {
    const fullObj = {...data};
    fullObj.id = id
    try {
      setLoading(true);
      const response = await axiosInstance.put('property/updateData', fullObj);
      if (response.status === 200) {
        enqueueSnackbar('Se edito la propiedad con exito!', {variant: 'success'})
        router.back()
      }
    } catch(err) {
      enqueueSnackbar("Ocurrio un error", {variant: 'error'})
    } finally {
      setLoading(false);
    }
  }

  const getPropertyById = async (id: string | string[]) => {
    try {
      const response = await axiosInstance.get<Property>(`property/getById?id=${id}`);
      if (response.status === 200) {
        methods.setValue('property', response.data.property);
        methods.setValue('attributes', response.data.attributes);
        methods.setValue('files', response.data.files);
        methods.setValue('images', response.data.images);
        methods.setValue('location', response.data.location);
        methods.setValue('clientData', response.data.clientData);
      }
    } catch (err) {
      enqueueSnackbar(`Error ${JSON.stringify(err)}`, {variant: 'error'})
    } finally {
      setGetLoading(false);
    }
  }

  const handleGoToPrevisualize = () => {
    const valueToSend = JSON.stringify(methods.control._formValues);
    sessionStorage.setItem('propertyToPrevisualize', valueToSend);
    window.open(`/admin/propiedades/previsualizar/${router.query?.id}`, '_blank', 'popup=true')
  }

  React.useEffect(() => {
    if (router.query.id) {
      getPropertyById(router.query?.id!)
    }
  }, [router.query.id])


  React.useEffect(() => {
    router.beforePopState(({as}) => {
      const currentPath = router.asPath;

      if (as !== currentPath) {
        setOpen(true);
        if (confirmationType && confirmationType === 'confirm') {
          return true;
        } else {
          window.history.pushState(null, "", currentPath);
          return false;
        }
      }
      return true;
    })

    return () => {
      router.beforePopState(() => true);
    }
  }, [])


  function handleConfirmationResponse(actionType: string) {
    console.log(actionType);
    setConfirmationType(actionType)
    setOpen(false)
  }

  return (
    <AdminLayout title='Edicion propiedad | Vision inmobiliaria'>
      <>
        <Box>
          {
              getLoading &&
              <p>Cargando...</p>
          }
          {
              !getLoading &&
              <>
                <Box display='flex' justifyContent='space-between' flexWrap='wrap' my={3}>
                  <Typography variant='h2'>Edicion de propiedad</Typography>
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
                                expandIcon={<ExpandMoreIcon
                                    sx={{color: expanded === element.state ? '#fff' : 'secondary.main'}}/>}
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
                            color='primary'>{loading ? 'Editando informacion' : 'Editar propiedad'}</Button>
                      </Grid>
                    </Grid>
                  </form>
                </FormProvider>

              </>
          }
        </Box>
        <ConfirmationModal
            title='Salir de la pagina de edicion de propiedad'
            text='Si sales ahora perderas los cambios realizados'
            cancelText='Cancelar'
            action={handleConfirmationResponse}
            confirmText='Si, salir'
            open={open}
        />
      </>



    </AdminLayout>
  )
}




