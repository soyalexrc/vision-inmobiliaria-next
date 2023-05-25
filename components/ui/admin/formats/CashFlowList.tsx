import React from 'react';
import {useRouter} from "next/router";
import AddIcon from "@mui/icons-material/Add";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import {
  Box,
  LinearProgress,
  Button,
  Grid,
  Badge,
  Typography, Tabs, Tab, Paper
} from "@mui/material";
import {CashFlowTable} from "./";
import {formatPrice} from "../../../../utils";
import {a11yProps, TabPanel} from "../../tabs";
import { NumericFormat, PatternFormat } from 'react-number-format';

export function CashFlowList({
  data,
  loading,
  deleteData,
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

  function getTotalAmounts(d: any) {
    let totalBs = 0;
    let totalEUR = 0;
    let totalUSD = 0;
    d.forEach((x: any) => {
      if (x.currency === 'Bs') totalBs += Number(x.amount);
      if (x.currency === '$') totalUSD += Number(x.amount);
      if (x.currency === '€') totalEUR += Number(x.amount);
    })
    return {bs: totalBs, usd: totalUSD, eur: totalEUR};
  }

  function getTotalPendingToCollect(d: any) {
    let totalBs = 0;
    let totalEUR = 0;
    let totalUSD = 0;
    d.forEach((x: any) => {
      if (x.currency === 'Bs') totalBs += Number(x.pending_to_collect);
      if (x.currency === '$') totalUSD += Number(x.pending_to_collect);
      if (x.currency === '€') totalEUR += Number(x.pending_to_collect);
    })
    return {bs: totalBs, usd: totalUSD, eur: totalEUR};
  }

  function getTotalDue(d : any ) {
    let totalBs = 0;
    let totalEUR = 0;
    let totalUSD = 0;
    d.forEach((x: any) => {
      if (x.currency === 'Bs') totalBs += Number(x.total_due);
      if (x.currency === '$') totalUSD += Number(x.total_due);
      if (x.currency === '€') totalEUR += Number(x.total_due);
    })
    return {bs: totalBs, usd: totalUSD, eur: totalEUR};
  }

  function getUtility(d: any) {
    let bs = getTotalAmounts(getDataByIncome(d)).bs - getTotalPendingToCollect(d).bs;
    let usd = getTotalAmounts(getDataByIncome(d)).usd - getTotalPendingToCollect(d).usd;
    let eur = getTotalAmounts(getDataByIncome(d)).eur - getTotalPendingToCollect(d).eur;


    return {bs, usd, eur};
  }


  function TotalList({currencyObj}: {currencyObj: {bs: number, usd: number, eur: number}}) {
    return (
        <Box mt={1}>
          <Typography
              variant='body1'
              fontWeight='bold'
          >
            <NumericFormat displayType='text' fixedDecimalScale decimalScale={2} value={currencyObj.bs} prefix={"Bs. "} allowNegative={true} allowLeadingZeros={true} thousandSeparator="," />
          </Typography>
          <Typography
              variant='body1'
              fontWeight='bold'
          >
            <NumericFormat displayType='text' fixedDecimalScale decimalScale={2} value={currencyObj.usd} prefix={"$ "} allowNegative={true} allowLeadingZeros={true} thousandSeparator="," />
          </Typography>
          <Typography
              variant='body1'
              fontWeight='bold'
          >
            <NumericFormat displayType='text' fixedDecimalScale decimalScale={2} value={currencyObj.eur} prefix={"€ "} allowNegative={true} allowLeadingZeros={true} thousandSeparator="," />
          </Typography>
        </Box>
    )
  }


  return (
    <>
      <Box p={2}>
        <Box display='fllex' justifyContent='space-between' alignItems='center' flexWrap='wrap'>
          <Box display='flex' flexWrap='wrap' alignItems='center' mb={2}>
            <Typography variant='h2'>Formato de flujo de caja</Typography>
            <Typography sx={{mx: 2}} color='gray'>{data.length} registros</Typography>
          </Box>
          <Button fullWidth={!largeScreen} variant='contained' color='primary'
                  sx={{display: 'flex', mt: !largeScreen ? 2 : 0, height: 40}} onClick={() => router.push('/admin/formatos/flujo-de-caja/crear')}>
            <AddIcon/>
            registro
          </Button>
        </Box>
        <Box display='flex' gap={2} mt={3} flexDirection={largeScreen ? 'row' : 'column'}>
          <Badge badgeContent={currentFiltersAmount} color="primary">
            <Button fullWidth={!largeScreen} size="small" onClick={() => setFiltersDrawer(true)}
                    sx={{display: 'flex'}}>
              <FilterAltIcon/>
              Filtros
            </Button>
          </Badge>

          <Button fullWidth={!largeScreen} size="small" onClick={() => router.push('flujo-de-caja/resumen-de-operaciones')}
                  sx={{display: 'flex'}}>
            <PointOfSaleIcon/>
            Resumen de operaciones
          </Button>
        </Box>
      </Box>



      <Grid container spacing={2} sx={{display: 'flex', justifyContent: 'center'}}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 4, display: 'flex', alignItems: 'center' }} elevation={2}>
            <Box component='img' width='50px' mr={2} src='/icons/piggy-bank.png' />
            <Box>
              <Typography variant='body2'>Total Ingresos</Typography>
              <TotalList currencyObj={getTotalAmounts(getDataByIncome(data))} />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 4, display: 'flex', alignItems: 'center' }} elevation={2}>
            <Box component='img' width='50px' mr={2} src='/icons/piggy-bank.png' />
            <Box>
              <Typography variant='body2'>Total Egresos</Typography>
              <TotalList currencyObj={getTotalAmounts(getDataByOutcome(data))} />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 4, display: 'flex', alignItems: 'center' }} elevation={2}>
            <Box component='img' width='50px' mr={2} src='/icons/piggy-bank.png' />
            <Box>
              <Typography variant='body2'>Utilidad estimada</Typography>
              <TotalList currencyObj={getUtility(data)} />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 4, display: 'flex', alignItems: 'center' }} elevation={2}>
            <Box component='img' width='50px' mr={2} src='/icons/profit.png' />
            <Box>
              <Typography variant='body2'>Total por Pagar</Typography>
              <TotalList currencyObj={getTotalDue(data)} />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 4, display: 'flex', alignItems: 'center' }} elevation={2}>
            <Box component='img' width='50px' mr={2} src='/icons/expense.png' />
            <Box>
              <Typography variant='body2'>Total por cobrar</Typography>
              <TotalList currencyObj={getTotalPendingToCollect(data)} />
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
          <Tabs value={tab} onChange={handleChange} aria-label="panel de flujo de caja" centered>
                  <Tab label="Ingresos" {...a11yProps(0)} />
            <Tab label="Egresos" {...a11yProps(1)} />
            <Tab label="Cuentas por pagar" {...a11yProps(2)} />
            <Tab label="Cuentas por cobrar" {...a11yProps(3)} />
          </Tabs>
        </Box>
        <TabPanel value={tab} index={0}>
          <CashFlowTable
              data={getDataByIncome(data)}
              loading={loading}
              onDelete={(id) => deleteData(id)}
          />
        </TabPanel>
        <TabPanel value={tab} index={1}>
          <CashFlowTable
            data={getDataByOutcome(data)}
            loading={loading}
            showPendingToCollect={false}
            showTotalDue={false}
            onDelete={(id) => deleteData(id)}
          />
        </TabPanel>
        <TabPanel value={tab} index={2}>
          <CashFlowTable
            data={getDataByTotalDue(data)}
            loading={loading}
            showPendingToCollect={false}
            showAmount={false}
            onDelete={(id) => deleteData(id)}
          />
        </TabPanel>
        <TabPanel value={tab} index={3}>
          <CashFlowTable
            data={getDataByPendingToCollect(data)}
            loading={loading}
            showTotalDue={false}
            showAmount={false}
            onDelete={(id) => deleteData(id)}
          />
        </TabPanel>

        </Box>
    </>
  )
}
