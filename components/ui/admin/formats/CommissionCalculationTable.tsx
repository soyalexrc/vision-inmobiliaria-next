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
import {FormatCommissionCalculation} from "../../../../interfaces";

interface PropertiesTableProps {
  loading: boolean;
  data: FormatCommissionCalculation[];
  onDelete: (id: number | string) => void;
}

const TableHeaderItem = styled(TableCell)(({theme}: { theme: any }) => ({
  color: theme.palette.common.black,
  fontWeight: 'bold',
}));


export function CommissionCalculationTable({loading, data, onDelete}: PropertiesTableProps) {
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
              <TableHeaderItem>Nº</TableHeaderItem>
              <TableHeaderItem>Fecha de solicitud</TableHeaderItem>
              <TableHeaderItem>Factura Nº.</TableHeaderItem>
              <TableHeaderItem>Inmueble</TableHeaderItem>
              <TableHeaderItem>Cliente</TableHeaderItem>
              <TableHeaderItem>Asesor a cargo</TableHeaderItem>
              <TableHeaderItem>Tramite</TableHeaderItem>
              <TableHeaderItem>Estatus (Culminado o En Curso)</TableHeaderItem>
              <TableHeaderItem>Precio de tramite</TableHeaderItem>
              <TableHeaderItem>Pago / Abono</TableHeaderItem>
              <TableHeaderItem>Por cobrar</TableHeaderItem>
              <TableHeaderItem>Precio por etapa de proceso</TableHeaderItem>
              <TableHeaderItem>Gastos</TableHeaderItem>
              <TableHeaderItem>Calculo abogado 20%</TableHeaderItem>
              <TableHeaderItem>Calculo abogado 30%</TableHeaderItem>
              <TableHeaderItem>Calculo abogado 40%</TableHeaderItem>
              <TableHeaderItem>Calculo asesor 10%</TableHeaderItem>
              <TableHeaderItem>Ganancias de la empresa</TableHeaderItem>
              <TableHeaderItem>Papeleria</TableHeaderItem>
              <TableHeaderItem>Monto pagado (Abogado)</TableHeaderItem>
              <TableHeaderItem>Monto por pagar (Abogado)</TableHeaderItem>
              <TableHeaderItem>Fecha del pago (Abogado)</TableHeaderItem>
              <TableHeaderItem>Estatus (Abogado)</TableHeaderItem>
              <TableHeaderItem>Monto pagado (Asesor)</TableHeaderItem>
              <TableHeaderItem>Monto por pagar (Asesor)</TableHeaderItem>
              <TableHeaderItem>Fecha del pago (Asesor)</TableHeaderItem>
              <TableHeaderItem>Estatus (Asesor)</TableHeaderItem>
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
                <TableCell sx={{px: 5}}>{index + 1}</TableCell>
                <TableCell>{row.date_application}</TableCell>
                <TableCell>
                  <Box width={180}>
                    {row.bill_number}
                  </Box>
                </TableCell>
                <TableCell>
                  <Box width={180}>
                    {row.property}
                  </Box>
                </TableCell>
                <TableCell>{row.client}</TableCell>
                <TableCell>
                  <Box width={180}>
                    {row.adviser_in_charge}
                  </Box>
                </TableCell>
                <TableCell>
                  <Box width={280} display='flex' justifyContent='center'>
                    {row.procedure}
                  </Box>
                </TableCell>
                <TableCell>
                  <Box width={300} display='flex' justifyContent='center'>
                    {row.status}
                  </Box>
                </TableCell>
                <TableCell>
                  <Box width={200} display='flex' justifyContent='center'>
                    {row.price_procedure}
                  </Box>
                </TableCell>
                <TableCell>
                  <Box width={200} display='flex' justifyContent='center'>
                    {row.total_paid}
                  </Box>
                </TableCell>
                <TableCell>
                  <Box width={200} display='flex' justifyContent='center'>
                    {row.total_due}
                  </Box>
                </TableCell>
                <TableCell>
                  <Box width={200} display='flex' justifyContent='center'>
                    {row.price_per_stage_process}
                  </Box>
                </TableCell>
                <TableCell>
                  <Box width={180}>
                    {row.expenses}
                  </Box>
                </TableCell>
                <TableCell>
                  <Box width={180}>
                    {row.lawyer_calculation_20}
                  </Box>
                </TableCell>
                <TableCell>
                  <Box width={180}>
                    {row.lawyer_calculation_30}
                  </Box>
                </TableCell>
                <TableCell>
                  <Box width={180}>
                    {row.lawyer_calculation_40}
                  </Box>
                </TableCell>
                <TableCell>
                  <Box width={180}>
                    {row.adviser_calculation_10}
                  </Box>
                </TableCell>
                <TableCell>
                  <Box width={180}>
                    {row.company_profit}
                  </Box>
                </TableCell>
                <TableCell>
                  <Box width={180}>
                    {row.stationary}
                  </Box>
                </TableCell>
                <TableCell>
                  <Box width={180}>
                    {row.total_paid_lawyer}
                  </Box>
                </TableCell>
                <TableCell>
                  <Box width={180}>
                    {row.total_due_lawyer}
                  </Box>
                </TableCell>
                <TableCell>
                  <Box width={180}>
                    {row.payment_date_lawyer}
                  </Box>
                </TableCell>
                <TableCell>
                  <Box width={180}>
                    {row.status_lawyer}
                  </Box>
                </TableCell>
                <TableCell>
                  <Box width={180}>
                    {row.total_paid_adviser}
                  </Box>
                </TableCell>
                <TableCell>
                  <Box width={400}>
                    {row.total_due_adviser}
                  </Box>
                </TableCell>
                <TableCell>
                  <Box width={400}>
                    {row.payment_date_adviser}
                  </Box>
                </TableCell>
                <TableCell>
                  <Box width={400}>
                    {row.status_adviser}
                  </Box>
                </TableCell>
                <TableCell>
                  <Box display='flex' alignItems='center' justifyContent='center' width={200}>
                    <Tooltip title='Editar propiedad'>
                      <IconButton onClick={() => router.push(`/admin/formatos/calculo-de-comisiones/${row.id}`)}>
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
          <Typography>No se encontradon propiedades...</Typography>
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
