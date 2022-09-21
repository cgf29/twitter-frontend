import {formatDistance} from 'date-fns'

export const formatDate = date => {
   return formatDistance(date, new Date())
}