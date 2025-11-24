<template>
  <div class="root">
    <NoteHeader />

    <Box v-if="mutatedNote">
      <div class="inner">
        <!--
          We could pass the mutatedNote as a prop and update it with emits
          but it will force us to store all of the methods in one file.
          ***
          Both variants are legit in this app.
        -->
        <NoteTitle v-model="mutatedNote" />

        <NoteTodoList v-model="mutatedNote" />

        <NoteFooter
          v-model:mutatedNote="mutatedNote"
          v-model:note="note"
          @remove-note="isRemoveNoteModalOpen = true"
        />
      </div>
    </Box>
  </div>

  <UIModal
    :show="isRemoveNoteModalOpen"
    @close="isRemoveNoteModalOpen = false"
  >
    <template #modal-heading>
      Remove note?
    </template>

    <p class="text">
      This action <b>cannot be undone</b>
    </p>

    <template #modal-footer>
      <UIButton
        color="green"
        @click="onRemoveNoteConfirm"
      >
        Remove
      </UIButton>

      <UIButton @click="isRemoveNoteModalOpen = false">
        Cancel
      </UIButton>
    </template>
  </UIModal>
</template>

<script setup lang="ts">
import type { Todo, Note } from '~/network/codecs';
import { useNotesStore } from '~/stores/notesStore';

const notesStore = useNotesStore();

const router = useRouter();
const route = useRoute();

const note = notesStore.getNote(route.params.id as string);

const mutatedNote = ref({
  ...note as Note,
  edit: false,
  newName: note?.name || '',

  todos: note?.todos.map((todo: Todo) => ({
    ...todo,
    edit: false,
    newLabel: todo.label,
  })) || [],
});

const isRemoveNoteModalOpen = ref(false);

const onRemoveNoteConfirm = () => {
  notesStore.remove(route.params.id as string);

  isRemoveNoteModalOpen.value = false;

  router.replace('/');
};
</script>

<style lang="scss" scoped>
.root {
  display: flex;
  flex-direction: column;
  gap: 16px;

  width: 100%;
  max-width: 600px;

  @include mobile {
    flex-grow: 1;
    max-width: none;
  }
}

.inner {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 24px;

  @include mobile {
    gap: 16px;
  }
}
</style>
