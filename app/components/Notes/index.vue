<template>
  <Box>
    <div class="inner">
      <h1>
        My notes
      </h1>

      <div class="list">
        <template v-if="notes.length">
          <NotesListItem
            v-for="note in notes"
            :key="note.id"
            :note="note"
            @remove="onRemoveNote"
          />
        </template>

        <template v-else>
          <p class="text">
            There is no notes yet.
          </p>

          <p class="text">
            You can add them by yourself or

            <span
              class="fake-link"
              @click="onGenerate"
            >generate</span>

            for demo purpose.
          </p>
        </template>
      </div>

      <UIButton @click="onAddNote">
        Create new
      </UIButton>
    </div>
  </Box>

  <UIModal
    :show="!!noteIdToRemove"
    @close="noteIdToRemove = null"
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

      <UIButton @click="noteIdToRemove = null">
        Cancel
      </UIButton>
    </template>
  </UIModal>
</template>

<script setup lang="ts">
import { useNotesStore } from '~/stores/notesStore';

const notesStore = useNotesStore();
const router = useRouter();

const notes = ref(JSON.parse(JSON.stringify(notesStore.notes)));

const onAddNote = () => {
  const id = crypto.randomUUID();

  notesStore.add({
    id,
    name: 'New note',
    todos: [],
  });

  router.push(`/notes/${id}`);
};

const noteIdToRemove = ref<string | null>(null);

const onRemoveNote = (id: string) => {
  noteIdToRemove.value = id;
};

const onRemoveNoteConfirm = () => {
  if (noteIdToRemove.value) {
    notesStore.remove(noteIdToRemove.value);
    notes.value = JSON.parse(JSON.stringify(notesStore.notes));

    noteIdToRemove.value = null;
  }
};

const onGenerate = () => {
  notesStore.generate();

  notes.value = JSON.parse(JSON.stringify(notesStore.notes));
};
</script>

<style lang="scss" scoped>
.inner {
  display: flex;
  flex-direction: column;
  gap: 24px;

  @include mobile {
    flex-grow: 1;
    gap: 16px;
  }
}

.list {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 16px;
}

.text {
  @include text-16-18;
}

.fake-link {
  color: var(--colors-link);
  text-decoration: underline;

  @include ui-default-hover;
}
</style>
