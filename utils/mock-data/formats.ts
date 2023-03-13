import {Formatclients, FormatCashFlow, FormatCommissionCalculation} from "../../interfaces";



export const FORMAT_CLIENTS: Formatclients[] = [
  {
    id: 1,
    tenant: 'sampke tenant',
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
    january: '',
    february: '',
    march: '',
    april: '',
    may: '',
    june: '',
    july: '',
    august: '',
    september: '',
    october: '',
    november: '',
    december: '',
  }
]

export const CASH_FLOW: FormatCashFlow[] = [
  {
    id: 1,
    month: 'DICIEMBRE',
    date: '12/15/2022',
    property: 'LOCAL T-07 CC FREE MARKET',
    client: 'GABRIELA',
    reason: 'CANON DICIEMBRE',
    service: 'ADMINISTRATIVO',
    transaction_type: 'Ingreso $', // opciones: ['Ingreso Bs', 'Egreso Bs', 'Ingreso $', 'Egreso $', ;Comision Bancaria]
    amount: 150,
    total_due: 135,
    pending_to_collect: 0,
    way_to_pay: 'Efectivo', // opciones: ['Zelle', 'Transferencia', 'Efectivo', 'Comision Bancaria']
    location: 'Oficina', // opciones: ['Banesco panama', 'Banco de terceros', 'Banco de venezuela', 'Banco banesco', 'BNC', 'Oficina', 'MG Valencia', 'MG San carlos']
    amount_inserted_third_party_banks: 0,
    status: 'POR PAGAR A TERCEROS', // opciones: ['Por cobrar', 'por pagar a terceros', 'Gastos Personales MG']
  }
]

export const FORMAT_COMMISSION_CALCULATION: FormatCommissionCalculation[] = [
  {
    id: 1,
    date_application: '12/02/2022',
    bill_number: 1,
    property: 'Cara Urb Las Quintas',
    client: 'BEATRIZ BAZARTE',
    adviser_in_charge: 'MARIA GONNZALES',
    procedure: 'HABILIDAD COMERCIAL',
    status: 'EN CURSO', // opciones ['CULMINADO', 'EN CURSO']
    price_procedure: 200,
    total_paid: 200,
    total_due: 0,
    price_per_stage_process: 80,
    expenses: 2,
    lawyer_calculation_20: 0,
    lawyer_calculation_30: 0,
    lawyer_calculation_40: 31.20,
    adviser_calculation_10: 7.80,
    company_profit: 39,
    stationary: 2,
    total_paid_lawyer: 31.19,
    total_due_lawyer: 0.01,
    payment_date_lawyer: null,
    status_lawyer: 'PAGADO',
    total_paid_adviser: 0,
    total_due_adviser: 0.01,
    payment_date_adviser: null,
    status_adviser: null
  }
]
