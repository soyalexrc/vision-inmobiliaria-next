import React from 'react';
import {
  Box,
  Button,
  Divider,
  Typography,
  Container,
  Grid,
  TextField,
  MenuItem,
  InputAdornment,
  IconButton,
  Paper,
  useMediaQuery
} from "@mui/material";
import {useRouter} from "next/router";
import {AdminLayout} from "../../../../components/layouts";
import NextLink from 'next/link';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import {axiosInstance, parseCookie} from "../../../../utils";
import {useSnackbar} from "notistack";
import {GetServerSideProps} from "next";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {encryptValue, decryptValue, masterCryptoKey} from '../../../../utils'
import * as yup from "yup";
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {RHFSelect} from "../../../../components/ui/forms";

interface FormValues {
  birthday: string,
  username: string,
  city: string,
  email: string,
  id: number | null,
  state: string,
  userType: string,
  password: string,
  profession: string,
  socialFacebook: string,
  company: string,
  socialInstagram: string,
  socialTwitter: string,
  socialYoutube: string,
  phonNumber1: string,
  phonNumber2: string,
  imageData: string,
  imageType: string,
  lastName: string,
  firstName: string,
  fiscalAddress: string
}

const schema = yup.object({
  birthday: yup.string().required('Este campo es requerido'),
  username: yup.string().required('Este campo es requerido'),
  city: yup.string().required('Este campo es requerido'),
  company: yup.string().required('Este campo es requerido'),
  email: yup.string().required('Este campo es requerido'),
  state: yup.string().required('Este campo es requerido'),
  userType: yup.string().required('Este campo es requerido'),
  password: yup.string().required('Este campo es requerido'),
  profession: yup.string().required('Este campo es requerido'),
  socialFacebook: yup.string(),
  socialInstagram: yup.string(),
  socialTwitter: yup.string(),
  socialYoutube: yup.string(),
  phonNumber1: yup.string().required('Este campo es requerido'),
  phonNumber2: yup.string(),
  imageData: yup.string(),
  imageType: yup.string(),
  lastName: yup.string().required('Este campo es requerido'),
  firstName: yup.string().required('Este campo es requerido'),
  fiscalAddress: yup.string().required('Este campo es requerido')
}).required();
export default function EditOwnerPage() {
  const router = useRouter();
  const id = router.query?.id;
  const {enqueueSnackbar} = useSnackbar()
  const {
    register,
    handleSubmit,
    formState: {errors},
    setValue,
    control,
    watch
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues: {
      company: 'Vision Inmobiliaria'
    }
  });
  const onSubmit = handleSubmit((data) => editUser(data));
  const firstNameWatched = watch('firstName');
  const lastNameWatched = watch('lastName');
  const phoneWatched = watch('phonNumber1');
  const companyWatched = watch('company');
  const emailWatched = watch('email');
  const userNameWatched = watch('username');
  const userTypeWatched = watch('userType');
  const largeScreen = useMediaQuery((theme: any) => theme.breakpoints.up('md'));
  const [loading, setLoading] = React.useState<boolean>(false)
  const [loadingData, setLoadingData] = React.useState<boolean>(true)
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [image, setImage] = React.useState<string>('')

  async function getUserById() {
    try {
      const response = await axiosInstance.get(`user/getById?id=${id}`);
      if (response.status === 200 && response.data.recordset.length > 0) {
        const {
          first_name,
          last_name,
          phone_number1,
          phone_number2,
          profession,
          social_facebook,
          social_instagram,
          social_twitter,
          social_youtube,
          state,
          city,
          fiscal_address,
          username,
          password,
          email,
          birthday,
          image,
          user_type,

        } = response.data.recordset[0];
        setValue('socialFacebook', social_facebook, {});
        setValue('socialInstagram', social_instagram, {});
        setValue('socialTwitter', social_twitter, {});
        setValue('socialYoutube', social_youtube, {});
        setValue('profession', profession, {});
        setValue('city', city, {});
        setValue('state', state, {});
        setValue('imageData', image, {});
        setValue('password', decryptValue(masterCryptoKey, password), {});
        setValue('userType', user_type, {});
        setValue('username', username, {});
        setValue('firstName', first_name, {});
        setValue('lastName', last_name, {});
        setValue('phonNumber1', phone_number1, {});
        setValue('phonNumber2', phone_number2, {});
        setValue('email', email, {});
        setValue('birthday', birthday, {});
        setValue('fiscalAddress', fiscal_address, {});
      }
    } catch (err) {
      console.log(err);
      enqueueSnackbar(`Error ${JSON.stringify(err)}`, {variant: 'error'})
    } finally {
      setLoadingData(false);
    }
  }

  async function editUser(data: any) {
    const fullObj = {...data};
    fullObj.password = encryptValue(masterCryptoKey, data.password)
    fullObj.id = null;
    try {
      setLoading(true);
      const response = await axiosInstance.put('user/updateData', fullObj);
      if (response.status === 200) {
        router.back()
        enqueueSnackbar('Se edito el usuario con exito!', {variant: 'success'})
      }
    } catch (e) {
      enqueueSnackbar('Error!', {variant: 'error'})
    } finally {
      setLoading(false);
    }
  }

  function handleImageUpload(e: any) {
    const {files} = e.target;
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = () => {
      setImage(JSON.stringify(reader.result));
      setValue('imageType', files[0].type);
      setValue('imageData', files[0]);
    }
  }

  React.useEffect(() => {
    getUserById()
  }, [])

  return (
    <AdminLayout title='Editar usuario | Vision inmobiliaria'>
      <>
        {loadingData && <p>Cargando...</p>}
        {
          !loadingData &&
          <>
            {/*TODO hacer un componente de breadcrumb*/}
            <Box display='flex' alignItems='center'>
              <NextLink href='/admin/usuarios'>Usuarios</NextLink>
              <ArrowRightIcon sx={{color: 'gray'}}/>
              <Typography> Editar usuario</Typography>
            </Box>
            <form onSubmit={onSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={8}>
                  <Container maxWidth='md' sx={{py: 5}}>
                    <Typography variant='h5' color='secondary.light'>Datos de usuario</Typography>
                    <Box display='flex' flexDirection='column' alignItems='center'>
                      <Box
                        component='img'
                        width={100}
                        height={100}
                        borderRadius={100}
                        src={image ? image : '/images/no-image.jpg'}
                        onError={({currentTarget}) => {
                          currentTarget.onerror = null;
                          currentTarget.src = '/images/no-image.jpg'
                        }}
                      />
                      <Button component="label" sx={{mt: 2}}>
                        Subir Fotografia
                        <input hidden accept="image/*" type="file" onChange={handleImageUpload}/>
                      </Button>
                    </Box>
                    <Divider sx={{borderWidth: '2px', my: 3}}/>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          sx={{mt: 2}}
                          placeholder='Empresa'
                          {...register('company')}
                          disabled
                          label='Empresa'
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          sx={{mt: 2}}
                          placeholder='Email'
                          {...register('email')}
                          error={Boolean(errors?.email)}
                          label='Email'
                          variant="outlined"
                        />
                        <Typography variant='caption' fontWeight='bold'
                                    sx={{color: '#FF0000'}}>{errors?.email?.message}</Typography>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          sx={{mt: 2}}
                          placeholder='Nombre de usuario'
                          label='Nombre de usuario'
                          variant="outlined"
                          {...register('username')}
                          error={Boolean(errors?.username)}
                        />
                        <Typography variant='caption' fontWeight='bold'
                                    sx={{color: '#FF0000'}}>{errors?.username?.message}</Typography>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          type={showPassword ? 'text' : 'password'}
                          sx={{mt: 2}}
                          placeholder='Clave'
                          label='Clave'
                          variant="outlined"
                          {...register('password')}
                          error={Boolean(errors?.password)}
                          InputProps={{
                            endAdornment:
                              <InputAdornment position="end">
                                <IconButton onClick={() => setShowPassword(!showPassword)}>
                                  {showPassword ? (<VisibilityOffIcon/>) : (<VisibilityIcon/>)}
                                </IconButton>
                              </InputAdornment>,
                          }}
                        />
                        <Typography variant='caption' fontWeight='bold'
                                    sx={{color: '#FF0000'}}>{errors?.password?.message}</Typography>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          sx={{mt: 2}}
                          placeholder='Nombres'
                          label='Nombres'
                          variant="outlined"
                          {...register('firstName')}
                          error={Boolean(errors?.firstName)}
                        />
                        <Typography variant='caption' fontWeight='bold'
                                    sx={{color: '#FF0000'}}>{errors?.firstName?.message}</Typography>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          sx={{mt: 2}}
                          placeholder='Apellidos'
                          label='Apellidos'
                          variant="outlined"
                          {...register('lastName')}
                          error={Boolean(errors?.lastName)}
                        />
                        <Typography variant='caption' fontWeight='bold'
                                    sx={{color: '#FF0000'}}>{errors?.lastName?.message}</Typography>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Box mt={2}>
                          <TextField
                            fullWidth
                            sx={{mt: 2}}
                            placeholder='Numero de telefono'
                            label='Numero de telefono'
                            {...register('phonNumber1')}
                            error={Boolean(errors?.phonNumber1)}
                            variant="outlined"
                          />
                          <Typography variant='caption' fontWeight='bold'
                                      sx={{color: '#FF0000'}}>{errors?.phonNumber1?.message}</Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Box mt={2}>
                          <TextField
                            fullWidth
                            sx={{mt: 2}}
                            placeholder='Numero de telefono (secundario)'
                            label='Numero de telefono (secundario)'
                            variant="outlined"
                            {...register('phonNumber2')}
                            error={Boolean(errors?.phonNumber2)}
                          />
                          <Typography variant='caption' fontWeight='bold'
                                      sx={{color: '#FF0000'}}>{errors?.phonNumber2?.message}</Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <RHFSelect
                          name='userType'
                          label='Tipo de usuario'
                          defaultValue={'Administrador'}
                          control={control}
                        >
                          <MenuItem value='Administrador'>Administrador</MenuItem>
                          <MenuItem value='Coordinador de servicios'>Coordinador de servicios</MenuItem>
                          <MenuItem value='Asesor inmobiliario Vision'>Asesor inmobiliario Vision</MenuItem>
                          <MenuItem value='Asesor inmobiliario externo'>Asesor inmobiliario externo</MenuItem>
                        </RHFSelect>
                        <Typography variant='caption' fontWeight='bold'
                                    sx={{color: '#FF0000'}}>{errors?.userType?.message}</Typography>
                      </Grid>


                    </Grid>
                  </Container>
                  <Divider sx={{borderWidth: '2px', my: 3}}/>
                  <Container maxWidth='md' sx={{py: 5}}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <Typography sx={{marginBottom: '4px'}}>Fecha de nacimiento</Typography>
                        <TextField
                          fullWidth
                          type='date'
                          {...register('birthday')}
                          error={Boolean(errors?.birthday)}
                          variant="outlined"
                        />
                        <Typography variant='caption' fontWeight='bold'
                                    sx={{color: '#FF0000'}}>{errors?.birthday?.message}</Typography>
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          sx={{mt: 3}}
                          placeholder='Profesion'
                          label='Profesion'
                          {...register('profession')}
                          error={Boolean(errors?.profession)}
                          variant="outlined"
                        />
                        <Typography variant='caption' fontWeight='bold'
                                    sx={{color: '#FF0000'}}>{errors?.profession?.message}</Typography>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          rows={3}
                          sx={{mt: 2}}
                          placeholder='Municipio'
                          {...register('city')}
                          error={Boolean(errors?.city)}
                          label='Municipio'
                          variant="outlined"
                        />
                        <Typography variant='caption' fontWeight='bold'
                                    sx={{color: '#FF0000'}}>{errors?.city?.message}</Typography>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          sx={{mt: 2}}
                          {...register('state')}
                          error={Boolean(errors?.state)}
                          placeholder='Estado'
                          label='Estado'
                          variant="outlined"
                        />
                        <Typography variant='caption' fontWeight='bold'
                                    sx={{color: '#FF0000'}}>{errors?.state?.message}</Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          rows={4}
                          sx={{mt: 2}}
                          multiline
                          {...register('fiscalAddress')}
                          error={Boolean(errors?.fiscalAddress)}
                          placeholder='Direccion fiscal'
                          label='Direccion fiscal'
                          variant="outlined"
                        />
                        <Typography variant='caption' fontWeight='bold'
                                    sx={{color: '#FF0000'}}>{errors?.fiscalAddress?.message}</Typography>
                      </Grid>


                    </Grid>
                  </Container>
                  <Divider sx={{borderWidth: '2px', my: 3}}/>
                  <Container maxWidth='md' sx={{py: 5}}>
                    <Typography variant='h5' color='secondary.light'>Social</Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={3}>
                        <TextField
                          sx={{mt: 2}}
                          placeholder='Facebook'
                          label='Facebook'
                          {...register('socialFacebook')}
                          error={Boolean(errors?.socialFacebook)}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <TextField
                          sx={{mt: 2}}
                          placeholder='Instagram'
                          label='Instagram'
                          {...register('socialInstagram')}
                          error={Boolean(errors?.socialInstagram)}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <TextField
                          sx={{mt: 2}}
                          placeholder='Twitter'
                          label='Twitter'
                          {...register('socialTwitter')}
                          error={Boolean(errors?.socialTwitter)}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <TextField
                          sx={{mt: 2}}
                          placeholder='Youtube'
                          label='Youtube'
                          {...register('socialYoutube')}
                          error={Boolean(errors?.socialYoutube)}
                          variant="outlined"
                        />
                      </Grid>
                    </Grid>

                    <Grid item xs={12} sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      mt: 5,
                      flexWrap: 'wrap',
                      flexDirection: largeScreen ? 'row' : 'column-reverse'
                    }}>
                      <Button
                        sx={{mt: !largeScreen ? 3 : 0}}
                        fullWidth={!largeScreen}
                        onClick={() => router.back()}
                        variant='outlined'
                      >
                        Cancelar
                      </Button>
                      <Button
                        disabled={loading}
                        fullWidth={!largeScreen}
                        type='submit'
                        variant='contained'
                      >
                        Registrar usuario
                      </Button>
                    </Grid>
                  </Container>
                </Grid>
                {/* user card*/}
                <Grid item xs={12} md={4}>
                  <Paper elevation={3} sx={{mt: 5, position: largeScreen ? 'fixed' : 'auto'}}>
                    <Box component='img' src='/images/card-back-1.png' width='100%' height='100%'/>
                    <Box display='flex' justifyContent='center'>
                      <Box
                        component='img'
                        width={100}
                        height={100}
                        sx={{marginTop: -7}}
                        borderRadius={100}
                        src={image ? image : '/images/no-image.jpg'}
                        onError={({currentTarget}) => {
                          currentTarget.onerror = null;
                          currentTarget.src = '/images/no-image.jpg'
                        }}
                      />
                    </Box>
                    <Box p={2}>
                      <Box mb={2}>
                        <Typography variant='h4'>{firstNameWatched} {lastNameWatched}</Typography>
                        <Typography variant='caption'>{userTypeWatched}</Typography>
                      </Box>
                      <Typography variant='h6'>{userNameWatched}</Typography>
                      <Typography>{phoneWatched}</Typography>
                      <Typography>{emailWatched}</Typography>
                      <Typography sx={{mt: 2}} color='primary' fontWeight='bold' letterSpacing={1}
                                  align='center'>{companyWatched}</Typography>
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
            </form>
          </>
        }
      </>

    </AdminLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({req}) => {
  if (!parseCookie('isAuthenticated', req.headers.cookie!)) {
    return {
      redirect: {
        destination: '/autenticacion/login',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}




