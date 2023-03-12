import React from 'react';
import {axiosInstance} from "../../../../utils";
import {useSnackbar} from "notistack";
import {useRouter} from "next/router";
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from "@mui/icons-material/Add";
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
  useMediaQuery
  , Typography
} from "@mui/material";
import {PropertiesTable} from "./PropertiesTable";
import {PropertiesFiltersDrawer} from "./PropertiesFilterDrawer";
import axios from 'axios';

export function PropertiesList() {
  const [loading, setLoading] = React.useState<boolean>(false);
  const largeScreen = useMediaQuery((theme: any) => theme.breakpoints.up('md'))
  const [page, setPage] = React.useState<number>(1);
  const [searchTerm, setSearchTerm] = React.useState('')
  const router = useRouter();
  const [filtersDrawer, setFiltersDrawer] = React.useState(false);
  const [properties, setProperties] = React.useState<any>([]);
  const [owners, setOwners] = React.useState<any>([]);
  const [filtersData, setFiltersData] = React.useState<any>({
    filters: [],
    pageNumber: 1,
    pageSize: 5
  });
  const {enqueueSnackbar} = useSnackbar();

  async function getProperties(data: any) {
    try {
      setLoading(true);
      // const response = await axiosInstance.post('/property/getallDataFilter', data);
      const response = await axios.post('/api/properties', data);
      if (response.status === 200) {
        setProperties(response.data)
      }
    } catch (err) {
      enqueueSnackbar(`Error ${JSON.stringify(err)}`, {variant: 'error'})
    } finally {
      setLoading(false);
    }
  }

  async function getOwners() {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/owner/getAllData?type=Propietarios');
      if (response.status === 200) {
        setOwners(response.data)
      }
    } catch (err) {
      enqueueSnackbar(`Error ${JSON.stringify(err)}`, {variant: 'error'})
    } finally {
      setLoading(false);
    }
  }

  async function deleteProperty(id: number) {
    try {
      const response = await axiosInstance.delete(`/property/deleteData?id=${id}`)
      if (response.status === 200) {
        // dispatch(removeProperty(id))
        await getProperties(filtersData)
        enqueueSnackbar('Se elimino la propiedad con exito!', {variant: 'success'})
      }
    } catch (err) {
      enqueueSnackbar('No se pudo eliminar la propiedad, ocurrio un error!', {variant: 'error'})
    }
  }

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const applyFilters = () => {
    setFiltersDrawer(false);
    getProperties(filtersData)
  }

  React.useEffect(() => {
    getProperties(filtersData);
  }, [])

  React.useEffect(() => {
    getOwners()
  }, [])

  const handleSelectFilter = (code: any, value: any) => {
    const filters = [...filtersData.filters];
    if (value === null) {
      if (filters.length === 1) {
        filters.pop();
      }
      const removed = filters.findIndex(x => x.parameter === code);
      filters.splice(removed, 1);
    } else if (filters.filter(x => x.parameter === code)[0]) {
      const index = filters.findIndex(x => x.parameter === code);
      filters.splice(index, 1);
      filters.push(value);
    } else {
      filters.push(value);
    }
    setFiltersData((prevState: any) => ({
      ...prevState,
      filters,
    }))
  }
  return (
    <Box sx={{width: '100%', p: 2}}>
      <Box p={2}>
        <Box display='flex' flexWrap='wrap' alignItems='center' mb={2}>
          <Typography variant='h2'>Propiedades</Typography>
          <Typography sx={{mx: 2}} color='gray'>10 propiedades registradas</Typography>
        </Box>
        <Grid container sx={{ mb: 2 }}>
          <Grid item xs={12} md={6}>
            <TextField
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{width: '100%'}}
              id="search-textfield"
              placeholder="Buscar por codigo de inmueble"
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
            <Button fullWidth={!largeScreen} variant='contained' color='primary'
                    sx={{display: 'flex', mt: !largeScreen ? 2 : 0}} onClick={() => router.push('/admin/propiedades/crear')}>
              <AddIcon/>
              propiedad
            </Button>
          </Grid>
        </Grid>
        <Badge badgeContent={filtersData.filters.length} color="primary">
          <Button fullWidth={!largeScreen} size="small" onClick={() => setFiltersDrawer(true)}
                  sx={{display: 'flex'}}>
            <FilterAltIcon/>
            Filtros
          </Button>
        </Badge>

      </Box>
      <Box sx={{width: '100%'}}>
        {loading && <LinearProgress/>}
      </Box>
    {/*  Properties Table*/}
      <PropertiesTable properties={properties} loading={loading} owners={owners} />
      {
        (!properties.data || properties.data.length) < 1 &&
        <Box sx={{height: '50vh', display: 'flex', justifyContent: 'center', width: '100%', alignItems: 'center'}}>
          <Typography>No se encontradon propiedades...</Typography>
        </Box>
      }
      <Box sx={{display: 'flex', justifyContent: 'end', pt: 5}}>
        <Pagination
          boundaryCount={1}
          count={Math.round(10 / 10)}
          defaultPage={1}
          onChange={handleChangePage}
          page={page}
          showFirstButton
          showLastButton
        />
      </Box>
      <PropertiesFiltersDrawer
        open={filtersDrawer}
        filters={filtersData.filters}
        applyFilters={() => applyFilters()}
        closeAction={() => setFiltersDrawer(false)}
        selectFilter={handleSelectFilter}
        largeScreen={largeScreen}
      />
    </Box>
  )
}
