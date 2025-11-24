export interface Todo {
  id: string;
  label: string;
  value: boolean;
}

export interface EditableTodo extends Todo {
  edit: boolean;
  newLabel: string;
}

export interface Note {
  id: string;
  name: string;
  todos: Todo[];
}

export interface EditableNote extends Note {
  edit: boolean;
  newName: string;
  todos: EditableTodo[];
}
