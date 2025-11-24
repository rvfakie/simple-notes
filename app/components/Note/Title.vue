<template>
  <div
    v-if="mutatedNote"
    class="note-title"
  >
    <UIInput
      v-if="mutatedNote.edit"
      v-model="mutatedNote.newName"
    />

    <h1 v-else>
      {{ mutatedNote.name }}
    </h1>

    <div class="actions">
      <template v-if="mutatedNote.edit">
        <UIRoundButton
          icon="check"
          color="var(--colors-green-light)"
          @click="onConfirmEditNote"
        />

        <UIRoundButton
          icon="xmark"
          @click="onCancelEditNote"
        />
      </template>

      <template v-else>
        <UIRoundButton
          icon="edit"
          @click="onEditNote"
        />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { EditableNote } from '~/network/codecs';
import { useHistoryStore } from '~/stores/historyStore';

const mutatedNote = defineModel<EditableNote>();

const historyStore = useHistoryStore();

const onEditNote = () => {
  if (mutatedNote.value) {
    mutatedNote.value.edit = true;
  }
};

const onCancelEditNote = () => {
  if (mutatedNote.value) {
    mutatedNote.value.newName = mutatedNote.value.name;
    mutatedNote.value.edit = false;
  }
};

const onConfirmEditNote = () => {
  if (mutatedNote.value) {
    const oldName = mutatedNote.value.name;
    const newName = mutatedNote.value.newName;

    if (oldName !== newName) {
      mutatedNote.value.name = newName;
      mutatedNote.value.edit = false;

      historyStore.pushAction({
        action: 'renameNote',
        undo: () => {
          if (mutatedNote.value) {
            mutatedNote.value.name = oldName;
            mutatedNote.value.newName = oldName;
          }
        },
        redo: () => {
          if (mutatedNote.value) {
            mutatedNote.value.name = newName;
            mutatedNote.value.newName = newName;
          }
        },
      });
    } else {
      mutatedNote.value.edit = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.note-title {
  display: flex;
  gap: 16px;
  align-items: center;
  justify-content: space-between;
}

.actions {
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: flex-end;

  margin-left: auto;
}
</style>
