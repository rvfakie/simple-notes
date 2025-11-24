<template>
  <div class="container">
    <input
      v-bind="$attrs"
      v-model="model"
      class="input"
      type="checkbox"
    >

    <div class="imitator">
      <UIIcon
        class="icon"
        name="check"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
});

const model = defineModel<boolean>({ default: false });
</script>

<style lang="scss" scoped>
/* stylelint-disable no-descending-specificity */

.container {
  position: relative;
  flex: none;
  width: 24px;
  height: 24px;
}

.imitator {
  pointer-events: none;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;
  border: 1px solid var(--colors-primary-border);
  border-radius: 4px;

  background: var(--colors-white);

  transition: background-color .05s linear,
    border-color .05s linear;
}

.icon {
  color: var(--colors-primary);
  opacity: 0;
  transition: opacity .05s linear;
}

.input {
  position: absolute;

  overflow: hidden;

  white-space: nowrap;

  clip-path: rect(0 0 0 0);
  clip-path: inset(50%);

  &:focus + .imitator {
    outline: 1px dotted #212121;
    outline: 5px auto -webkit-focus-ring-color;
  }

  &:checked + .imitator {
    border-color: var(--colors-link);
    background: var(--colors-link);

    .icon {
      opacity: 1;
    }
  }
}
</style>
