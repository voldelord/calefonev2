import {format} from 'date-fns';

export const formatToDateOnly = (date: Date | string | number) =>
  format(date, 'dd/MM/yyyy');
