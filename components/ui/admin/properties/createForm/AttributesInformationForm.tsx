import React from 'react';
import {useSnackbar} from "notistack";
import {FieldArrayWithId, FieldValues, useFieldArray, useFormContext} from "react-hook-form";
import {axiosInstance} from "../../../../../utils";
import {PropertyAttribute} from "../../../../../interfaces/properties";
import {Divider, FormControl, Grid, MenuItem, Select, TextField, Typography} from "@mui/material";

export function AttributesInformationForm() {
  const {enqueueSnackbar} = useSnackbar()
  const {register, setValue, watch} = useFormContext()
  const {fields, insert} = useFieldArray({name: 'attributes'})
  const propertyTypeWached = watch('property.propertyType');

  const getAttributes = async () => {
    try {
      const response = await axiosInstance.get(`/attribute/getAllDataByPropertyType?propertyType=${propertyTypeWached}`)
      if (response.status === 200) {
        console.log(response.data);
        fillArrayOfAttributes(response.data);

      }
    } catch (e) {
      enqueueSnackbar('Error', {variant: 'error'});
    }
  }

  const fillArrayOfAttributes = (attributes: PropertyAttribute[]) => {
    attributes.forEach((attribute, index) => {
      insert(index, attribute)
    })
  }

  React.useEffect(() => {
    if (propertyTypeWached) {
      getAttributes()
    }
  }, [propertyTypeWached])

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Typography variant='h5' color='secondary'>Atributos generales de {propertyTypeWached}</Typography>
        <Divider sx={{my: 2}}/>
      </Grid>
      {
        // @ts-ignore
        // TODO corregir este tipado
        fields.map((field:  PropertyAttribute  , index) => {
            if (field.form_type === 'text') {
              return (
                <>
                <Grid item xs={12} md={3} key={field.id}>
                  <Typography fontWeight='bold' sx={{mb: 1}}>{field.label}</Typography>
                  <TextField
                    color='secondary'
                    fullWidth
                    placeholder={field.placeholder}
                    {...register(`attributes[${index}].value`)}
                    variant="outlined"
                  />
                </Grid>
                </>
              )
            } else {
              return (
                <Grid item xs={12} md={3} key={field.id}>
                  <Typography fontWeight='bold' sx={{mb: 1}}>{field.label}</Typography>
                  <FormControl fullWidth>
                    <Select  defaultValue=''  {...register(`attributes[${index}].value`)}>
                      {
                        field.values?.split('#').map((option: string, index: number) => (
                          <MenuItem key={`${option}-${index}`} value={option}>{option}</MenuItem>

                        ))
                      }
                    </Select>
                  </FormControl>
                </Grid>
              )
            }
          }
        )
      }
    </Grid>
  )
}
