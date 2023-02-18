import React from 'react';
import {useFormContext, useFieldArray} from "react-hook-form";
import {
  Grid,
  Box,
  Typography,
  TextField,
  IconButton,
  FormControl,
  MenuItem,
  Select
} from '@mui/material'
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import {PropertyFile} from "../../../../../interfaces/properties";
export function FilesForm() {
  const {register} = useFormContext()
  const {fields} = useFieldArray({
    name: 'files'
  })

  console.log(fields);
  return (
    <Grid container spacing={4}>
      {
        // @ts-ignore
        // TODO corregir este tipado
        fields.map((field:  PropertyFile  , index) => {
            if (field.type === 'text') {
              return (
                <>
                  <Grid item xs={12} md={3} key={field.id}>
                    <Typography fontWeight='bold' sx={{mb: 1}}>{field.label}</Typography>
                    <TextField
                      color='secondary'
                      fullWidth
                      placeholder={field.label}
                      {...register(`files[${index}].value`)}
                      variant="outlined"
                    />
                  </Grid>
                  {
                    field.imageData > 0 &&
                    <Box display='flex' alignItems='center' justifyContent='space-between'>
                      <Box display='flex' alignItems='center'>
                        {
                          !field.id.includes('.pdf') &&
                          <Box sx={{cursor: 'pointer'}}
                               onClick={() => {}}
                               component='img' mr={2} src={`http://138.219.42.156:3000/images/${field.id}`} width={40}
                               height={40}/>

                        }
                        {
                          field.id.includes('.pdf') &&
                          <IconButton onClick={() => {}}>
                            <DocumentScannerIcon />
                          </IconButton>
                        }
                        <Box><Typography fontWeight='bold' color='primary'>Evidencia {field.label}</Typography></Box>
                      </Box>
                      {/*<DeleteButton onClick={() => {}} item={`Evidencia de ${field.label}`}/>*/}
                    </Box>
                  }
                </>
              )
            } else {
              return (
                <Grid item xs={12} md={3} key={field.id}>
                  <Typography fontWeight='bold' sx={{mb: 1}}>{field.label}</Typography>
                  <FormControl fullWidth>
                    <Select  defaultValue=''  {...register(`files[${index}].value`)}>
                      {
                        field.values.split('#').map((option: string, index: number) => (
                          <MenuItem key={`${option}${index}`} value={option}>{option}</MenuItem>
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
