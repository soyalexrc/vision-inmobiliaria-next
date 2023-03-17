import {formatDistanceToNow} from 'date-fns'
import {es} from 'date-fns/locale'


export const getformatDistanceToNow = (date: number) => {
  return   formatDistanceToNow(date, {locale: es})
}

export const MONTHS = [
  'ENERO',
  'FEBRERO',
  'MARZO',
  'ABRIL',
  'MAYO',
  'JUNIO',
  'JULIO',
  'AGOSTO',
  'SEPTIEMBRE',
  'OCTUBRE',
  'NOVIEMBRE',
  'DICIEMBRE'
]
