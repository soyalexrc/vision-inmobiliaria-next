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
import {CashFlowTable} from "./";
import {ClientsFilterDrawer} from "./";
import {FormatCashFlow} from "../../../../interfaces";
import {axiosInstance} from "../../../../utils";
import {useSnackbar} from "notistack";

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
  return (
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
        <Badge badgeContent={currentFiltersAmount} color="primary">
          <Button fullWidth={!largeScreen} size="small" onClick={() => setFiltersDrawer(true)}
                  sx={{display: 'flex'}}>
            <FilterAltIcon/>
            Filtros
          </Button>
        </Badge>

      </Box>
      <Box sx={{width: '100%', p: 2}}>
        <Box sx={{width: '100%'}}>
          {loading && <LinearProgress/>}
        </Box>
        {/*  Properties Table*/}
        <CashFlowTable data={data} loading={loading} onDelete={(id) => deleteData(id)} />

        </Box>
    </>
  )
}
