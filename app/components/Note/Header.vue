<template>
  <div class="note-header">
    <UIRoundButton
      icon="arrow"
      color="var(--colors-primary)"
      @click="onBackClick"
    />

    <div class="history-actions">
      <UIRoundButton
        :disabled="!historyStore.canUndo"
        icon="undo"
        color="var(--colors-primary)"
        @click="historyStore.undo"
      />

      <UIRoundButton
        :disabled="!historyStore.canRedo"
        icon="redo"
        color="var(--colors-primary)"
        @click="historyStore.redo"
      />
    </div>
  </div>

  <UIModal
    :show="isShowDiscardModal"
    @close="isShowDiscardModal = false"
  >
    <template #modal-heading>
      Discard changes?
    </template>

    <p class="modal-text">
      Any unsaved data <b>will be lost</b>
    </p>

    <template #modal-footer>
      <UIButton
        color="green"
        @click="leave"
      >
        Leave anyway
      </UIButton>

      <UIButton @click="isShowDiscardModal = false">
        Stay
      </UIButton>
    </template>
  </UIModal>
</template>

<script setup lang="ts">
import { useNotesStore } from '~/stores/notesStore';
import { useHistoryStore } from '~/stores/historyStore';

const noteStore = useNotesStore();
const historyStore = useHistoryStore();
const router = useRouter();

const isShowDiscardModal = ref(false);

const onBackClick = () => {
  if (historyStore.canUndo) {
    isShowDiscardModal.value = true;
  } else {
    leave();
  }
};

const leave = () => {
  isShowDiscardModal.value = false;

  noteStore.restore();
  router.push('/');
};
</script>

<style lang="scss" scoped>
.note-header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  @include mobile {
    padding: 0 16px;
  }
}

.history-actions {
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: flex-start;
}
</style>
