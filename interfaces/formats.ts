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
  date: string;
  property: string;
  reason: string;
  service: string;
  transaction_type: TransactionTypeOption,
  amount: number | string;
  total_due: number | string;
  pending_to_collect: string | number;
  way_to_pay: WayToPayOption;
  location: LocationOption;
  amount_inserted_third_party_banks: number | string;
  status: StatusOption;
}

export interface FormatCommissionCalculation {
  id: number | string;
  date_application: string;
  bill_number: number;
  property: string;
  client: string;
  adviser_in_charge: string;
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
type TransactionTypeOption = 'Ingreso Bs' | 'Egreso Bs' | 'Ingreso $' | 'Egreso $' | 'Comision Bancaria'
type WayToPayOption = 'Efectivo' | 'Zelle' | 'Transferencia' | 'Comision Bancaria'
type LocationOption = 'Oficina' | 'Banesco Panama' | 'Banesco de terceros' | 'Banco de Venezuela' | 'Banco Banesco' | 'BNC'
type StatusOption = 'POR PAGAR A TERCEROS' | 'POR COBRAR' | 'GASTOS PERSONALES MG'
