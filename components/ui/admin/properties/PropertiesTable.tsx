import React from 'react';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Typography,
  Box,
  Tooltip,
  IconButton,
  Button
} from '@mui/material'
import {styled} from '@mui/material/styles'

import EditIcon from "@mui/icons-material/Edit";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import {axiosInstance, formatPrice} from "../../../../utils";
import {AuthContext} from "../../../../context/auth";
import {useRouter} from "next/router";
import {DeleteButton} from "../DeleteButton";
import {useSnackbar} from "notistack";

interface PropertiesTableProps {
  loading: boolean;
  properties: any;
  owners: any[];
}

const TableHeaderItem = styled(TableCell)(({theme}: { theme: any }) => ({
  color: theme.palette.common.black,
  fontWeight: 'bold',
}));


export function PropertiesTable({loading, properties, owners}: PropertiesTableProps) {
  const [previewModal, setPreviewModal] = React.useState<boolean>(false);
  const [statusModal, setStatusModal] = React.useState<boolean>(false);
  const [historyModal, setHistoryModal] = React.useState<boolean>(false);
  const [comissionModal, setComissionModal] = React.useState<boolean>(false);
  const [propertyDetailLoading, setPropertyDetailLoading] = React.useState<boolean>(false);
  const [propertyDetail, setPropertyDetail] = React.useState<any>({});
  const {currentUser} = React.useContext(AuthContext)
  const {enqueueSnackbar} = useSnackbar()
  const router = useRouter()


  const openHistoryModal = async (id: number) => {
    setHistoryModal(true);
    // await getPropertyHistory(id);
  }

  const deleteProperty = async (id: number) => {

  }

  // React.useEffect(() => {
  //   setTimeout(() => {
  //     router.push('/admin/propiedades/comision/2901')
  //   }, 2000)
  // }, [])

  return (
    <>
      <TableContainer>
        <Table width='100%'>
          <TableHead sx={{backgroundColor: '#eaeaea'}}>
            <TableRow>
              <TableHeaderItem>Nº</TableHeaderItem>
              <TableHeaderItem>Código</TableHeaderItem>
              <TableHeaderItem>Fecha de registro</TableHeaderItem>
              <TableHeaderItem>Imagen</TableHeaderItem>
              <TableHeaderItem>Inmueble</TableHeaderItem>
              <TableHeaderItem>Nomenclatura</TableHeaderItem>
              <TableHeaderItem>Ubicación</TableHeaderItem>
              <TableHeaderItem>Precio</TableHeaderItem>
              <TableHeaderItem>Negociación </TableHeaderItem>
              <TableHeaderItem>Propietario</TableHeaderItem>
              <TableHeaderItem>Tipo de operación</TableHeaderItem>
              <TableHeaderItem>Aliado</TableHeaderItem>
              <TableHeaderItem>Asesor</TableHeaderItem>
              <TableHeaderItem>Capacitador externo</TableHeaderItem>
              <TableHeaderItem>Motivo de operación</TableHeaderItem>
              <TableHeaderItem>Estatus</TableHeaderItem>
              <TableHeaderItem>Estatus documento</TableHeaderItem>
              <TableHeaderItem>Nomenclatura</TableHeaderItem>
              <TableHeaderItem>M2 Terreno </TableHeaderItem>
              <TableHeaderItem>M2 Construcción </TableHeaderItem>
              <TableHeaderItem>Tipo de piso </TableHeaderItem>
              <TableHeaderItem>Comentarios Distribución </TableHeaderItem>
              <TableHeaderItem align='center'>Acciones</TableHeaderItem>
            </TableRow>
          </TableHead>
          <TableBody>
            {!loading && properties.data && properties.data.length > 0 && properties.data.map((row: any, index: number) => (
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
                <TableCell sx={{px: 5}}>{row.code}</TableCell>
                <TableCell>
                  <Typography>20/02/2022</Typography>
                </TableCell>
                <TableCell>
                  <Box
                    onError={({currentTarget}: { currentTarget: any }) => {
                      currentTarget.onerror = null;
                      currentTarget.src = '/images/no-image.jpg'
                    }}
                    component='img'
                    src={row.image ? row.image : '/images/no-image.jpg'}
                    width={50}
                    height={50}
                    sx={{borderRadius: 100}}
                  />
                </TableCell>
                <TableCell>
                  <Typography sx={{width: 180}}>{row.attributes[0]?.property_type}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>Nomenclatura</Typography>
                </TableCell>
                <TableCell>
                  <Typography sx={{width: 250}}>
                    {row.location.country} - {row.location.city} - {row.location.state} - {row.location.municipality}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography sx={{width: 130}}>{formatPrice(row.price)}</Typography>
                </TableCell>
                <TableCell>
                  <Typography sx={{width: 130}}>{formatPrice(row.price)}</Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    sx={{width: 200}}>{owners && owners.length > 0 && `${owners[0].first_name} ${owners[0].last_name}`}</Typography>
                </TableCell>
                <TableCell>
                  <Typography sx={{width: 200}}>{row.operationType}</Typography>
                </TableCell>
                <TableCell>
                  <Typography sx={{width: 130}}>Aliado</Typography>
                </TableCell>
                <TableCell>
                  <Typography sx={{width: 130}}>Asesor</Typography>
                </TableCell>
                <TableCell>
                  <Typography sx={{width: 200}}>External capacitor</Typography>
                </TableCell>
                <TableCell>
                  <Typography sx={{width: 200}}>Motivo de operacion</Typography>
                </TableCell>
                <TableCell>
                  <Typography sx={{width: 200}}>{row.property_status}</Typography>
                </TableCell>
                <TableCell>
                  <Typography sx={{width: 200}}>Estatus documento</Typography>
                </TableCell>
                <TableCell>
                  <Typography>Nomenclatura 1</Typography>
                </TableCell>
                <TableCell>
                  <Typography sx={{width: 200}}>Metraje de terreno cuadrado</Typography>
                </TableCell>
                <TableCell>
                  <Typography sx={{width: 200}}>Metraje de terreno construccion</Typography>
                </TableCell>
                <TableCell>
                  <Typography sx={{width: 200}}>Material de piso </Typography>
                </TableCell>
                <TableCell>
                  <Typography sx={{width: 200}}>Comentarios de distribucion</Typography>
                </TableCell>
                <TableCell align='center'>
                  <Box>
                    <Box display='flex' alignItems='center'>
                      {
                        currentUser.user_type === 'Administrador' &&
                        <>
                          <Tooltip title='Editar propiedad'>
                            <IconButton onClick={() => router.push(`/admin/propiedades/editar/${row.id}`)}>
                              <EditIcon/>
                            </IconButton>
                          </Tooltip>
                          <Tooltip title='Cambiar estatus'>
                            <IconButton onClick={() => setStatusModal(true)}>
                              <AutorenewIcon/>
                            </IconButton>
                          </Tooltip>
                          <Tooltip title='Vista preeliminar '>
                            <IconButton onClick={() => router.push(`/admin/propiedades/previsualizar/${row.id}`)}>
                              <OpenInNewIcon/>
                            </IconButton>
                          </Tooltip>
                          <DeleteButton
                            title='Se eliminara la siguiente propiedad'
                            element={`${row.propertyType} ${row.operationType}`}
                            onClick={() => deleteProperty(row.id)}
                          />
                        </>
                      }
                      {
                        currentUser.user_type === 'Asesor inmobiliario Vision' &&
                        <Tooltip title='Vista preeliminar '>
                          <IconButton onClick={() => router.push(`/admin/propiedades/previsualizar/${row.id}`)}>
                            <OpenInNewIcon/>
                          </IconButton>
                        </Tooltip>
                      }
                    </Box>
                    <Button variant='text' fullWidth size='small' onClick={() => router.push(`/admin/propiedades/historial/${row.id}`)}>Ver
                      historial</Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/*<ChangeStatusModal*/}
      {/*  data={row}*/}
      {/*  open={statusModal}*/}
      {/*  setOpen={setStatusModal}*/}
      {/*  trigger={() => setComissionModal(true)}*/}
      {/*/>*/}
      {/*<ComissionModal*/}
      {/*  data={row}*/}
      {/*  open={comissionModal}*/}
      {/*  setOpen={setComissionModal}*/}
      {/*  trigger={() => setComissionModal(true)}*/}
      {/*/>*/}
    </>
  )
}
