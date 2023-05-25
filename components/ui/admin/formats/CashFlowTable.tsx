import React from 'react';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Box,
  Tooltip,
  IconButton, Typography, Pagination,
} from '@mui/material'
import {styled} from '@mui/material/styles'

import EditIcon from "@mui/icons-material/Edit";
// import {AuthContext} from "../../../../context/auth";
import {useRouter} from "next/router";
import {DeleteButton} from "../DeleteButton";
import {FormatCashFlow} from "../../../../interfaces";
import {NumericFormat} from "react-number-format";

interface CashFlowTableProps {
  loading: boolean;
  data: FormatCashFlow[];
  onDelete: (id: number | string) => void;
  showPendingToCollect?: boolean;
  showTotalDue?: boolean;
  showAmount?: boolean;

}

const TableHeaderItem = styled(TableCell)(({theme}: { theme: any }) => ({
  color: theme.palette.common.black,
  fontWeight: 'bold',
}));


export function CashFlowTable({loading, data, onDelete, showPendingToCollect = true, showTotalDue = true, showAmount = true}: CashFlowTableProps) {
  // const {currentUser} = React.useContext(AuthContext)
  const router = useRouter()
  const [page, setPage] = React.useState<number>(1);


  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const getCurrentPage = () => {
    return page === 1 ? 0 : page * 10 - 10
  }

  const getCurrentPageLimit = () => {
    return page === 1 ? 10 : page * 10
  }

  return (
    <>
      <TableContainer>
        <Table width='100%'>
          <TableHead sx={{backgroundColor: '#eaeaea'}}>
            <TableRow>
              <TableHeaderItem>Fecha</TableHeaderItem>
              <TableHeaderItem>Inmueble </TableHeaderItem>
              <TableHeaderItem>Persona / Cliente</TableHeaderItem>
              {showAmount && <TableHeaderItem align='center'>Monto </TableHeaderItem>}
              <TableHeaderItem>Concepto</TableHeaderItem>
              {showTotalDue && <TableHeaderItem align='center'>Por Pagar</TableHeaderItem>}
              {showPendingToCollect && <TableHeaderItem align='center'>Por Cobrar</TableHeaderItem>}
              <TableHeaderItem align='center'>Acciones</TableHeaderItem>
            </TableRow>
          </TableHead>
          <TableBody>
            {!loading && data && data.length > 0 && data.slice(getCurrentPage(), getCurrentPageLimit()).map((row, index: number) => (
              <TableRow
                key={row.id}
                sx={{
                  '&:last-child td, &:last-child th': {border: 0},
                  '&:hover': {
                    backgroundColor: 'rgba(0,0,0, 0.05)'
                  }
                }}
              >
                <TableCell>
                  <Box width={80}>
                    {row.date}
                  </Box>
                </TableCell>

                <TableCell>
                  <Box width={200}>
                    { row.property && row.property.id ? `${row.property.code} - ${row.property.property_type} - ${row.property.operation_type}` : 'not set'}
                  </Box>
                </TableCell>


                <TableCell>{row.client}</TableCell>


                {
                  showAmount &&
                    <TableCell align='center'>
                      <NumericFormat displayType='text' fixedDecimalScale decimalScale={2} value={row.amount} prefix={row.currency} allowNegative={true} allowLeadingZeros={true} thousandSeparator="," />

                    </TableCell>
                }

                <TableCell align='center'>
                  <Box width={150}>
                    {row.reason}
                  </Box>
                </TableCell>

                {
                  showTotalDue &&
                    <TableCell align='center'>
                      <NumericFormat displayType='text' fixedDecimalScale decimalScale={2} value={row.total_due} prefix={row.currency} allowNegative={true} allowLeadingZeros={true} thousandSeparator="," />
                    </TableCell>
                }

                {
                  showPendingToCollect &&
                    <TableCell align='center'>
                      <NumericFormat displayType='text' fixedDecimalScale decimalScale={2} value={row.pending_to_collect} prefix={row.currency} allowNegative={true} allowLeadingZeros={true} thousandSeparator="," />
                    </TableCell>
                }



                <TableCell>
                  <Box display='flex' alignItems='center' justifyContent='center' width={100}>
                    <Tooltip title='Editar propiedad'>
                      <IconButton onClick={() => router.push(`/admin/formatos/flujo-de-caja/${row.id}`)}>
                        <EditIcon/>
                      </IconButton>
                    </Tooltip>
                    <DeleteButton
                      title='Se eliminara la siguiente propiedad'
                      element={`sample`}
                      onClick={() => onDelete(row.id)}
                    />
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {
        (!data || data.length) < 1 &&
        <Box sx={{height: '50vh', display: 'flex', justifyContent: 'center', width: '100%', alignItems: 'center'}}>
          <Typography>No se encontradon registros...</Typography>
        </Box>
      }
      <Box sx={{display: 'flex', justifyContent: 'end', pt: 5}}>
        <Pagination
          boundaryCount={1}
          count={Math.ceil(data.length / 10)}
          defaultPage={1}
          onChange={handleChangePage}
          page={page}
          showFirstButton
          showLastButton
        />
      </Box>
    </>
  )
}
