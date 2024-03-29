export const DAY_MAPPING = {
  0: 'Domingo',
  1: 'Lunes',
  2: 'Martes',
  3: 'Miercoles',
  4: 'Jueves',
  5: 'Viernes',
  6: 'Sábado',
};

export const getDaysTextFromRecurrence = recurrence =>
  recurrence
    .sort()
    .map(day => DAY_MAPPING[day])
    .join(', ');
