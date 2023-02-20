export interface Formatclients {
  id: number | string;
  contact: string
  property: string
  location: string
  lease_fee: number
  lease_fee_status: string
  owner_payment_status: string
  status_condo_cleanliness_payment: string
  status_electricity_payment: string
  date_to_collect_lease_fee: string
  next_adjustment: string
  next_subcription: string
  observations: string
  // Consulta: string
  january: Month
  february: Month
  march: Month
  april: Month
  may: Month
  june: Month
  july: Month
  august: Month
  september: Month
  october: Month
  november: Month
  december: Month
}

interface Month {
  text: string
}

export const FORMAT_CLIENTS = [
  {
    id: 1,
    contact: 'MArio Tovar',
    property: 'E-06',
    location: 'C.C Free Market',
    lease_fee: 250,
    lease_fee_status: 'SOLVENTE DICIEMBRE',
    owner_payment_status: 'PAGADO',
    status_condo_cleanliness_payment: 'N/A',
    status_electricity_payment: 'N/A',
    date_to_collect_lease_fee: '01 al 05',
    next_adjustment: '2/8/2023',
    next_subcription: '8/8/2023',
    observations: 'Pagos 8 Dias de noviembre // pendiente por ajustar fecha de contrato, y en proxima suscripcion, usar esa fecha// FIRMA ACLARATORIA E-06 y verificar doc de arendamiento que se firmo para alcaldia',
    // Consulta en esta tabla los meses seran dinamicos o no cambiaran ?? no comprendi en el excel...
    january: {text: ''},
    february: {text: ''},
    march: {text: ''},
    april: {text: ''},
    may: {text: ''},
    june: {text: ''},
    july: {text: ''},
    august: {text: 'Traspaso local de Maria Eloisa a Mario '},
    september: {text: ''},
    october: {text: 'Resta 433.33$ - de los dos meses de deposito'},
    november: {text: ''},
    december: {text: ''},
  }
]
