export const notes = [
  {
    id: crypto.randomUUID(),
    name: 'Do house stuff',
    todos: [
      {
        id: crypto.randomUUID(),
        label: 'Clean the kitchen',
        value: true,
      },
      {
        id: crypto.randomUUID(),
        label: 'Dump the garbage',
        value: false,
      },
      {
        id: crypto.randomUUID(),
        label: 'Feed the dog',
        value: false,
      },
    ],
  },
  {
    id: crypto.randomUUID(),
    name: 'Pay taxes',
    todos: [
      {
        id: crypto.randomUUID(),
        label: 'Pay for electricity',
        value: false,
      },
      {
        id: crypto.randomUUID(),
        label: 'Pay the NDFL',
        value: false,
      },
    ],
  },
  {
    id: crypto.randomUUID(),
    name: 'Buy groceries',
    todos: [
      {
        id: crypto.randomUUID(),
        label: 'Sugar',
        value: false,
      },
      {
        id: crypto.randomUUID(),
        label: 'Pasta',
        value: true,
      },
      {
        id: crypto.randomUUID(),
        label: 'Meat',
        value: true,
      },
    ],
  },
];
