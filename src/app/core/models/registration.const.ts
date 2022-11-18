import { Ticket } from './ticket.enum';

export const registrationFields = {
  [Ticket.ROJO]: {
    firstDay: [
      {
        field: 'checkInFirstDay',
        label: 'Check In',
      },
      {
        field: 'breakfastFirstDay',
        label: 'Desayuno',
      },
      {
        field: 'lunchFirstDay',
        label: 'Almuerzo',
      },
      {
        field: 'snackFirstDay',
        label: 'Refrigerio',
      },
    ],
    secondDay: [
      {
        field: 'checkInSecondDay',
        label: 'Check In',
      },
      {
        field: 'breakfastSecondDay',
        label: 'Desayuno',
      },
      {
        field: 'lunchSecondDay',
        label: 'Almuerzo',
      },
      {
        field: 'snackSecondDay',
        label: 'Refrigerio',
      },
    ],
    souvenirs: [
      {
        field: 'shirt',
        label: 'Polera',
      },
      {
        field: 'cup',
        label: 'Tomatodo',
      },
      {
        field: 'notebook',
        label: 'Cuaderno',
      },
    ],
  },
  [Ticket.AMARILLO]: {
    firstDay: [
      {
        field: 'checkInFirstDay',
        label: 'Check In',
      },
      {
        field: 'breakfastFirstDay',
        label: 'Desayuno',
      },
      {
        field: 'lunchFirstDay',
        label: 'Almuerzo',
      },
      {
        field: 'snackFirstDay',
        label: 'Refrigerio',
      },
    ],
    secondDay: [
      {
        field: 'checkInSecondDay',
        label: 'Check In',
      },
      {
        field: 'breakfastSecondDay',
        label: 'Desayuno',
      },
      {
        field: 'lunchSecondDay',
        label: 'Almuerzo',
      },
      {
        field: 'snackSecondDay',
        label: 'Refrigerio',
      },
    ],
    souvenirs: [
      {
        field: 'shirt',
        label: 'Polera',
      },
      {
        field: 'bracelet',
        label: 'Manilla',
      },
      {
        field: 'notebook',
        label: 'Cuaderno',
      },
    ],
  },
  [Ticket.VERDE]: {
    firstDay: [
      {
        field: 'checkInFirstDay',
        label: 'Check In',
      },
      {
        field: 'breakfastFirstDay',
        label: 'Desayuno',
      },
      {
        field: 'lunchFirstDay',
        label: 'Almuerzo',
      },
    ],
    secondDay: [
      {
        field: 'checkInSecondDay',
        label: 'Check In',
      },
      {
        field: 'breakfastSecondDay',
        label: 'Desayuno',
      },
      {
        field: 'lunchSecondDay',
        label: 'Almuerzo',
      },
    ],
    souvenirs: [
      {
        field: 'shirt',
        label: 'Polera',
      },
    ],
  },
  [Ticket.AZUL]: {
    firstDay: [
      {
        field: 'checkInFirstDay',
        label: 'Check In',
      },
      {
        field: 'breakfastFirstDay',
        label: 'Desayuno',
      },
    ],
    secondDay: [
      {
        field: 'checkInSecondDay',
        label: 'Check In',
      },
      {
        field: 'breakfastSecondDay',
        label: 'Desayuno',
      },
    ],
    souvenirs: [
      {
        field: 'shirt',
        label: 'Polera',
      },
      {
        field: 'bracelet',
        label: 'Manilla',
      },
      {
        field: 'notebook',
        label: 'Cuaderno',
      },
    ],
  },
};

export const workshops = [
  {
    field: 'firstWorkshop',
    label: 'Automatiza procesos en tus Angular Apps con Github Actions',
  },
  {
    field: 'secondWorkshop',
    label:
      'Crea tu propia inteligencia artificial con pocos conocimientos de programación',
  },
];
