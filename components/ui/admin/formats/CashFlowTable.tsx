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
  IconButton,
} from '@mui/material'
import {styled} from '@mui/material/styles'

import EditIcon from "@mui/icons-material/Edit";
// import {AuthContext} from "../../../../context/auth";
import {useRouter} from "next/router";
import {DeleteButton} from "../DeleteButton";
import {FormatCashFlow} from "../../../../interfaces";

interface CashFlowTableProps {
  loading: boolean;
  data: FormatCashFlow[];
  onDelete: (id: number | string) => void;
}

const TableHeaderItem = styled(TableCell)(({theme}: { theme: any }) => ({
  color: theme.palette.common.black,
  fontWeight: 'bold',
}));


export function CashFlowTable({loading, data, onDelete}: CashFlowTableProps) {
  // const {currentUser} = React.useContext(AuthContext)
  const router = useRouter()

  return (
    <>
      <TableContainer>
        <Table width='100%'>
          <TableHead sx={{backgroundColor: '#eaeaea'}}>
            <TableRow>
              <TableHeaderItem>Nº</TableHeaderItem>
              <TableHeaderItem>Mes</TableHeaderItem>
              <TableHeaderItem>Fecha</TableHeaderItem>
              <TableHeaderItem>Tipo de Inmueble </TableHeaderItem>
              <TableHeaderItem>Inmueble </TableHeaderItem>
              <TableHeaderItem>Ubicacion </TableHeaderItem>
              <TableHeaderItem>Servicio</TableHeaderItem>
              <TableHeaderItem>Tipo de servicio</TableHeaderItem>
              <TableHeaderItem>Canon</TableHeaderItem>
              <TableHeaderItem>Garantia</TableHeaderItem>
              <TableHeaderItem>Contrato</TableHeaderItem>
              <TableHeaderItem>Contribuyente</TableHeaderItem>
              <TableHeaderItem>Persona / Cliente</TableHeaderItem>
              <TableHeaderItem>Tipo de transaccion</TableHeaderItem>
              <TableHeaderItem>Moneda</TableHeaderItem>
              <TableHeaderItem>Forma de pago</TableHeaderItem>
              <TableHeaderItem>Entidad</TableHeaderItem>
              <TableHeaderItem align='center'>Monto </TableHeaderItem>
              <TableHeaderItem>Concepto</TableHeaderItem>
              <TableHeaderItem align='center'>Retencion para pagos</TableHeaderItem>
              <TableHeaderItem align='center'>Por pagar</TableHeaderItem>
              <TableHeaderItem>Observaciones</TableHeaderItem>
              <TableHeaderItem align='center'>Acciones</TableHeaderItem>
            </TableRow>
          </TableHead>
          <TableBody>
            {!loading && data && data.length > 0 && data.map((row, index: number) => (
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
                <TableCell>{row.month}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>
                  <Box width={200}>
                    {row.type_of_property}
                  </Box>
                </TableCell>
                <TableCell>
                  <Box width={200}>
                    {row.property}
                  </Box>
                </TableCell>
                <TableCell>
                  <Box width={200}>
                    {row.location}
                  </Box>
                </TableCell>
                <TableCell>{row.service}</TableCell>
                <TableCell>{row.type_of_service}</TableCell>
                <TableCell>{row.type_of_service}</TableCell>
                <TableCell>{row.canon}</TableCell>
                <TableCell>{row.guarantee}</TableCell>
                <TableCell>{row.contract}</TableCell>
                <TableCell>{row.tax_payer}</TableCell>
                <TableCell>{row.client}</TableCell>
                <TableCell align='center'>
                  <Box width={180}>
                    {row.transaction_type}
                  </Box>
                </TableCell>
                <TableCell>{row.currency}</TableCell>
                <TableCell>{row.way_to_pay}</TableCell>
                <TableCell>{row.entity}</TableCell>

                <TableCell align='center'>
                  <Box width={150}>
                    {row.amount}
                  </Box>
                </TableCell>

                <TableCell align='center'>
                  <Box width={150}>
                    {row.reason}
                  </Box>
                </TableCell>

                <TableCell align='center'>
                  <Box width={150}>
                    {row.total_due}
                  </Box>
                </TableCell>

                <TableCell align='center'>
                  <Box width={150}>
                    {row.pending_to_collect}
                  </Box>
                </TableCell>

                <TableCell>{row.observations}</TableCell>

                <TableCell>
                  <Box display='flex' alignItems='center' justifyContent='center' width={200}>
                    <Tooltip title='Editar propiedad'>
                      <IconButton onClick={() => router.push(`/admin/formatos/flujo-de-efectivo/${row.id}`)}>
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
    </>
  )
}
