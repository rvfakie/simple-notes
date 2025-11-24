<template>
  <button
    :style="{ 'background': color }"
    class="round-button"
    type="button"
  >
    <UIIcon :name="icon" />
  </button>
</template>

<script setup lang="ts">
import type { IconKey } from '~/components/UI/Icon/Icon.vue';

withDefaults(defineProps<{
  color?: string;
  icon: IconKey;
}>(), {
  color: 'var(--colors-secondary)',
});
</script>

<style lang="scss" scoped>
.round-button {
  cursor: pointer;

  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;

  width: 40px;
  height: 40px;
  border-radius: 50%;

  &:disabled {
    cursor: not-allowed;
    opacity: .5;
  }

  &:not(:disabled) {
    @include ui-default-hover;
  }
}
</style>
