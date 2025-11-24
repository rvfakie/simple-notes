<template>
  <div class="container">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 100%;
  max-width: 600px;
  padding: 24px;
  border-radius: 24px;

  background: var(--colors-primary);

  @include mobile {
    padding: 16px;

    @include ui-flex-vertical;
  }
}
</style>
