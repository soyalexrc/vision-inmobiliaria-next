import React from 'react';
import { AdminLayout } from '../../../../components/layouts';
import { Box, Typography, Grid, Button, TextField, InputAdornment, IconButton, useMediaQuery } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from 'next/router';
import { OwnersTable } from '../../../../components/ui/admin/owners';
import { axiosInstance, parseCookie } from '../../../../utils';
import { useSnackbar } from 'notistack';
import { GetServerSideProps } from 'next';
import axios from 'axios';

export default function OwnersListPage() {
  const { enqueueSnackbar } = useSnackbar();
  const largeScreen = useMediaQuery((theme: any) => theme.breakpoints.up('md'));
  const [searchTerm, setSearchTerm] = React.useState<string>('');
  const [loading, setLoading] = React.useState<boolean>(false);
  const [owners, setOwners] = React.useState<any>([]);
  const router = useRouter();

  async function getOwners() {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/owner/getAllData?type=Propietarios');
      if (response.status === 200) {
        setOwners(response.data);
      }
    } catch (err) {
      enqueueSnackbar(`Error ${JSON.stringify(err)}`, { variant: 'error' });
    } finally {
      setLoading(false);
    }
  }
  async function deleteOwner(id: number | string) {
    try {
      setLoading(true);
      const response = await axiosInstance.delete(`/owner/deleteData?id=${id}`);
      if (response.status === 200) {
        enqueueSnackbar('Se elimino el propietario con exito!', { variant: 'success' });
        getOwners();
      }
    } catch (e) {
      enqueueSnackbar('Error!', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    getOwners();
  }, []);

  return (
    <AdminLayout title="Propietarios - Vision Inmobiliaria">
      <Box p={2}>
        <Box display="flex" alignItems="center" mb={2}>
          <Typography variant="h2">Propietarios</Typography>
          <Typography sx={{ mx: 2 }} color="gray">
            {owners.length} propietarios registrados
          </Typography>
        </Box>
        <Grid container>
          <Grid item xs={12} md={6}>
            <TextField
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ width: '100%' }}
              id="search-textfield"
              placeholder="Buscar por nombre o email"
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              fullWidth={!largeScreen}
              variant="contained"
              color="primary"
              sx={{ display: 'flex', mt: !largeScreen ? 2 : 0 }}
              onClick={() => router.push('/admin/propietarios/crear')}
            >
              <AddIcon />
              Propietario
            </Button>
          </Grid>
        </Grid>

        {/*  Table*/}
        <OwnersTable owners={owners} loading={loading} deleteOwner={deleteOwner} />
      </Box>
    </AdminLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  if (!parseCookie('isAuthenticated', req.headers.cookie!)) {
    return {
      redirect: {
        destination: '/autenticacion/login',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
