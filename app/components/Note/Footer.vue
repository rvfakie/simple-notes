<template>
  <div class="footer">
    <UIButton
      :disabled="saveDisabled"
      color="green"
      @click="onSaveNote"
    >
      Save
    </UIButton>

    <UIButton
      color="red"
      @click="onRemoveNote"
    >
      Delete note
    </UIButton>
  </div>
</template>

<script setup lang="ts">
import type { EditableTodo, EditableNote, Note } from '~/network/codecs';
import { useHistoryStore } from '~/stores/historyStore';
import { useNotesStore } from '~/stores/notesStore';

const props = defineProps<{
  noteId: string;
}>();

const mutatedNote = defineModel<EditableNote>('mutatedNote');
const note = defineModel<Note>('note');

const historyStore = useHistoryStore();
const notesStore = useNotesStore();
const router = useRouter();

const onSaveNote = () => {
  if (note.value && mutatedNote.value) {
    note.value.name = mutatedNote.value.name;

    note.value.todos = mutatedNote.value.todos.map((todo: EditableTodo) => ({
      id: todo.id,
      label: todo.label,
      value: todo.value,
    }));

    notesStore.save();
    router.push('/');
  }
};

const onRemoveNote = () => {
  notesStore.remove(props.noteId);

  router.push('/');
};

const isEditingActive = computed(() =>
  mutatedNote.value?.edit || mutatedNote.value?.todos.some(todo => todo.edit));

const saveDisabled = computed(() => isEditingActive.value || !historyStore.canUndo);
</script>

<style lang="scss" scoped>
.footer {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
