import React, {useRef} from 'react';
import {useFormContext, useFieldArray} from "react-hook-form";
import {
  Grid,
  Box,
  IconButton,
  TextField,
  ListItem,
  Button,
  ListItemButton,
  Chip,
  ListItemIcon,
  Divider,
  Typography
} from '@mui/material'
import {v4 as uuidv4} from 'uuid';
import AddIcon from '@mui/icons-material/add'
import ArticleIcon from "@mui/icons-material/Article";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import {PropertyFile} from "../../../../../interfaces/properties";
import {axiosInstance} from "../../../../../utils";
import {useSnackbar} from "notistack";
import {UIContext} from "../../../../../context/ui";

export function FilesForm() {
  const {register, control} = useFormContext()
  const {fields, append} = useFieldArray({name: 'files'})
  const [isEditing, setIsEditing] = React.useState<boolean>(false);
  const [newDocument, setNewDocument] = React.useState<any>({})
  const [documentFiles, setDocumentFiles] = React.useState<any[]>([])
  const [loading, setLoading] = React.useState<boolean>(false);
  const {enqueueSnackbar} = useSnackbar()
  const inputRef = useRef<any>(null)
  const {openPreviewModal} = React.useContext(UIContext)

  function createNewDocument() {
    setIsEditing(true);
    setNewDocument({
      id: uuidv4(),
      title: ''
    })
  }

  function handleCancel() {
    setNewDocument({})
    setDocumentFiles([])
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

  function handleDeleteFile() {
  }

  function handleSave() {
    const obj = {...newDocument};
    obj.data = documentFiles

    append(obj)
    setNewDocument({})
    setIsEditing(false)
    setDocumentFiles([])
  }

  function openFile(file: string) {
    if (file.includes('.pdf')) {
      window.open(`http://100.42.69.119:3000/images/${file}`);
    }
    openPreviewModal(file)
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
                <Box key={file.id}>
                  <Chip label={file.imageData} onDelete={handleDeleteFile} onClick={() => {
                  }}/>
                </Box>
              ))}
            </Box>
          }
        </Grid>
      }
      <Box width='100%'>
        {
          // @ts-ignore
          // TODO corregir este tipado
          fields.map((field: PropertyFile, index) => (
              <Box
                key={field.id}
                p={2}
                width='100%'
              >
                <Box>
                  <Box display='flex' alignItems='center' justifyContent='space-between'>
                    <Box display='flex' p={2} gap={2}>
                      <ArticleIcon/>
                      <Typography>{field.title} </Typography>
                    </Box>
                    <IconButton onClick={handleDeleteFile}>
                      <DeleteIcon color='error'/>
                    </IconButton>
                  </Box>
                  <Box px={2} display='flex' flexWrap='wrap' gap={2}>
                    {field.data.map((file: any) => (
                      <Box key={file.id}>
                        <Chip label={file.imageData} onClick={() => openFile(file.imageData)}/>
                      </Box>
                    ))}
                  </Box>
                </Box>
                <Divider sx={{my: 2}} />
              </Box>
            )
          )
        }
      </Box>
    </Grid>
  )
}
