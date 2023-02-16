import {formatDistanceToNow} from 'date-fns'
import {es} from 'date-fns/locale'


export const getformatDistanceToNow = (date: number) => {
  return   formatDistanceToNow(date, {locale: es})
}
