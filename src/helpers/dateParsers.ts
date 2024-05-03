import {parse} from 'date-fns';

export const parseFrom24hTime = (dateString: string, referenceDate: Date) =>
  parse(dateString, 'HH:mm:ss', referenceDate);
