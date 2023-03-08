import React from 'react';
import {AdminLayout} from "../../../../components/layouts";
import {
  Box,
  Typography,
  Grid,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  useMediaQuery
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from "@mui/icons-material/Add";
import {useRouter} from 'next/router';
import {axiosInstance, parseCookie} from "../../../../utils";
import {useSnackbar} from "notistack";
import {GetServerSideProps} from "next";
import {AdvisersTable} from "../../../../components/ui/admin/advisers";
import axios from "axios";

export default function AdvisersListPage() {
  const {enqueueSnackbar}  = useSnackbar()
  const largeScreen = useMediaQuery((theme: any) => theme.breakpoints.up('md'))
  const [searchTerm, setSearchTerm] = React.useState<string>('')
  const [loading, setLoading] = React.useState<boolean>(false)
  const [advisers, setAdvisers ] = React.useState<any>([])
  const router = useRouter()

  async function getAdvisers() {
    try {
      setLoading(true);
      const response = await axios.get('/api/external-advisers?type=Asesores%20Externos');
      if (response.status === 200) {
        setAdvisers(response.data)
      }
    } catch (err) {
      enqueueSnackbar(`Error ${JSON.stringify(err)}`, { variant: 'error' })
    } finally {
      setLoading(false);
    }
  }
  async function deleteAdviser(id: number | string) {
    try {
      setLoading(true);
      const response = await axios.delete(`/api/external-advisers/${id}`);
      if (response.status === 200) {
        enqueueSnackbar('Se elimino el asesor con exito!', {variant: 'success'} )
        getAdvisers()
      }
    } catch (e) {
      enqueueSnackbar('Error!', {variant: 'error'} )
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    getAdvisers()
  }, [])

  return (
    <AdminLayout title='Propietarios - Vision Inmobiliaria'>
      <Box p={2}>
        <Box display='flex' alignItems='center' mb={2}>
          <Typography variant='h2'>Asesores externos</Typography>
          <Typography sx={{mx: 2}} color='gray'>10 Asesores registrados</Typography>
        </Box>
        <Grid container>
          <Grid item xs={12} md={6}>
            <TextField
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)
              }
              sx={{width: '100%'}}
              id="search-textfield"
              placeholder="Buscar por nombre o email"
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton>
                      <SearchIcon/>
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={6} sx={{display: 'flex', justifyContent: 'flex-end'}}>
            <Button
              fullWidth={!largeScreen}
              variant='contained'
              color='primary'
              sx={{display: 'flex', mt: !largeScreen ? 2 : 0}}
              onClick={() => router.push('/admin/asesores-externos/crear')}
            >
              <AddIcon/>
              Asesor
            </Button>
          </Grid>
        </Grid>

      {/*  Table*/}
        <AdvisersTable advisers={advisers} loading={loading} deleteAdviser={deleteAdviser} />
      </Box>
    </AdminLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async({req}) => {
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
