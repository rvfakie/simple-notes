<template>
  <Note />
</template>

<script setup lang="ts">
import { useNotesStore } from '~/stores/notesStore';

definePageMeta({
  middleware: [
    (to) => {
      const noteStore = useNotesStore();

      if (!noteStore.getNote(to.params.id as string)) {
        return navigateTo('/');
      }
    },
  ],
});
</script>
