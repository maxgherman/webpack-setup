import { format } from 'date-fns'

export const Text = (data: string) => `${data}: Today is ${format(new Date(),  'EEEE')}`; 