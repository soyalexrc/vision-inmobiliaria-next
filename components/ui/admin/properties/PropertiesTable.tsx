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
  Button, Pagination
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
import {Property} from "../../../../interfaces";
import {HistoryModal, ChangeStatusModal, CommissionModal} from "./";

interface PropertiesTableProps {
  loading: boolean;
  properties: any;
  owners: any[];
  reload: () => void;
}

const TableHeaderItem = styled(TableCell)(({theme}: { theme: any }) => ({
  color: theme.palette.common.black,
  fontWeight: 'bold',
  webkitTouchCallout: 'none',
  webkitUserSelect: 'none',
  mozUserSelect: 'none',
  msUserSelect: 'none',
  userSelect: 'none'
}));

const TableItem = styled(TableCell)(({theme}: { theme: any }) => ({
  webkitTouchCallout: 'none',
  webkitUserSelect: 'none',
  mozUserSelect: 'none',
  msUserSelect: 'none',
  userSelect: 'none'
}));





export function PropertiesTable({loading, properties, owners, reload}: PropertiesTableProps) {
  const [statusModal, setStatusModal] = React.useState<boolean>(false);
  const [historyModal, setHistoryModal] = React.useState<boolean>(false);
  const [commissionModal, setCommissionModal] = React.useState<boolean>(false);
  const [historyInfo, setHistoryInfo] = React.useState<any[]>([]);
  const [statusInfo, setStatusInfo] = React.useState<{}>({});
  const [commissionInfo, setCommissionInfo] = React.useState<{}>({});
  const [page, setPage] = React.useState<number>(1);
  const {currentUser} = React.useContext(AuthContext)
  const {enqueueSnackbar} = useSnackbar()
  const router = useRouter()
  let pos = { top: 0, left: 0, x: 0, y: 0 };


  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleGoToPrevisualize = async (row: Property) => {
    try {
      const property = await axiosInstance.get(`property/getById?id=${row.id}`)
      if (property.status === 200) {
        const valueToSend = JSON.stringify(property.data);
        sessionStorage.setItem('propertyToPrevisualize', valueToSend);
        window.open(`/admin/propiedades/previsualizar/${row.id}`, '_blank', 'popup=true')
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function deleteProperty(id: number | string) {
    try {
      const response = await axiosInstance.delete(`property/deleteData?id=${id}`)
      if (response.status === 200) {
        enqueueSnackbar('Se elimino la propiedad con exito!', {variant: 'success'})
        reload()
      }
    } catch (err) {
      enqueueSnackbar('No se pudo eliminar la propiedad, ocurrio un error!', {variant: 'error'})
    }
  }

  const handleOpenStatusModal = (row: Property) => {
    setStatusInfo(row);
    setStatusModal(true)
  }

  const handleOpenHistoryModal = async (id: string | number) => {
    try {
      const response = await axiosInstance.get(`property/getHistoricByPropertyId?property_id=${id}`);
      if (response.status === 200) {
        setHistoryInfo(response.data);
        setHistoryModal(true)
      }
    } catch (e) {
      enqueueSnackbar('No se consiguio informacion de esta propiedad, ocurrio un error!', {variant: 'error'})
    }
  }

  const handleOpenCommissionModal = () => {
    setCommissionInfo(statusInfo);
    setCommissionModal(true)
  }

  const getCurrentPage = () => {
    return page === 1 ? 0 : page * 10 - 10
  }

  const getCurrentPageLimit = () => {
    return page === 1 ? 10 : page * 10
  }

  React.useEffect(() => {
    let pos = {top: 0, left: 0, x: 0, y: 0}
    let table = document.getElementById('properties-table')!;
    table.addEventListener('mousedown', mouseDownHandler)

    function mouseDownHandler(e: any) {
      pos = {
        // The current scroll
        left: table.scrollLeft!,
        top: table.scrollTop!,
        // Get the current mouse position
        x: e.clientX,
        y: e.clientY,
      };

      document.addEventListener('mousemove', mouseMoveHandler);
      document.addEventListener('mouseup', mouseUpHandler);
    }

    const mouseMoveHandler = function (e: any) {
      // How far the mouse has been moved
      const dx = e.clientX - pos.x;
      const dy = e.clientY - pos.y;

      // Scroll the element
      table.scrollTop = pos.top - dy;
      table.scrollLeft = pos.left - dx;
    };

    const mouseUpHandler = function () {
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };
  }, [])



  return (
    <>
      <TableContainer sx={{ width: '100%', overflowX: 'scroll', cursor: 'grab' }} id='properties-table'>
        <Table width='100%'>
          <TableHead sx={{backgroundColor: '#eaeaea'}}>
            <TableRow>
              <TableHeaderItem>Nº</TableHeaderItem>
              <TableHeaderItem>Código</TableHeaderItem>
              <TableHeaderItem>Fecha de registro</TableHeaderItem>
              <TableHeaderItem>Imagen</TableHeaderItem>
              <TableHeaderItem>Inmueble</TableHeaderItem>
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
            {!loading && properties.data && properties.data.length > 0 && properties.data.slice(getCurrentPage(), getCurrentPageLimit()).map((row: any, index: number) => (
              <TableRow
                key={row.id}
                sx={{
                  '&:last-child td, &:last-child th': {border: 0},
                  '&:hover': {
                    backgroundColor: 'rgba(0,0,0, 0.05)'
                  }
                }}
              >
                <TableItem sx={{px: 5}}>{index + 1}</TableItem>
                <TableCell sx={{px: 5}}>{row.code}</TableCell>
                <TableItem>
                  <Box width={100}>
                    <Typography>{row.created_date.split('T')[0]}</Typography>
                  </Box>
                </TableItem>
                <TableItem>
                  <Box
                    onError={({currentTarget}: { currentTarget: any }) => {
                      currentTarget.onerror = null;
                      currentTarget.src = '/images/no-image.jpg'
                    }}
                    component='img'
                    src={row.image ? `http://100.42.69.119:3000/images/${row.image}` : '/images/no-image.jpg'}
                    width={50}
                    height={50}
                    sx={{borderRadius: 100}}
                  />
                </TableItem>
                <TableItem>
                  <Typography sx={{width: 180}}>{row.propertyType}</Typography>
                </TableItem>
                <TableItem>
                  <Typography sx={{width: 250}}>
                    {row.location.country} - {row.location.city} - {row.location.state} - {row.location.municipality}
                  </Typography>
                </TableItem>
                <TableItem>
                  <Typography sx={{width: 130}}>{formatPrice(row.price)}</Typography>
                </TableItem>
                <TableItem>
                  <Typography sx={{width: 130}}>{formatPrice(row.price)}</Typography>
                </TableItem>
                <TableItem>
                  <Typography
                    sx={{width: 200}}>{owners && owners.length > 0 && `${owners[0].first_name} ${owners[0].last_name}`}</Typography>
                </TableItem>
                <TableItem>
                  <Typography sx={{width: 200}}>{row.operationType}</Typography>
                </TableItem>
                <TableItem>
                  <Typography sx={{width: 130}}>Aliado</Typography>
                </TableItem>
                <TableItem>
                  <Typography sx={{width: 130}}>Asesor</Typography>
                </TableItem>
                <TableItem>
                  <Typography sx={{width: 200}}>External capacitor</Typography>
                </TableItem>
                <TableItem>
                  <Typography sx={{width: 200}}>Motivo de operacion</Typography>
                </TableItem>
                <TableItem>
                  <Typography sx={{width: 200}}>{row.property_status}</Typography>
                </TableItem>
                <TableItem>
                  <Typography sx={{width: 200}}>Estatus documento</Typography>
                </TableItem>
                <TableItem>
                  <Typography>Nomenclatura 1</Typography>
                </TableItem>
                <TableItem>
                  <Typography sx={{width: 100}}>{row.footageGround}m²</Typography>
                </TableItem>
                <TableItem>
                  <Typography sx={{width: 130}}>{row.footageBuilding}m² </Typography>
                </TableItem>
                <TableItem>
                  <Typography sx={{width: 200}}>Material de piso </Typography>
                </TableItem>
                <TableItem>
                  <Typography sx={{width: 200}}>Comentarios de distribucion</Typography>
                </TableItem>
                <TableItem align='center'>
                  <Box>
                    <Box display='flex' alignItems='center'>
                      {
                        (currentUser.user_type === 'Administrador' || currentUser.user_type === 'Coordinador de servicios') &&
                        <>
                          <Tooltip title='Editar propiedad'>
                            <IconButton onClick={() => router.push(`/admin/propiedades/${row.id}`)}>
                              <EditIcon/>
                            </IconButton>
                          </Tooltip>
                          <Tooltip title='Cambiar estatus'>
                            <IconButton onClick={() => handleOpenStatusModal(row)}>
                              <AutorenewIcon/>
                            </IconButton>
                          </Tooltip>
                          <Tooltip title='Vista preeliminar '>
                            <IconButton onClick={() => handleGoToPrevisualize(row)}>
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
                    <Button variant='text' fullWidth size='small'
                            onClick={() => handleOpenHistoryModal(row.id)}>Ver
                      historial</Button>
                  </Box>
                </TableItem>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {
        (!properties.data || properties.data.length) < 1 &&
        <Box sx={{height: '50vh', display: 'flex', justifyContent: 'center', width: '100%', alignItems: 'center'}}>
          <Typography>No se encontradon propiedades...</Typography>
        </Box>
      }
      <Box sx={{display: 'flex', justifyContent: 'end', pt: 5}}>
        <Pagination
          boundaryCount={1}
          count={Math.ceil(properties?.data?.length / 10)}
          defaultPage={1}
          onChange={handleChangePage}
          page={page}
          showFirstButton
          showLastButton
        />
      </Box>

      <HistoryModal open={historyModal} close={() => setHistoryModal(false)} data={historyInfo}/>
      <ChangeStatusModal open={statusModal} close={() => setStatusModal(false)} data={statusInfo}
                         trigger={handleOpenCommissionModal} reload={() => reload()}/>
      <CommissionModal open={commissionModal} data={commissionInfo} close={() => setCommissionModal(false)}
                       reload={() => reload()}/>
    </>
  )
}
