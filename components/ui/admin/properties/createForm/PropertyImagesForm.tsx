import React from 'react';
import {axiosInstance} from "../../../../../utils";
import {useSnackbar} from 'notistack';
import {v4 as uuidv4} from 'uuid';
import {useFieldArray, useFormContext} from "react-hook-form";
import {
  Box,
  Typography,
  CircularProgress,
  Grid,
  IconButton
} from '@mui/material'
import AddIcon from "@mui/icons-material/Add";
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import {DeleteButton} from "../../DeleteButton";

export function PropertyImagesForm() {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [prevIndex, setPrevIndex] = React.useState<number | null>(null);
  const {enqueueSnackbar} = useSnackbar()
  const {register} = useFormContext()
  const {fields, swap, append, remove} = useFieldArray({name: 'images'})
  const inputRef = React.useRef<any>(null);

  async function uploadFile(data: any) {
    try {
      setLoading(true);
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

  const handleAddImage = async (e: any) => {
    let obj: any = {
      id: '',
      imageType: '',
      imageData: ''
    }
    const {files} = e.target;

    const forLoop = async () => {
      for (let i = 0; i < files.length; i++) {
        try {
          const reader = new FileReader();
          reader.readAsDataURL(files[i]);
          reader.onload = async () => {
            obj.imageType = files[i].type;
            obj.imageData = reader.result;
            obj.id = uuidv4();
            // const dataImage = await uploadFile(obj);
            const objImage = {
              id: null,
              imageData: reader.result,
              imageType: files[i].type
            }
            // Add image to some store or state...
            console.log(objImage);
            append(objImage);
          }
        } catch (e) {
        }
      }
    }
    await forLoop();
  }

  const handleDragEnter = (e: any, index: any) => {

  };

  const handleDragLeave = (e: any, index: any) => {

  };

  const handleDrop = (e: any, index: any) => {
    swap(prevIndex!, index)
  };

  const handleDragStart = (index: any) => {
    setPrevIndex(index)
  };

  console.log(fields);

  return (
    <>
      <Box
        mt={2}
        display='flex'
        alignItems='center'
        justifyContent='center'
        height={50}
        border='1px dotted lightgray'
        onClick={() => inputRef.current.click()}
        sx={{
          cursor: 'pointer',
          backgroundColor: (theme: any) => theme.palette.primary.light
        }}
      >
        <input
          hidden
          ref={inputRef}
          disabled={loading}
          multiple
          accept="image/*"
          type="file"
          onChange={handleAddImage}/>

        {
          !loading &&
          <>
            <AddIcon/>
            <Typography fontWeight='bold' color='primary'> Adjuntar imagenes</Typography>
          </>
        }
        {
          loading && <CircularProgress color='primary'/>
        }
      </Box>
      <Grid container spacing={2} sx={{mt: 3}}>
        {
          fields.map((field: any, index: number) => (
            <Grid key={field.id} item xs={12} md={4} lg={3} xl={2}>
              <Box
                sx={{position: 'relative', cursor: 'grab'}}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragEnter={(e) => handleDragEnter(e, index)}
                onDragLeave={(e) => handleDragLeave(e, index)}
                onDrop={(e) => handleDrop(e, index)}
                onDragOver={(e) => e.preventDefault()}
              >
                <Box component='img' src={field.imageData} width='100%' height='100%'/>
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.15)',
                    zIndex: 111
                  }}
                >
                  <Box display='flex' alignItems='center' justifyContent='center' height='100%'>
                    <DeleteButton
                      sx={{color: '#fff'}}
                      onClick={() => console.log('deleted')}
                      title='Se eliminara la imagen'
                      element='imagen.png'
                    />
                    <IconButton>
                      <OpenInFullIcon sx={{color: '#fff'}}/>
                    </IconButton>
                  </Box>
                </Box>
                <Box sx={{position: 'absolute', top: '5px', left: '5px'}}>
                  <Typography variant='h1' color='#fff'>{index + 1}</Typography>
                </Box>
              </Box>
            </Grid>
          ))
        }
      </Grid>
    </>
  )
}
