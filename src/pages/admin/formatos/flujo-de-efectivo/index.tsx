import React from 'react';
import {AdminLayout} from "../../../../../components/layouts";
import {
  Autocomplete,
  Badge,
  Box,
  Button, Divider,
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
import {FilterDrawer} from "../../../../../components/ui/admin";
import {CashFlowChart, CashFlowList, CashFlowFilterDrawer} from "../../../../../components/ui/admin/formats";
import {FormatCashFlow} from "../../../../../interfaces";
import {axiosInstance} from "../../../../../utils";
import {useSnackbar} from "notistack";
import CloseIcon from "@mui/icons-material/Close";
import {useForm} from "react-hook-form";
import {MONTHS} from "../../../../../utils";
import {TYPE_OF_PROPERTY, SERVICE_OPTIONS} from "../../../../../utils/properties";
import {RHFAutocomplete} from "../../../../../components/ui/forms";

interface FormValues {
  month: filterData,
  service: filterData,
  type_of_property: filterData,
  transaction_type: filterData,
  currency: filterData,
  way_to_pay: filterData
}

type filterData = {
  type: string ,
  param: string;
  value: string
}

export default function CashFlowPage() {
  const [tab, setTab] = React.useState<number>(0)
  const [searchTerm, setSearchTerm] = React.useState('')

  const largeScreen = useMediaQuery((theme: any) => theme.breakpoints.up('md'))
  const [data, setData] = React.useState<FormatCashFlow[]>([]);
  const [chartData, setChartData] = React.useState<FormatCashFlow[]>([]);
  const [filtersData, setFiltersData] = React.useState<any[]>([]);
  const [filtersDrawer, setFiltersDrawer] = React.useState(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [currentFiltersAmount, setCurrentFiltersAmount] = React.useState<number>(0);
  const {enqueueSnackbar} = useSnackbar()
  const { register, handleSubmit, control, getValues } = useForm<FormValues>({
    defaultValues: {
      month: {
        param: 'month',
        value: '',
        type: 'EQUAL'
      },
      service: {
        param: 'service',
        value: '',
        type: 'EQUAL'
      },
      type_of_property: {
        param: 'type_of_property',
        value: '',
        type: 'EQUAL'
      },
      way_to_pay: {
        param: 'way_to_pay',
        value: '',
        type: 'EQUAL'
      },
      currency: {
        param: 'currency',
        value: '',
        type: 'EQUAL'
      },
      transaction_type: {
        param: 'transaction_type',
        value: '',
        type: 'EQUAL'
      },
    }
  });
  const onSubmit = handleSubmit((data) => applyFilters(data));

  const applyFilters = (data: FormValues) => {
    const rawFilters = {
      filters: Object.values(data).filter((ftr: filterData) => ftr.value )
    };
    evaluateQtyFilters()
    if (rawFilters.filters.length < 1) {
      getProperties()
    } else {
      getPropertiesWithFilter(rawFilters)
    }
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

  async function getProperties() {
    try {
      setLoading(true);
      const response = await axiosInstance.get('format/cashFlow/getAllData');
      if (response.status === 200) {
        setData(response.data)
        setChartData(response.data);
      }
    } catch (err) {
      enqueueSnackbar(`Error ${JSON.stringify(err)}`, { variant: 'error' })
    } finally {
      setLoading(false);
    }
  }

  async function getPropertiesWithFilter(filters: any) {
    try {
      setLoading(true);
      const response = await axiosInstance.post('format/cashFlow/filterData', filters);
      if (response.status === 200) {
        setData(response.data)
      }
    } catch (err) {
      enqueueSnackbar(`Error ${JSON.stringify(err)}`, { variant: 'error' })
    } finally {
      setLoading(false);
    }
  }

  function evaluateQtyFilters() {
    const filtersQty = Object.values(getValues())?.filter((ftr: filterData) => ftr.value);
    setCurrentFiltersAmount(filtersQty.length)
    setFiltersDrawer(false)
  }

  React.useEffect(() => {
    getProperties();
  }, [])

  return (
    <AdminLayout title='Formato de flujo de efectivo | Vision inmobiliaria'>
      <>
        <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
          <Tabs value={tab} onChange={handleChange} aria-label="panel de flujo de efectivo" centered>
            <Tab label="Tabla" {...a11yProps(0)} />
            <Tab label="Grafico" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={tab} index={0}>
          {/*tabla*/}
          <CashFlowList
            data={data}
            loading={loading}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            largeScreen={largeScreen}
            deleteData={deleteData}
            currentFiltersAmount={currentFiltersAmount}
            setFiltersDrawer={setFiltersDrawer}
          />
        </TabPanel>
        <TabPanel value={tab} index={1}>
          {/*grafioo*/}
          <CashFlowChart data={chartData} loading={loading} />
        </TabPanel>
        <FilterDrawer
          open={filtersDrawer}
          closeAction={evaluateQtyFilters}
        >
          <form onSubmit={onSubmit}>
            <Box sx={{width: largeScreen ? 600 : 365}}>
              <Box p={2}>
                <Box display='flex' alignItems='center' justifyContent='space-between'>
                  <Typography variant='h5'>
                    Filtros
                  </Typography>
                  <IconButton type='button' onClick={evaluateQtyFilters}>
                    <CloseIcon/>
                  </IconButton>
                </Box>
                <Divider sx={{my: 2}}/>
                <Grid container spacing={2} sx={{mt: 2}}>
                  <Grid item xs={12} md={6}>
                    <Typography variant='h6'>Busqueda por mes</Typography>
                    <RHFAutocomplete
                      name="month.value"
                      control={control}
                      options={MONTHS}
                      getOptionLabel={(option: any) => option || ''}
                      defaultValue={null}
                      label='Filtrar por mes'
                    />
                  </Grid>
                  <Grid item xs={12} md={6}></Grid>

                  <Grid item xs={12} md={6}>
                    <Typography variant='h6'>Tipo de servicio</Typography>
                    <RHFAutocomplete
                      name="service.value"
                      control={control}
                      options={SERVICE_OPTIONS}
                      getOptionLabel={(option: any) => option || ''}
                      defaultValue={null}
                      label='Filtrar por tipo de servicio'
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant='h6'>Tipo de inmueble</Typography>
                    <RHFAutocomplete
                      name="type_of_property.value"
                      control={control}
                      options={TYPE_OF_PROPERTY}
                      getOptionLabel={(option: any) => option || ''}
                      defaultValue={null}
                      label='Filtrar por tipo de inmueble'
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant='h6'>Tipo de transaccion</Typography>
                    <RHFAutocomplete
                      name="transaction_type.value"
                      control={control}
                      options={['Ingreso', 'Egreso', 'Ingreso a cuenta de terceros', 'Interbancaria']}
                      getOptionLabel={(option: any) => option || ''}
                      defaultValue={null}
                      label='Filtrar por tipo de transaccion'
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant='h6'>Tipo de moneda</Typography>
                    <RHFAutocomplete
                      name="currency.value"
                      control={control}
                      options={['$ Estados Unidos', 'Bs', 'Euros',]}
                      getOptionLabel={(option: any) => option || ''}
                      defaultValue={null}
                      label='Filtrar por tipo de moneda'
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant='h6'>Forma de pago</Typography>
                    <RHFAutocomplete
                      name="way_to_pay.value"
                      control={control}
                      options={['Efectivo', 'Transferencia', 'Pago Movil', 'Zelle']}
                      getOptionLabel={(option: any) => option || ''}
                      defaultValue={null}
                      label='Filtrar por Forma de pago'
                    />
                  </Grid>
                </Grid>
              </Box>
              <Box sx={{
                position: largeScreen ? 'absolute' : 'relative',
                bottom: 0,
                left: 0,
                right: 0,
                mt: !largeScreen ? 5 : 0
              }}>
                <Button fullWidth size='large' variant='contained' color='secondary' type='submit'>
                  Filtrar
                </Button>
              </Box>
            </Box>
          </form>
        </FilterDrawer>
      </>
    </AdminLayout>
  )
}
