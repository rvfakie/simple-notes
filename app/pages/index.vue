<template>
  <Notes />
</template>

<script setup lang="ts">
import { useHistoryStore } from '~/stores/historyStore';

const historyStore = useHistoryStore();

historyStore.clearHistory();
</script>
