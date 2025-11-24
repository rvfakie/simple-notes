<template>
  <NuxtLayout name="default">
    <section
      v-if="error"
      class="error-wrapper"
    >
      <div class="container">
        <h2 class="title">
          {{ error.statusCode }}
        </h2>

        <p class="subtitle">
          {{ errorText }}
        </p>

        <code class="code">{{ error.statusMessage }}</code>

        <div class="buttons">
          <!-- <UIButton to="/">
            Вернуться на главную
          </UIButton> -->
        </div>
      </div>
    </section>
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app';

const { error = null } = defineProps<{
  error: NuxtError | Error & { statusCode: number; statusMessage: string }
}>();

const errorText = computed(() => {
  if (error) {
    // Error came from server
    if (error instanceof Error) {
      return error.message;
    }

    // Error came from Nuxt (e.g Page not found)
    const nuxtError = error as NuxtError;

    if (nuxtError.statusCode === 404) {
      return 'Страница не найдена';
    }

    if (nuxtError.statusCode === 500) {
      return 'Произошла ошибка';
    }
  }
});
</script>

<style lang="scss" scoped>
.error-wrapper {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 32px;
  align-items: center;
  justify-content: center;

  padding: 40px;
}

.container {
  display: flex;
  flex-direction: column;
  gap: 32px;
  align-items: center;

  width: 100%;
}

.title {
  font-size: 164px;
  font-weight: 900;
  line-height: 130px;
}

.subtitle {
  font-weight: 500;

  @include text-24;
}

.code {
  max-width: 100%;
  padding: 16px 24px;
  border: 1px solid var(--colors-primary-border);
  border-radius: 8px;

  overflow-wrap: break-word;

  background: var(--colors-secondary);

  @include mobile {
    padding: var(--store-layout-side-padding);
  }
}

.buttons {
  display: flex;
  gap: 16px;
  justify-content: center;
  width: 100%;

  @include mobile {
    flex-direction: column;
  }
}
</style>
