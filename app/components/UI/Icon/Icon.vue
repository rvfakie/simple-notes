<template>
  <component
    v-bind="{ ...$attrs, props }"
    :is="icon"
    :class="iconClassNames"
    role="img"
  />
</template>

<script lang="ts">
export const ICON_KEYS = [
  'arrow',
  'xmark',
  'plus',
  'check',
  'edit',
  'trash',
  'undo',
  'redo',
] as const;

export type IconKey = typeof ICON_KEYS[number];
// Helper function to create a type-safe icon mapping
export const createIconMapping = <T extends Record<IconKey, unknown>>(mapping: T): T => mapping;

export const iconMapping = createIconMapping({
  arrow: () => import('./templates/Arrow.vue'),
  xmark: () => import('./templates/Xmark.vue'),
  plus: () => import('./templates/Plus.vue'),
  edit: () => import('./templates/Edit.vue'),
  check: () => import('./templates/Check.vue'),
  trash: () => import('./templates/Trash.vue'),
  undo: () => import('./templates/Undo.vue'),
  redo: () => import('./templates/Undo.vue'),
});
</script>

<script setup lang="ts">
const props = defineProps<{
  name: IconKey;
}>();

defineOptions({
  inheritAttrs: false,
});

const icon = computed(() => defineAsyncComponent(iconMapping[props.name]));

const iconClassNames = computed(() => ({
  'ui-icon': true,
  inverse: props.name === 'redo',
}));
</script>

<style lang="scss" scoped>
.ui-icon {
  display: inline-block;
  font-size: 24px;
}

.inverse {
  transform: scale(-1, 1);
}
</style>
