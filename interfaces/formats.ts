export interface Formatclients {
  id: number | string;
  contact: string
  tenant: string
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
  january: string;
  february: string;
  march: string;
  april: string;
  may: string;
  june: string;
  july: string;
  august: string;
  september: string;
  october: string;
  november: string;
  december: string;
}

export interface FormatCashFlow {
  month: string;
  id: number | string;
  client: string;
  type_of_service: string;
  type_of_property: string;
  canon?: string;
  currency: string;
  guarantee?: string;
  tax_payer?: string;
  contract?: string;
  date: string;
  property: string;
  reason: string;
  service: string;
  transaction_type: TransactionTypeOption,
  amount: number | string;
  total_due: number | string;
  pending_to_collect: string | number;
  way_to_pay: WayToPayOption;
  entity: EntityOption;
  location: string;
  observations: string;
}

export interface FormatCommissionCalculation {
  id: number | string;
  date_application: string;
  bill_number: number;
  property: string;
  client: string;
  adviser_in_charge: any;
  procedure: string;
  status: StatusCommissionCalculation;
  price_procedure: number;
  total_paid: number;
  total_due: number;
  price_per_stage_process: number;
  expenses: number;
  lawyer_calculation_20: number;
  lawyer_calculation_30: number;
  lawyer_calculation_40: number;
  adviser_calculation_10: number;
  company_profit: number;
  stationary: number;
  total_paid_lawyer: number;
  total_due_lawyer: number;
  payment_date_lawyer: null | string ;
  status_lawyer: string //checar si hay tipos de status;
  total_paid_adviser: number;
  total_due_adviser: number;
  payment_date_adviser: null | string ;
  status_adviser: null | string;
}

type StatusCommissionCalculation = 'EN CURSO' | 'CULMINADO'
type TransactionTypeOption = 'Ingreso' | 'Egreso' | 'Cuenta por cobrar' | 'Cuenta por pagar' | 'Interbancaria'
type WayToPayOption = 'Efectivo' | 'Zelle' | 'Transferencia' | 'Pago Movil'
type EntityOption = 'Banco Nacional de Terceros'| 'Banesco Panamá' | 'Banesco de terceros' | 'Banesco Venezuela'  | 'Banco Nacional de Crédito (BNC)' | 'Oficina Paseo La Granja' | 'Oficina San Carlos' | 'Tesorería'
type StatusOption = 'POR PAGAR A TERCEROS' | 'POR COBRAR' | 'GASTOS PERSONALES MG'
