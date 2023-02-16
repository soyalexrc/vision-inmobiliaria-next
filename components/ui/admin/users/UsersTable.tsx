import React from 'react';
import {
  Box,
  LinearProgress,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  Pagination,
  Typography,
  IconButton,
} from "@mui/material";
import {useRouter} from "next/router";
import EditIcon from '@mui/icons-material/Edit';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import {DeleteButton} from "../DeleteButton";

interface UsersTableProps {
  loading: boolean;
  users: any;
  deleteUser: (id: string | number) => void
}
export function UsersTable({loading, users, deleteUser}: UsersTableProps) {
  const [page, setPage] = React.useState<number>(0);
  const router = useRouter()

  console.log('users', users);

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  return (
    <Box my={3}>
      <Box sx={{width: '100%'}}>
        {loading && <LinearProgress/>}
      </Box>
      <TableContainer>
        <Table>
          <TableHead sx={{backgroundColor: '#eaeaea'}}>
            <TableRow>
              <TableCell sx={{color: (theme: any) => theme.palette.common.black, fontWeight: 'bold'}}>Usuario</TableCell>
              <TableCell sx={{color: (theme: any) => theme.palette.common.black, fontWeight: 'bold'}}>Nombre</TableCell>
              <TableCell sx={{color: (theme: any) => theme.palette.common.black, fontWeight: 'bold'}}>Celular</TableCell>
              <TableCell sx={{color: (theme: any) => theme.palette.common.black, fontWeight: 'bold'}}>Email</TableCell>
              <TableCell align='center'
                         sx={{color: (theme: any) => theme.palette.common.black, fontWeight: 'bold'}}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!loading && users && users.length > 0 && users.slice(page * 10, page * 10 + 10).map((row: any) => (
              <TableRow
                key={row.id}
                sx={{
                  '&:last-child td, &:last-child th': {border: 0},
                  transition: "background .2s",
                  '&:hover': {
                    backgroundColor: 'rgba(0,0,0, 0.05)'
                  }
                }}
              >
                <TableCell>{row.username} </TableCell>
                <TableCell>{row.first_name} {row.last_name}</TableCell>
                <TableCell>
                  <Box>
                    <Box display='flex' alignItems='center' mb={row.phone_number2 && 2}>
                      <Box display='flex' alignItems='center' onClick={() => {}}
                           sx={{cursor: 'pointer'}}>
                        <WhatsAppIcon sx={{mx: 1}} fontSize='small' color='secondary'/>
                        <Typography color='secondary' sx={{'&:hover': {textDecoration: 'underline'}}}>
                          {row.phone_number1}
                        </Typography>
                      </Box>
                    </Box>
                    {
                      row.phone_number2 &&
                      <Box display='flex' alignItems='center'>
                        <Box display='flex' alignItems='center' onClick={() => {}}
                             sx={{cursor: 'pointer'}}>
                          <WhatsAppIcon sx={{mx: 1}} fontSize='small' color='secondary'/>
                          <Typography color='secondary' sx={{'&:hover': {textDecoration: 'underline'}}}>
                            {row.phone_number2}
                          </Typography>
                        </Box>
                      </Box>
                    }
                  </Box>

                </TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell align='center'>
                  <Box display='flex'>
                    <IconButton onClick={() => router.push(`/admin/usuarios/${row.id}`)}>
                      <EditIcon/>
                    </IconButton>
                    <DeleteButton title='Se eliminara el siguiente usuario' element={row.username} onClick={() => deleteUser(row.id)}/>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {
        (!users || users.length) < 1 &&
        <Box sx={{height: '50vh', display: 'flex', justifyContent: 'center', width: '100%', alignItems: 'center'}}>
          <Typography>No se encontraron propietarios...</Typography>
        </Box>
      }
      <Box sx={{display: 'flex', justifyContent: 'end', pt: 5}}>
        <Pagination
          boundaryCount={1}
          count={Math.round(users.length / 10)}
          defaultPage={1}
          onChange={handleChangePage}
          page={page}
          showFirstButton
          showLastButton
        />
      </Box>
    </Box>
  )
}
