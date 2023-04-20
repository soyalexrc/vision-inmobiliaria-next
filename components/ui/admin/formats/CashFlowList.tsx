import React from 'react';
import {useRouter} from "next/router";
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from "@mui/icons-material/add";
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
  , Typography, Tabs, Tab, Paper
} from "@mui/material";
import {CashFlowTable} from "./";
import {ClientsFilterDrawer} from "./";
import {FormatCashFlow} from "../../../../interfaces";
import {axiosInstance, formatPrice} from "../../../../utils";
import {useSnackbar} from "notistack";
import {a11yProps, TabPanel} from "../../tabs";

export function CashFlowList({
  data,
  loading,
  deleteData,
  searchTerm,
  setSearchTerm,
  largeScreen,
  currentFiltersAmount,
  setFiltersDrawer,
}: any) {

  const router = useRouter();
  const [tab, setTab] = React.useState<number>(0)
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  function getDataByIncome(d: any) {
    return d.filter((x: any) => x.transaction_type === 'Ingreso')
  }

  function getDataByOutcome(d: any) {
    return d.filter((x: any) => x.transaction_type === 'Egreso')
  }

  function getDataByPendingToCollect(d: any) {
    return d.filter((x: any) => x.transaction_type === 'Cuenta por cobrar')
  }

  function getDataByTotalDue(d: any) {
    return d.filter((x: any) => x.transaction_type === 'Cuenta por pagar')
  }

  function getTotalAmounts(d: any, returnNumber = false) {
    let total = 0
    d.forEach((x: any) => {
      total += Number(x.amount)
    })
    if (returnNumber) return total
    return formatPrice(total);
  }

  function getTotalPendingToCollect(d: any, returnNumber = false) {
    let total = 0
    d.forEach((x: any) => {
      total += Number(x.pending_to_collect)
    })
    if (returnNumber) return total
    return formatPrice(total);
  }

  function getTotalDue(d : any, returnNumber = false) {
    let total = 0
    d.forEach((x: any) => {
      total += Number(x.total_due)
    })
    if (returnNumber) return total
    return formatPrice(total);

  }

  function getUtility(d: any) {
    return formatPrice(+getTotalAmounts(getDataByIncome(d), true) - +getTotalPendingToCollect(d, true))

  }


  return (
    <>
      <Box p={2}>
        <Box display='fllex' justifyContent='space-between' alignItems='center' flexWrap='wrap'>
          <Box display='flex' flexWrap='wrap' alignItems='center' mb={2}>
            <Typography variant='h2'>Formato de flujo de efectivo</Typography>
            <Typography sx={{mx: 2}} color='gray'>{data.length} registros</Typography>
          </Box>
          <Button fullWidth={!largeScreen} variant='contained' color='primary'
                  sx={{display: 'flex', mt: !largeScreen ? 2 : 0, height: 40}} onClick={() => router.push('/admin/formatos/flujo-de-efectivo/crear')}>
            <AddIcon/>
            registro
          </Button>
        </Box>
        <Badge badgeContent={currentFiltersAmount} color="primary">
          <Button fullWidth={!largeScreen} size="small" onClick={() => setFiltersDrawer(true)}
                  sx={{display: 'flex'}}>
            <FilterAltIcon/>
            Filtros
          </Button>
        </Badge>

      </Box>

      <Grid container spacing={2} sx={{display: 'flex', justifyContent: 'center'}}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 4, display: 'flex' }} elevation={2}>
            <Box component='img' width='50px' mr={2} src='/icons/piggy-bank.png' />
            <Box>
              <Typography>Total Ingresos</Typography>
              <Typography variant='h5' fontWeight='bold'>{getTotalAmounts(getDataByIncome(data))}</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 4, display: 'flex' }} elevation={2}>
            <Box component='img' width='50px' mr={2} src='/icons/piggy-bank.png' />
            <Box>
              <Typography>Total Egresos</Typography>
              <Typography variant='h5' fontWeight='bold'>{getTotalAmounts(getDataByOutcome(data))}</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 4, display: 'flex' }} elevation={2}>
            <Box component='img' width='50px' mr={2} src='/icons/piggy-bank.png' />
            <Box>
              <Typography>Utilidad estimada</Typography>
              <Typography variant='h5' fontWeight='bold'>{getUtility(data)}</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 4, display: 'flex' }} elevation={2}>
            <Box component='img' width='50px' mr={2} src='/icons/profit.png' />
            <Box>
              <Typography>Total por Pagar</Typography>
              <Typography variant='h5' fontWeight='bold'>{getTotalDue(data)}</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 4, display: 'flex' }} elevation={2}>
            <Box component='img' width='50px' mr={2} src='/icons/expense.png' />
            <Box>
              <Typography>Total de por cobrar</Typography>
              <Typography variant='h5' fontWeight='bold'>{getTotalPendingToCollect(data)}</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      <Box sx={{width: '100%', p: 2}}>
        <Box sx={{width: '100%'}}>
          {loading && <LinearProgress/>}
        </Box>
        {/*  Properties Table*/}
        <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
          <Tabs value={tab} onChange={handleChange} aria-label="panel de flujo de efectivo" centered>
            <Tab label="Ingresos" {...a11yProps(0)} />
            <Tab label="Egresos" {...a11yProps(1)} />
            <Tab label="Cuentas por pagar" {...a11yProps(2)} />
            <Tab label="Cuentas por cobrar" {...a11yProps(3)} />
          </Tabs>
        </Box>
        <TabPanel value={tab} index={0}>
          <CashFlowTable data={getDataByIncome(data)} loading={loading} onDelete={(id) => deleteData(id)} />
        </TabPanel>
        <TabPanel value={tab} index={1}>
          <CashFlowTable data={getDataByOutcome(data)} loading={loading} onDelete={(id) => deleteData(id)} />
        </TabPanel>
        <TabPanel value={tab} index={2}>
          <CashFlowTable data={getDataByTotalDue(data)} loading={loading} onDelete={(id) => deleteData(id)} />
        </TabPanel>
        <TabPanel value={tab} index={3}>
          <CashFlowTable data={getDataByPendingToCollect(data)} loading={loading} onDelete={(id) => deleteData(id)} />
        </TabPanel>

        </Box>
    </>
  )
}
