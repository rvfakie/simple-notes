<template>
  <input
    :type="type"
    :value="modelValue"
    class="ui-input"
    @[updateAction]="onChange"
  >
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  type?: 'text' | 'number' | 'password' | 'tel';
  modelValue: string | number;
  updateAction?: 'change' | 'input';
}>(), {
  type: 'text',
  updateAction: 'input',
  icon: undefined,
});

const emit = defineEmits<{
  'update:modelValue': [string]
}>();

const onChange = (event: Event) => {
  nextTick(() => emit('update:modelValue', (event.target as HTMLInputElement).value));
};
</script>

<style lang="scss" scoped>
.ui-input {
  width: 100%;
  height: 48px;
  padding: 12px 12px 12px 12px;
  border: 1px solid var(--colors-primary-border);
  border-radius: 12px;

  font-family: inherit;
  color: var(--colors-primary-text);
  text-overflow: ellipsis;

  background: var(--colors-input-background);
  outline: none;
  box-shadow: none;

  &::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: var(--colors-text-placeholder);
    opacity: 1; /* Firefox */
  }

  &::-ms-input-placeholder { /* Microsoft Edge */
    color: var(--colors-text-placeholder);
  }

  &:-ms-input-placeholder { /* Internet Explorer 10-11 */
    color: var(--colors-text-placeholder);
  }

  &[type='number'] {
    -moz-appearance: textfield;
    appearance: textfield;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      margin: 0;
      -webkit-appearance: none;
    }

    &::-moz-number-spin-box {
      display: none;
    }
  }

  // Error clause

  &[aria-invalid='true'] {
    border-color: var(--colors-error-border);
    background: var(--colors-error-background);
  }

  &:focus {
    border-color: var(--colors-input-border-active);
    box-shadow: 0px 4px 8px rgba(0, 0, 0, .1);
  }

  &:disabled {
    cursor: not-allowed;
    border-color: var(--colors-disabled-border);
    color: var(--colors-disabled-text);
    box-shadow: none;
  }

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    transition: background 0s 600000s, color 0s 600000s !important;
  }

  @include text-16;
}
</style>
