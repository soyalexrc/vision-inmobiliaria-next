import React from 'react';
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
import {CommissionCalculationTable} from "./";
import {ClientsFilterDrawer} from "./";
import {FORMAT_COMMISSION_CALCULATION, FormatCommissionCalculation} from "../../../../utils/mock-data";

export function CommissionCalculationList() {
  const [loading, setLoading] = React.useState<boolean>(false);
  const largeScreen = useMediaQuery((theme: any) => theme.breakpoints.up('md'))
  const [page, setPage] = React.useState<number>(1);
  const [searchTerm, setSearchTerm] = React.useState('')
  const router = useRouter();
  const [filtersDrawer, setFiltersDrawer] = React.useState(false);
  const [data, setData] = React.useState<FormatCommissionCalculation[]>([]);
  const [filtersData, setFiltersData] = React.useState<any>({
    filters: [],
    pageNumber: 1,
    pageSize: 5
  });

  function getProperties() {
    setData(FORMAT_COMMISSION_CALCULATION)
  }

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const applyFilters = () => {
    setFiltersDrawer(false);
    getProperties()
  }

  React.useEffect(() => {
    getProperties();
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
          <Typography variant='h2'>Formato de calculo de comisiones</Typography>
          <Typography sx={{mx: 2}} color='gray'>10 registros</Typography>
        </Box>
        <Grid container sx={{ mb: 2 }}>
          <Grid item xs={12} md={6}>
            <TextField
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{width: '100%'}}
              id="search-textfield"
              placeholder="Buscar "
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
              registro
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
      <CommissionCalculationTable data={data} loading={loading}  />
      {
        (!data || data.length) < 1 &&
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
      <ClientsFilterDrawer
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
