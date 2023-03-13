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
