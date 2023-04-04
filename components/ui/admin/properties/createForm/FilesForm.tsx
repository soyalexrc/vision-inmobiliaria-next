import React, {useRef} from 'react';
import {useFormContext, useFieldArray} from "react-hook-form";
import {
  Grid,
  Box,
  Typography,
  TextField,
  IconButton,
  Button,
  MenuItem,
  Chip
} from '@mui/material'
import {v4 as uuidv4} from 'uuid';
import AddIcon from '@mui/icons-material/add'
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SaveIcon from '@mui/icons-material/Save';
import {PropertyFile} from "../../../../../interfaces/properties";
import {RHFSelect} from "../../../forms";
import {axiosInstance} from "../../../../../utils";
import {useSnackbar} from "notistack";

export function FilesForm() {
  const {register, control} = useFormContext()
  const {fields, append} = useFieldArray({name: 'files'})
  const [isEditing, setIsEditing] = React.useState<boolean>(false);
  const [newDocument, setNewDocument] = React.useState<any>({})
  const [documentFiles, setDocumentFiles] = React.useState<any[]>([])
  const [loading, setLoading] = React.useState<boolean>(false);
  const {enqueueSnackbar} = useSnackbar()
  const inputRef = useRef<any>(null)

  function createNewDocument() {
    setIsEditing(true);
    setNewDocument({
      id: uuidv4(),
      title: ''
    })
  }

  function handleCancel() {
    setNewDocument({})
    setIsEditing(false)
  }

  async function uploadFile(data: any) {
    try {
      setLoading(true);
      enqueueSnackbar('Cargando archivo, por favor espere...', {variant: 'warning'})
      const response = await axiosInstance.post('file/upload', data);
      if (response.status === 200) {
        enqueueSnackbar('Se cargo el archivo  con exito!', {variant: 'success'})
        return response.data
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  }

  const handleAddFile = async (e: any) => {
    let obj: any = {
      id: '',
      imageType: '',
      imageData: ''
    }
    const {files} = e.target;
    let filesData: any = []

    const forLoop = async () => {
      for (let i = 0; i < files.length; i++) {
        try {
          const reader = new FileReader();
          reader.readAsDataURL(files[i]);
          reader.onload = async () => {
            obj.imageType = files[i].type;
            obj.imageData = reader.result;
            obj.id = uuidv4();
            const dataImage = await uploadFile(obj);
            // TODO validar imagenes del server que no estan exisitiendo bajo path
            const objImage = {
              id: dataImage,
              imageData: dataImage,
              imageType: files[i].type
            }
            // Add image to some store or state...
            setDocumentFiles(prevState => [...prevState, objImage])
          }
        } catch (e) {
        }
      }
    }
    await forLoop();
  }

  function handleChangeTitle(e: any) {
    setNewDocument((prevState: any) => ({
      ...prevState,
      title: e.target.value
    }))
  }

  function handleDeleteFile() {}

  function handleSave() {
    const obj = {...newDocument};
    obj.data = documentFiles

    append(obj)
  }



  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Button
          fullWidth
          variant='outlined'
          disabled={isEditing}
          startIcon={<AddIcon/>}
          onClick={createNewDocument}
        >
          Agregar un documento
        </Button>
      </Grid>
      {
        newDocument && newDocument.id &&
        <Grid item xs={12}>
          <Box display='flex' gap={5} alignItems='center'>
            <TextField
              color='secondary'
              sx={{width: '350px'}}
              placeholder='Titulo de documento'
              value={newDocument.title}
              onChange={handleChangeTitle}
              variant="outlined"
            />
            <Box>
              <Button
                startIcon={<AttachFileIcon/>}
                color='info'
                size='small'
                onClick={() => inputRef.current.click()}
                variant='outlined'
              >
                <input
                  hidden
                  ref={inputRef}
                  multiple
                  accept="/*"
                  type="file"
                  onChange={handleAddFile}/>
                Adjuntar archivo
              </Button>
              <Button
                startIcon={<SaveIcon/>}
                color='success'
                sx={{mx: 2}}
                size='small'
                variant='outlined'
                onClick={handleSave}
              >
                Guardar
              </Button>
              <Button
                onClick={handleCancel}
                color='error'
                size='small'
                variant='outlined'
                startIcon={<DeleteForeverIcon/>}
              >
                Cancelar
              </Button>
            </Box>
          </Box>
          {
            documentFiles && documentFiles.length > 0 &&
            <Box display='flex' flexWrap='wrap' gap={1} mt={2}>
              {documentFiles.map((file: any) => (
                <Box key={file.id} >
                  <Chip label={file.imageData} onDelete={handleDeleteFile} onClick={() => {}} />
                </Box>
              ))}
            </Box>
          }
        </Grid>
      }
      {
        // @ts-ignore
        // TODO corregir este tipado
        fields.map((field: PropertyFile, index) => {
          return (
            <div key={field.id}>
              {JSON.stringify(field)}
            </div>
          )
            // if (field.type === 'text') {
            //   return (
            //     <>
            //       <Grid item xs={12} md={3} key={field.id}>
            //         <Typography fontWeight='bold' sx={{mb: 1}}>{field.label}</Typography>
            //         <TextField
            //           color='secondary'
            //           fullWidth
            //           placeholder={field.label}
            //           {...register(`files[${index}].value`)}
            //           variant="outlined"
            //         />
            //       </Grid>
            //       {
            //         field.imageData &&
            //         <Box display='flex' alignItems='center' justifyContent='space-between'>
            //           <Box display='flex' alignItems='center'>
            //             {
            //               !field.id.includes('.pdf') &&
            //               <Box sx={{cursor: 'pointer'}}
            //                    onClick={() => {
            //                    }}
            //                    component='img' mr={2} src={`http://138.219.42.156:3000/images/${field.id}`} width={40}
            //                    height={40}/>
            //
            //             }
            //             {
            //               field.id.includes('.pdf') &&
            //               <IconButton onClick={() => {
            //               }}>
            //                 <DocumentScannerIcon/>
            //               </IconButton>
            //             }
            //             <Box><Typography fontWeight='bold' color='primary'>Evidencia {field.label}</Typography></Box>
            //           </Box>
            //           {/*<DeleteButton onClick={() => {}} item={`Evidencia de ${field.label}`}/>*/}
            //         </Box>
            //       }
            //     </>
            //   )
            // } else {
            //   return (
            //     <Grid item xs={12} md={3} key={field.id}>
            //       <RHFSelect
            //         name={`files[${index}].value`}
            //         label={field.label}
            //         defaultValue={''}
            //         control={control}
            //       >
            //         {
            //           field.values?.split('#').map((option: string, index: number) => (
            //             <MenuItem key={option + index} value={option}>{option}</MenuItem>
            //           ))
            //         }
            //       </RHFSelect>
            //     </Grid>
            //   )
            // }
          }
        )
      }
    </Grid>
  )
}
