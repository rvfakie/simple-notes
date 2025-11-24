import { useNotesStore } from '~/stores/notesStore';

export default defineNuxtPlugin(() => {
  const notesStore = useNotesStore();

  notesStore.restore();
});
