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
import {Formatclients} from "../../../../utils/mock-data";
import axios from "axios";
import {useSnackbar} from "notistack";

interface PropertiesTableProps {
  loading: boolean;
  clients: Formatclients[];
  onDelete: (id: number | string) => void;
}

const TableHeaderItem = styled(TableCell)(({theme}: { theme: any }) => ({
  color: theme.palette.common.black,
  fontWeight: 'bold',
}));


export function ClientsTable({loading, clients, onDelete}: PropertiesTableProps) {
  // const {currentUser} = React.useContext(AuthContext)
  const router = useRouter()

  return (
    <>
      <TableContainer>
        <Table width='100%'>
          <TableHead sx={{backgroundColor: '#eaeaea'}}>
            <TableRow>
              <TableHeaderItem>Nº</TableHeaderItem>
              <TableHeaderItem>Propiedad</TableHeaderItem>
              <TableHeaderItem>Contacto</TableHeaderItem>
              <TableHeaderItem>Ubicacion</TableHeaderItem>
              <TableHeaderItem>Canon</TableHeaderItem>
              <TableHeaderItem>Etatus de canon</TableHeaderItem>
              <TableHeaderItem>Estatus de pago de propietario</TableHeaderItem>
              <TableHeaderItem>Estatus de pago de mantenimiento de condominio</TableHeaderItem>
              <TableHeaderItem>Estatus de pago de electricidad </TableHeaderItem>
              <TableHeaderItem>Fecha de cobranza</TableHeaderItem>
              <TableHeaderItem>Proximo ajuste</TableHeaderItem>
              <TableHeaderItem>Proxima suscripcion</TableHeaderItem>
              <TableHeaderItem>Enero</TableHeaderItem>
              <TableHeaderItem>Febrero</TableHeaderItem>
              <TableHeaderItem>Marzo</TableHeaderItem>
              <TableHeaderItem>Abril</TableHeaderItem>
              <TableHeaderItem>Mayo</TableHeaderItem>
              <TableHeaderItem>Junio</TableHeaderItem>
              <TableHeaderItem>Julio</TableHeaderItem>
              <TableHeaderItem>Agosto</TableHeaderItem>
              <TableHeaderItem>Septiembre</TableHeaderItem>
              <TableHeaderItem>Octubre</TableHeaderItem>
              <TableHeaderItem>Noviembre</TableHeaderItem>
              <TableHeaderItem>Diciembre</TableHeaderItem>
              <TableHeaderItem>Observaciones</TableHeaderItem>
              <TableHeaderItem align='center'>Acciones</TableHeaderItem>
            </TableRow>
          </TableHead>
          <TableBody>
            {!loading && clients && clients.length > 0 && clients.map((row, index: number) => (
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
                <TableCell>{row.property}</TableCell>
                <TableCell>
                  <Box width={180}>
                    {row.contact}
                  </Box>
                </TableCell>
                <TableCell>
                  <Box width={180}>
                    {row.location}
                  </Box>
                </TableCell>
                <TableCell>{row.lease_fee}</TableCell>
                <TableCell>
                  <Box width={180}>
                    {row.lease_fee_status}
                  </Box>
                </TableCell>
                <TableCell>
                  <Box width={280} display='flex' justifyContent='center'>
                    {row.owner_payment_status}
                  </Box>
                </TableCell>
                <TableCell>
                  <Box width={300} display='flex' justifyContent='center'>
                    {row.status_condo_cleanliness_payment}
                  </Box>
                </TableCell>
                <TableCell>
                  <Box width={200} display='flex' justifyContent='center'>
                    {row.status_electricity_payment}
                  </Box>
                </TableCell>
                <TableCell>
                  <Box width={200} display='flex' justifyContent='center'>
                    {row.date_to_collect_lease_fee}
                  </Box>
                </TableCell>
                <TableCell>
                  <Box width={200} display='flex' justifyContent='center'>
                    {row.next_adjustment}
                  </Box>
                </TableCell>
                <TableCell>
                  <Box width={200} display='flex' justifyContent='center'>
                    {row.next_subcription}
                  </Box>
                </TableCell>
                <TableCell>
                  <Box width={180}>
                    {row.january.text}
                  </Box>
                </TableCell>
                <TableCell>
                  <Box width={180}>
                    {row.february.text}
                  </Box>
                </TableCell>
                <TableCell>
                  <Box width={180}>
                    {row.march.text}
                  </Box>
                </TableCell>
                <TableCell>
                  <Box width={180}>
                    {row.april.text}
                  </Box>
                </TableCell>
                <TableCell>
                  <Box width={180}>
                    {row.may.text}
                  </Box>
                </TableCell>
                <TableCell>
                  <Box width={180}>
                    {row.june.text}
                  </Box>
                </TableCell>
                <TableCell>
                  <Box width={180}>
                    {row.july.text}
                  </Box>
                </TableCell>
                <TableCell>
                  <Box width={180}>
                    {row.august.text}
                  </Box>
                </TableCell>
                <TableCell>
                  <Box width={180}>
                    {row.september.text}
                  </Box>
                </TableCell>
                <TableCell>
                  <Box width={180}>
                    {row.october.text}
                  </Box>
                </TableCell>
                <TableCell>
                  <Box width={180}>
                    {row.november.text}
                  </Box>
                </TableCell>
                <TableCell>
                  <Box width={180}>
                    {row.december.text}
                  </Box>
                </TableCell>
                <TableCell>
                  <Box width={400}>
                    {row.observations}
                  </Box>
                </TableCell>
                <TableCell>
                  <Box display='flex' alignItems='center' justifyContent='center' width={200}>
                    <Tooltip title='Editar propiedad'>
                      <IconButton onClick={() => router.push(`/admin/formatos/clientes/${row.id}`)}>
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
