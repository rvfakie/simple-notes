<template>
  <button
    :class="['ui-button', `color-${color}`]"
    :type="type"
  >
    <slot name="default" />
  </button>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  type?: 'submit' | 'button' | 'reset';
  color?: 'primary' | 'green' | 'red';
}>(), {
  type: 'button',
  color: 'primary',
});
</script>

<style lang="scss" scoped>
.ui-button {
  cursor: pointer;
  user-select: none;

  position: relative;

  padding: 12px 24px;
  border: 1px solid transparent;
  border-radius: 16px;

  font-family: inherit;
  font-weight: 500;
  text-align: center;

  &.color-primary {

    &:not([disabled]) {
      border-color: var(--colors-primary-border);
      color: var(--colors-primary-text);
      background-color: var(--colors-primary);

      &:focus,
      &:active {
        background-color: var(--colors-primary-press);
      }

      &:not(:focus),
      &:not(:active) {
        @include hoverable {

          &:hover {
            background-color: var(--colors-primary-hover);
          }
        }
      }
    }
  }

  &.color-green {

    &:not([disabled]) {
      color: var(--colors-green-dark);
      background-color: var(--colors-green-light);

      &:focus,
      &:active {
        background-color: var(--colors-green-press);
      }

      &:not(:focus),
      &:not(:active) {
        @include hoverable {

          &:hover {
            background-color: var(--colors-green-hover);
          }
        }
      }
    }
  }

  &.color-red {

    &:not([disabled]) {
      color: var(--colors-red-dark);
      background-color: var(--colors-red-light);

      &:focus,
      &:active {
        background-color: var(--colors-red-press);
      }

      &:not(:focus),
      &:not(:active) {
        @include hoverable {

          &:hover {
            background-color: var(--colors-red-hover);
          }
        }
      }
    }
  }

  &:disabled {
    cursor: not-allowed;
    color: var(--colors-disabled-text);
    background-color: var(--colors-disabled-border);
  }

  @include text-16;
}
</style>
