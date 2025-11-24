import { v4 as uuidV4 } from 'uuid';

export const notes = [
  {
    id: uuidV4(),
    name: 'Do house stuff',
    todos: [
      {
        id: uuidV4(),
        label: 'Clean the kitchen',
        value: true,
      },
      {
        id: uuidV4(),
        label: 'Dump the garbage',
        value: false,
      },
      {
        id: uuidV4(),
        label: 'Feed the dog',
        value: false,
      },
    ],
  },
  {
    id: uuidV4(),
    name: 'Pay taxes',
    todos: [
      {
        id: uuidV4(),
        label: 'Pay for electricity',
        value: false,
      },
      {
        id: uuidV4(),
        label: 'Pay the NDFL',
        value: false,
      },
    ],
  },
  {
    id: uuidV4(),
    name: 'Buy groceries',
    todos: [
      {
        id: uuidV4(),
        label: 'Sugar',
        value: false,
      },
      {
        id: uuidV4(),
        label: 'Pasta',
        value: true,
      },
      {
        id: uuidV4(),
        label: 'Meat',
        value: true,
      },
    ],
  },
];
