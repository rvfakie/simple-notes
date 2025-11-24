<template>
  <div
    v-if="mutatedNote"
    class="todos"
  >
    <div
      v-for="todo in mutatedNote.todos"
      :key="todo.id"
      class="todo"
    >
      <label class="label">
        <UICheckbox
          v-model="todo.value"
          @change="onToggleTodo(todo)"
        />

        <UIInput
          v-if="todo.edit"
          v-model.trim="todo.newLabel"
          type="text"
        />

        <span
          v-else
          class="text"
        >
          {{ todo.label }}
        </span>

        <div
          class="actions"
          @click.prevent
        >
          <template v-if="todo.edit">
            <UIRoundButton
              icon="check"
              color="var(--colors-green-light)"
              @click="onConfirmEditTodo(todo)"
            />

            <UIRoundButton
              icon="xmark"
              color="var(--colors-primary)"
              @click="onCancelEditTodo(todo)"
            />
          </template>

          <template v-else>
            <UIRoundButton
              icon="trash"
              color="var(--colors-red-light)"
              @click="onRemoveTodo(todo.id)"
            />

            <UIRoundButton
              icon="edit"
              color="var(--colors-primary)"
              @click="onEditTodo(todo)"
            />
          </template>
        </div>
      </label>
    </div>

    <button
      class="add-todo-button"
      type="button"
      @click="onAddTodo"
    >
      Add todo

      <span class="add-todo-icon-container">
        <UIIcon name="plus" />
      </span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { v4 as uuidV4 } from 'uuid';
import type { EditableNote, EditableTodo } from '~/network/codecs';
import { useHistoryStore } from '~/stores/historyStore';

const mutatedNote = defineModel<EditableNote>();

const historyStore = useHistoryStore();

const onToggleTodo = (todo: EditableTodo) => {
  historyStore.pushAction({
    action: 'toggleTodo',
    undo: () => {
      todo.value = !todo.value;
    },
    redo: () => {
      todo.value = !todo.value;
    },
  });
};

const onEditTodo = (todo: EditableTodo) => {
  todo.edit = true;
};

const onCancelEditTodo = (todo: EditableTodo) => {
  todo.newLabel = todo.label;
  todo.edit = false;
};

const onConfirmEditTodo = (todo: EditableTodo) => {
  const oldLabel = todo.label;
  const newLabel = todo.newLabel;

  if (oldLabel !== newLabel) {
    todo.label = newLabel;
    todo.edit = false;

    historyStore.pushAction({
      action: 'renameTodo',
      undo: () => {
        todo.label = oldLabel;
        todo.newLabel = oldLabel;
      },
      redo: () => {
        todo.label = newLabel;
        todo.newLabel = newLabel;
      },
    });
  } else {
    todo.edit = false;
  }
};

const onAddTodo = () => {
  if (mutatedNote.value) {
    const label = 'New todo';

    const newTodo = {
      id: uuidV4(),
      label,
      value: false,
      edit: false,
      newLabel: label,
    };

    mutatedNote.value.todos.push(newTodo);

    historyStore.pushAction({
      action: 'addTodo',
      undo: () => {
        if (mutatedNote.value) {
          const index = mutatedNote.value.todos.findIndex((t: EditableTodo) => t.id === newTodo.id);

          if (index !== -1) {
            mutatedNote.value.todos.splice(index, 1);
          }
        }
      },
      redo: () => {
        if (mutatedNote.value) {
          mutatedNote.value.todos.push(newTodo);
        }
      },
    });
  }
};

const onRemoveTodo = (todoId: string) => {
  if (mutatedNote.value) {
    const todoToDelete = mutatedNote.value.todos.find((todo: EditableTodo) => todo.id === todoId);

    if (!todoToDelete) {
      return;
    }

    const todoIndex = mutatedNote.value.todos.findIndex((todo: EditableTodo) => todo.id === todoId);

    mutatedNote.value.todos = mutatedNote.value.todos.filter((todo: EditableTodo) => todo.id !== todoId);

    historyStore.pushAction({
      action: 'deleteTodo',
      undo: () => {
        if (mutatedNote.value) {
          mutatedNote.value.todos.splice(todoIndex, 0, todoToDelete);
        }
      },
      redo: () => {
        if (mutatedNote.value) {
          mutatedNote.value.todos = mutatedNote.value.todos.filter((todo: EditableTodo) => todo.id !== todoId);
        }
      },
    });
  }
};
</script>

<style lang="scss" scoped>
.todos {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 8px;
}

.todo {
  display: flex;
  gap: 16px;
  align-items: center;
}

.label {
  cursor: pointer;

  display: flex;
  flex: 1;
  gap: 16px;
  align-items: center;
  justify-content: flex-start;

  width: 100%;
  min-height: 72px;
  padding: 8px 16px;
  border-radius: 16px;

  background: var(--colors-secondary);

  @include text-16;
}

.text {
  overflow: hidden;
  text-overflow: ellipsis;
}

.actions {
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: flex-end;

  margin-left: auto;
}

.add-todo-button {
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: space-between;

  height: 70px;
  padding: 0 16px;
  border-radius: 16px;

  font-family: inherit;
  font-weight: 600;
  text-align: left;

  background: var(--colors-secondary);

  @include text-16;
}

.add-todo-icon-container {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 40px;
  height: 40px;
}
</style>
