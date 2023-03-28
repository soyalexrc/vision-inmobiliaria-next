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

export function CashFlowList({getProperties, data, loading, deleteData}: any) {







  return (
    <Box sx={{width: '100%', p: 2}}>
      <Box sx={{width: '100%'}}>
        {loading && <LinearProgress/>}
      </Box>
      {/*  Properties Table*/}
      <CashFlowTable data={data} loading={loading} onDelete={(id) => deleteData(id)} />
    </Box>
  )
}
