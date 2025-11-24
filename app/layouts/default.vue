<template>
  <main class="default-layout">
    <slot />
  </main>
</template>

<style lang="scss" scoped>
.default-layout {
  align-items: center;
  justify-content: center;
  padding: 16px;
  background: var(--colors-secondary);

  @include ui-flex-vertical;

  @include mobile {
    padding: 16px 0;
  }
}
</style>
