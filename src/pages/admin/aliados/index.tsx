import React from 'react';
import { AdminLayout } from '../../../../components/layouts';
import { Box, Typography, Grid, Button, TextField, InputAdornment, IconButton, useMediaQuery } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from 'next/router';
import { AlliesTable } from '../../../../components/ui/admin/allies';
import { axiosInstance, parseCookie } from '../../../../utils';
import { useSnackbar } from 'notistack';
import { GetServerSideProps } from 'next';
import axios from 'axios';

export default function AlliesListPage() {
  const { enqueueSnackbar } = useSnackbar();
  const largeScreen = useMediaQuery((theme: any) => theme.breakpoints.up('md'));
  const [searchTerm, setSearchTerm] = React.useState<string>('');
  const [loading, setLoading] = React.useState<boolean>(false);
  const [allies, setAllies] = React.useState<any>([]);
  const router = useRouter();

  async function getAllies() {
    try {
      setLoading(true);
      const response = await axiosInstance.get('owner/getAllData?type=Aliados');
      if (response.status === 200) {
        setAllies(response.data);
      }
    } catch (err) {
      enqueueSnackbar(`Error ${JSON.stringify(err)}`, { variant: 'error' });
    } finally {
      setLoading(false);
    }
  }
  async function deleteAlly(id: number | string) {
    try {
      setLoading(true);
      const response = await axiosInstance.delete(`owner/deleteData?id=${id}`);
      if (response.status === 200) {
        enqueueSnackbar('Se elimino el aliado con exito!', { variant: 'success' });
        getAllies();
      }
    } catch (e) {
      enqueueSnackbar('Error!', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    getAllies();
  }, []);

  return (
    <AdminLayout title="Aliados - Vision Inmobiliaria">
      <Box p={2}>
        <Box display="flex" alignItems="center" mb={2}>
          <Typography variant="h2">Aliados</Typography>
          <Typography sx={{ mx: 2 }} color="gray">
            {allies.length} aliados registrados
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
              onClick={() => router.push('/admin/aliados/crear')}
            >
              <AddIcon />
              Aliado
            </Button>
          </Grid>
        </Grid>

        {/*  Table*/}
        <AlliesTable allies={allies} loading={loading} deleteAlly={deleteAlly} />
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
