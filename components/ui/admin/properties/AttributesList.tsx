import React from 'react';
import { axiosInstance } from '../../../../utils';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import {
  Box,
  LinearProgress,
  Button,
  Grid,
  Pagination,
  TextField,
  InputAdornment,
  IconButton,
  Badge,
  useMediaQuery,
  Typography,
  TableContainer,
  TableCell,
  TableHead,
  Table,
  TableRow,
  TableBody,
} from '@mui/material';
import { DeleteButton } from '../DeleteButton';
import { UIContext } from '../../../../context/ui';

export function AttributesList() {
  const [loading, setLoading] = React.useState<boolean>(false);
  const largeScreen = useMediaQuery((theme: any) => theme.breakpoints.up('md'));
  const [page, setPage] = React.useState<number>(1);
  const [searchTerm, setSearchTerm] = React.useState('');
  const router = useRouter();
  const [filtersDrawer, setFiltersDrawer] = React.useState(false);
  const [attributes, setAttributes] = React.useState<any>([]);
  const [filtersData, setFiltersData] = React.useState<any>({
    filters: [],
    pageNumber: 1,
    pageSize: 5,
  });
  const { handleAttributesPanel, refreshListener } = React.useContext(UIContext);
  const { enqueueSnackbar } = useSnackbar();

  async function getAttributes() {
    try {
      setLoading(true);
      const response = await axiosInstance.get('attribute/getAllData');
      if (response.status === 200) {
        setAttributes(response.data);
      }
    } catch (err) {
      enqueueSnackbar(`Error ${JSON.stringify(err)}`, { variant: 'error' });
    } finally {
      setLoading(false);
    }
  }

  async function deleteAttribute(id: number) {
    try {
      setLoading(true);
      const response = await axiosInstance.delete(`attribute/deleteData?id=${id}`);
      if (response.status === 200) {
        enqueueSnackbar('Se elimino el atributo con exito!', { variant: 'success' });
        getAttributes();
      }
    } catch (e) {
      enqueueSnackbar('Error!', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  }

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const getCurrentPage = () => {
    return page === 1 ? 0 : page * 10 - 10;
  };

  const getCurrentPageLimit = () => {
    return page === 1 ? 10 : page * 10;
  };

  React.useEffect(() => {
    getAttributes();
  }, []);

  React.useEffect(() => {
    getAttributes();
  }, [refreshListener]);

  const handleSelectFilter = (code: any, value: any) => {
    const filters = [...filtersData.filters];
    if (value === null) {
      if (filters.length === 1) {
        filters.pop();
      }
      const removed = filters.findIndex((x) => x.parameter === code);
      filters.splice(removed, 1);
    } else if (filters.filter((x) => x.parameter === code)[0]) {
      const index = filters.findIndex((x) => x.parameter === code);
      filters.splice(index, 1);
      filters.push(value);
    } else {
      filters.push(value);
    }
    setFiltersData((prevState: any) => ({
      ...prevState,
      filters,
    }));
  };
  return (
    <Box sx={{ width: '100%', p: 2 }}>
      <Box p={2}>
        <Box display="flex" flexWrap="wrap" alignItems="center" mb={2}>
          <Typography variant="h2">Atributos</Typography>
          <Typography sx={{ mx: 2 }} color="gray">
            {attributes.length} atributos registrados
          </Typography>
        </Box>
        <Grid container sx={{ mb: 2 }}>
          <Grid item xs={12} md={6}>
            <TextField
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ width: '100%' }}
              id="search-textfield"
              placeholder="Buscar atributo"
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
              onClick={() => handleAttributesPanel('create')}
            >
              <AddIcon />
              Atributo
            </Button>
          </Grid>
        </Grid>
        <Badge badgeContent={filtersData.filters.length} color="primary">
          <Button fullWidth={!largeScreen} size="small" onClick={() => setFiltersDrawer(true)} sx={{ display: 'flex' }}>
            <FilterAltIcon />
            Filtros
          </Button>
        </Badge>
      </Box>
      <Box sx={{ width: '100%' }}>{loading && <LinearProgress />}</Box>
      <TableContainer>
        <Table>
          <TableHead sx={{ backgroundColor: '#eaeaea' }}>
            <TableRow>
              <TableCell sx={{ color: (theme: any) => theme.palette.common.black, fontWeight: 'bold' }}>Categoria</TableCell>
              <TableCell sx={{ color: (theme: any) => theme.palette.common.black, fontWeight: 'bold' }}>Tipo de formulario</TableCell>
              <TableCell sx={{ color: (theme: any) => theme.palette.common.black, fontWeight: 'bold' }}>Atributo</TableCell>
              <TableCell align="center" sx={{ color: (theme: any) => theme.palette.common.black, fontWeight: 'bold' }}>
                Acciones
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!loading &&
              attributes &&
              attributes.length > 0 &&
              attributes.slice(getCurrentPage(), getCurrentPageLimit()).map((row: any) => (
                <TableRow
                  key={row.id}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                    transition: 'background .2s',
                    '&:hover': {
                      backgroundColor: 'rgba(0,0,0, 0.05)',
                    },
                  }}
                >
                  <TableCell>
                    <Typography>{row.property_type}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{row.form_type}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{row.label.replace(':', '')}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Box display="flex">
                      <IconButton onClick={() => handleAttributesPanel('edit', row)}>
                        <EditIcon />
                      </IconButton>
                      <DeleteButton
                        title="Se eliminara el siguiente atributo"
                        element={`Atributo: ${row.label}`}
                        onClick={() => deleteAttribute(row.id)}
                      />
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {(!attributes.data || attributes.data.length) < 1 && (
        <Box sx={{ height: '50vh', display: 'flex', justifyContent: 'center', width: '100%', alignItems: 'center' }}>
          <Typography>No se encontradon atributos...</Typography>
        </Box>
      )}
      <Box sx={{ display: 'flex', justifyContent: 'end', pt: 5 }}>
        <Pagination
          boundaryCount={1}
          count={Math.ceil(attributes.length / 10)}
          defaultPage={1}
          onChange={handleChangePage}
          page={page}
          showFirstButton
          showLastButton
        />
      </Box>
    </Box>
  );
}
