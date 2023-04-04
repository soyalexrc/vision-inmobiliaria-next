import React from 'react';
import {
  useMediaQuery,
  Drawer,
  Box,
  Typography,
  IconButton,
  InputLabel,
  FormControl,
  MenuItem,
  Select,
  Grid,
  Divider,
  TextField,
  Button
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close'
import AddIcon from '@mui/icons-material/add'
import {UIContext} from "../../../../../context/ui";
import {DeleteButton} from "../../DeleteButton";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import {axiosInstance} from "../../../../../utils";
import {useSnackbar} from "notistack";
import {RHFAutocomplete} from "../../../forms";
import {TYPE_OF_PROPERTY} from "../../../../../utils/properties";

interface FormValues {
  category: string,
  form_type: string,
  id: number | null,
  label: string,
  placeholder: string,
  property_type: string,
  property_values: string,
}

const schema = yup.object({
  category: yup.string(),
  form_type: yup.string(),
  id: yup.number(),
  label: yup.string(),
  placeholder: yup.string(),
  property_type: yup.string(),
  property_values: yup.string(),
});

export function AttributesCreadeUpdateDrawer() {
  const largeScreen = useMediaQuery((theme: any) => theme.breakpoints.up('md'))
  const [options, setOptions] = React.useState<string[]>([])
  const [loading, setLoading] = React.useState(false)
  const { register, handleSubmit, setValue, watch, control } = useForm<FormValues>({ resolver: yupResolver(schema), mode: 'all' });
  const onSubmit = handleSubmit((data) => handleAttribute(data));
  const watchedFormType = watch('form_type')
  const { enqueueSnackbar } = useSnackbar()

  const {
    attributesPanelOpen,
    handleCloseAttributesPanel,
    attributesTypeAction,
    attributesPanelData,
    onRefresh
  } = React.useContext(UIContext)

  function removeOption(option: any) {
  }


  const handleChangeOptions = (index: number, value: string) => {
    const copyOptions = [...options];
    copyOptions[index] = value;
    setOptions(copyOptions);
  }

  const pushOption = () => {
    setOptions(prevState => ([
      ...prevState,
      `Opcion ${options.length + 1}`,
    ]))
  }

  async function handleAttribute(data: FormValues) {
    const fullObj = {
      category: data.category,
      formType: data.form_type,
      label: data.label,
      id: data.id,
      placeholder: data.placeholder,
      propertyType: data.property_type,
      values: options.join('#')
    };
    let response: any;
    try {
      setLoading(true);
      response = attributesTypeAction === 'Crear'
        ? await axiosInstance.post('attribute/addNewData', fullObj)
        : await axiosInstance.put('attribute/updateData', fullObj)
      if (response.status === 200) {
        enqueueSnackbar( attributesTypeAction === 'Crear'
          ? 'Se creo el atributo con exito!'
          : 'Se edito el atributo con exito!', {variant: 'success'} )
        onRefresh();
      }
    } catch (e) {
      enqueueSnackbar('Error!', {variant: 'error'} )
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    setValue('category', attributesPanelData.category);
    setValue('form_type', attributesPanelData.form_type);
    setValue('id', attributesPanelData.id);
    setValue('label', attributesPanelData.label);
    setValue('property_type', attributesPanelData.property_type);
    setValue('property_values', attributesPanelData.property_values);

    if (attributesPanelData?.property_values?.length > 0 ) {
      setOptions(attributesPanelData.property_values?.split('#'))
    } else {
      setOptions(['Opcion 1'])
    }
  }, [attributesPanelData])

  return (
    <Drawer
      anchor='right'
      open={attributesPanelOpen}
      onClose={handleCloseAttributesPanel}
    >
      <form onSubmit={onSubmit}>
        <Box sx={{width: largeScreen ? 600 : 365, height: '100%'}}>
          <Box p={2}>
            <Box display='flex' alignItems='center' justifyContent='space-between'>
              <Typography variant='h5' color='primary'>
                {attributesTypeAction} atributo
              </Typography>
              <IconButton onClick={handleCloseAttributesPanel}>
                <CloseIcon/>
              </IconButton>
            </Box>
            <Divider sx={{my: 2}}/>
            <Box>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4} >
                  <RHFAutocomplete
                    name="property_type"
                    control={control}
                    options={TYPE_OF_PROPERTY}
                    getOptionLabel={(option: any) => option || ''}
                    defaultValue={null}
                    label='Tipo de Inmueble'
                  />
                </Grid>
                <Grid item xs={12} md={4} >
                  <RHFAutocomplete
                    name="form_type"
                    control={control}
                    options={['Seleccion de opciones', 'Campo de texto']}
                    getOptionLabel={(option: any) => option || ''}
                    defaultValue={null}
                    label='Tipo de Atributo'
                  />

                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    color='secondary'
                    sx={{mt: 2}}
                    placeholder='Nombre de atribuo'
                    {...register('label')}
                    label='Nombre de atribuo'
                    variant="outlined"
                  />
                </Grid>
              </Grid>
              <Box display='flex' justifyContent='center'>
                <Divider sx={{my: 2, width: 300}}/>
              </Box>
              {
                watchedFormType === 'text' &&
                <TextField
                  fullWidth
                  color='secondary'
                  sx={{mt: 2}}
                  placeholder='Placeholder'
                  {...register('placeholder')}
                  label='Placeholder'
                  variant="outlined"
                />
              }
              {
                watchedFormType === 'select' &&
                <Box>
                  <Box display='flex' alignItems='center'>
                    <Typography variant='h6'>Opciones </Typography>
                    <IconButton color='secondary' sx={{mx: 2}} onClick={() => pushOption()}>
                      <AddIcon/>
                    </IconButton>
                  </Box>
                  {
                    options.map((option: any, index: number) => (
                      <Box key={index + 1} display='flex' alignItems='center'>
                        <TextField
                          color='secondary'
                          sx={{mt: 2}}
                          placeholder={`Opcion ${index + 1}`}
                          value={options[index]}
                          variant="outlined"
                          onChange={(e) => handleChangeOptions(index, e.target.value)}
                        />
                        <DeleteButton title="Se eliminara la siguiente opcion" element={`opcion: ${option}`} onClick={() => removeOption(option)}/>
                      </Box>
                    ))
                  }
                </Box>
              }
            </Box>
          </Box>
          <Box
            py={5}
            display='flex'
            justifyContent='center'
          >
            <Button
              disabled={loading}
              sx={{width: 200}}
              type='submit'
              size='large'
              variant='contained'
              color='secondary'
            >
              {attributesTypeAction}
            </Button>
          </Box>
        </Box>
      </form>
    </Drawer>
  )
}
