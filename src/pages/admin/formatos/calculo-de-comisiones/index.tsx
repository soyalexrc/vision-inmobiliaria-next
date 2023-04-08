import React from 'react';
import {AdminLayout} from "../../../../../components/layouts";
import {Box, Button, Divider, Grid, IconButton, Tab, Tabs, Typography, useMediaQuery} from "@mui/material";
import {CommissionCalculationList, CommissionCalculationChart} from "../../../../../components/ui/admin/formats";
import {a11yProps, TabPanel} from "../../../../../components/ui/tabs";
import {FilterDrawer} from "../../../../../components/ui/admin";
import CloseIcon from "@mui/icons-material/Close";
import {RHFAutocomplete} from "../../../../../components/ui/forms";
import {axiosInstance, MONTHS} from "../../../../../utils";
import {SERVICE_OPTIONS, TYPE_OF_PROPERTY} from "../../../../../utils/properties";
import {useForm} from "react-hook-form";
import {useSnackbar} from "notistack";
import {FormatCommissionCalculation} from "../../../../../interfaces";

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

export default function CommissionCalculationPage() {
  const [tab, setTab] = React.useState<number>(0)
  const [filtersDrawer, setFiltersDrawer] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState<FormatCommissionCalculation[]>([])
  const [currentFiltersAmount, setCurrentFiltersAmount] = React.useState<number>(0);
  const [searchTerm, setSearchTerm] = React.useState<string>('');
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
  const largeScreen = useMediaQuery((theme: any) => theme.breakpoints.up('md'))


  const applyFilters = (data: FormValues) => {
    const rawFilters = {
      filters: Object.values(data).filter((ftr: filterData) => ftr.value )
    };
    evaluateQtyFilters()
    if (rawFilters.filters.length < 1) {
      getData()
    } else {
      getDataWithFilter(rawFilters)
    }
  }

  function evaluateQtyFilters() {
    const filtersQty = Object.values(getValues())?.filter((ftr: filterData) => ftr.value);
    setCurrentFiltersAmount(filtersQty.length)
    setFiltersDrawer(false)
  }

  async function getData() {
    try {
      setLoading(true);
      const response = await axiosInstance.get('format/commission/getAllData');
      if (response.status === 200) {
        setData(response.data)
      }
    } catch (err) {
      enqueueSnackbar(`Error ${JSON.stringify(err)}`, {variant: 'error'})
    } finally {
      setLoading(false);
    }
  }

  async function getDataWithFilter(filters: any) {
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

  async function deleteData(id: number | string) {
    try {
      setLoading(true);
      const response = await axiosInstance.delete(`format/commission/deleteData?id=${id}`);
      if (response.status === 200) {
        enqueueSnackbar('Se elimino el aliado con exito!', {variant: 'success'})
        getData()
      }
    } catch (e) {
      enqueueSnackbar('Error!', {variant: 'error'})
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    getData()
  }, [])


  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };
  return (
    <AdminLayout title='Formato de calculo de comisisones | Vision inmobiliaria'>
      <>
        <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
          <Tabs value={tab} onChange={handleChange} aria-label="panel de propiedades y atributos" centered>
            <Tab label="Tabla" {...a11yProps(0)} />
            <Tab label="Grafico" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={tab} index={0}>
          {/*tabla*/}
          <CommissionCalculationList
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
          {/*grafico*/}
          <CommissionCalculationChart />
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
