import React from 'react';
import {AdminLayout} from "../../../../components/layouts";
import {GetServerSideProps} from "next";
import {parseCookie} from "../../../../utils";
import axios from 'axios';
import {Box, Button, Grid, IconButton, InputAdornment, TextField, Typography, useMediaQuery} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import {UsersTable} from "../../../../components/ui/admin/users";
import {useSnackbar} from "notistack";
import {useRouter} from "next/router";

export default function UsersListPage() {
  const {enqueueSnackbar}  = useSnackbar()
  const largeScreen = useMediaQuery((theme: any) => theme.breakpoints.up('md'))
  const [searchTerm, setSearchTerm] = React.useState<string>('')
  const [loading, setLoading] = React.useState<boolean>(false)
  const [users, setUsers ] = React.useState<any>([])
  const router = useRouter()

  async function getUsers() {
    try {
      setLoading(true);
      const response = await axios.get('/api/users');
      if (response.status === 200) {
        setUsers(response.data)
      }
    } catch (err) {
      enqueueSnackbar(`Error ${JSON.stringify(err)}`, { variant: 'error' })
    } finally {
      setLoading(false);
    }
  }
  async function deleteOwner(id: number | string) {
    try {
      setLoading(true);
      const response = await axios.delete(`/api/users/${id}`);
      if (response.status === 200) {
        enqueueSnackbar(response.data.message, {variant: 'success'} )
        getUsers()
      }
    } catch (e) {
      enqueueSnackbar('Error!', {variant: 'error'} )
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    getUsers()
  }, [])

  return (
    <AdminLayout title='Usuarios | Vision Inmobiliaria'>
      <Box p={2}>
        <Box display='flex' alignItems='center' mb={2}>
          <Typography variant='h2'>Usuarios</Typography>
          <Typography sx={{mx: 2}} color='gray'>10 usuarios registrados</Typography>
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
              onClick={() => router.push('/admin/usuarios/crear')}
            >
              <AddIcon/>
              Usuario
            </Button>
          </Grid>
        </Grid>

        {/*  Table*/}
        <UsersTable users={users} loading={loading} deleteUser={deleteOwner} />
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
