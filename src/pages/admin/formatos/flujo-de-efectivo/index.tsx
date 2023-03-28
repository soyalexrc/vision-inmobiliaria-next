import React from 'react';
import {AdminLayout} from "../../../../../components/layouts";
import {
  Badge,
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Tab,
  Tabs,
  TextField,
  Typography,
  useMediaQuery
} from "@mui/material";
import {a11yProps, TabPanel} from "../../../../../components/ui/tabs";
import {CashFlowChart, CashFlowList, CashFlowFilterDrawer} from "../../../../../components/ui/admin/formats";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import {useRouter} from "next/router";
import {FormatCashFlow} from "../../../../../interfaces";
import {axiosInstance} from "../../../../../utils";
import {useSnackbar} from "notistack";

export default function CashFlowPage() {
  const [tab, setTab] = React.useState<number>(0)
  const [searchTerm, setSearchTerm] = React.useState('')
  const router = useRouter();
  const largeScreen = useMediaQuery((theme: any) => theme.breakpoints.up('md'))
  const [data, setData] = React.useState<FormatCashFlow[]>([]);
  const [filtersData, setFiltersData] = React.useState<any>({
    filters: [],
    pageNumber: 1,
    pageSize: 5
  });
  const [filtersDrawer, setFiltersDrawer] = React.useState(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const {enqueueSnackbar} = useSnackbar()

  const applyFilters = () => {
    setFiltersDrawer(false);
    getProperties()
  }
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  async function deleteData(id: number | string) {
    try {
      setLoading(true);
      const response = await axiosInstance.delete(`format/cashFlow/deleteData?id=${id}`);
      if (response.status === 200) {
        enqueueSnackbar('Se elimino el aliado con exito!', {variant: 'success'} )
        getProperties()
      }
    } catch (e) {
      enqueueSnackbar('Error!', {variant: 'error'} )
    } finally {
      setLoading(false);
    }
  }

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

  async function getProperties() {
    try {
      setLoading(true);
      const response = await axiosInstance.get('format/cashFlow/getAllData');
      if (response.status === 200) {
        setData(response.data)
      }
    } catch (err) {
      enqueueSnackbar(`Error ${JSON.stringify(err)}`, { variant: 'error' })
    } finally {
      setLoading(false);
    }
  }



  React.useEffect(() => {
    getProperties();
  }, [])

  return (
    <AdminLayout title='Formato de flujo de efectivo | Vision inmobiliaria'>
      <>
        <Box p={2}>
          <Box display='flex' flexWrap='wrap' alignItems='center' mb={2}>
            <Typography variant='h2'>Formato de flujo de efectivo</Typography>
            <Typography sx={{mx: 2}} color='gray'>{data.length} registros</Typography>
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
                      sx={{display: 'flex', mt: !largeScreen ? 2 : 0}} onClick={() => router.push('/admin/formatos/flujo-de-efectivo/crear')}>
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
        <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
          <Tabs value={tab} onChange={handleChange} aria-label="panel de flujo de efectivo" centered>
            <Tab label="Tabla" {...a11yProps(0)} />
            <Tab label="Grafico" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={tab} index={0}>
          {/*tabla*/}
          <CashFlowList data={data} loading={loading} getProperties={getProperties} />
        </TabPanel>
        <TabPanel value={tab} index={1}>
          {/*grafioo*/}
          <CashFlowChart />
        </TabPanel>
        <CashFlowFilterDrawer
          open={filtersDrawer}
          filters={filtersData.filters}
          applyFilters={() => applyFilters()}
          closeAction={() => setFiltersDrawer(false)}
          selectFilter={handleSelectFilter}
          largeScreen={largeScreen}
        />
      </>
    </AdminLayout>
  )
}
