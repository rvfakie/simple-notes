<template>
  <NuxtLink
    :to="`/notes/${note.id}`"
    class="link"
  >
    <p class="title">
      {{ note.name }}
    </p>

    <p class="info">
      <template v-if="todos.length">
        <span>
          <span class="name">
            {{ todos[0]?.label }}
          </span>

          <template v-if="todos.length > 1">
            and {{ todos.length - 1 }} more
          </template>
        </span>

        <span :class="['completed', { 'done': todos.length > 0 && completedTodos === todos.length }]">
          {{ completedTodos }} of {{ todos.length }} completed
        </span>
      </template>

      <template v-else>
        No todos yet
      </template>
    </p>

    <div class="actions">
      <UIRoundButton
        icon="trash"
        color="var(--colors-red-light)"
        @click.prevent="onRemoveNote"
      />
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { Note } from '~/network/codecs';

const props = defineProps<{
  note: Note
}>();

const emit = defineEmits<{
  remove: [string]
}>();

const todos = computed(() => props.note.todos);

const completedTodos = computed(() => todos.value.reduce((acc, curr) => {
  if (curr.value) {
    acc = acc + 1;
  }

  return acc;
}, 0));

const onRemoveNote = () => {
  emit('remove', props.note.id);
};
</script>

<style lang="scss" scoped>
.link {
  display: flex;
  gap: 16px;
  align-items: center;
  justify-content: space-between;

  min-height: 72px;
  padding: 16px;
  border-radius: 16px;

  background: var(--colors-secondary);

  &.done {
    background: var(--colors-green-light);
  }

  @include ui-default-hover;

  @include mobile {
    flex-wrap: wrap;
  }
}

.title {
  font-weight: 500;

  @include text-20;
}

.info {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  text-align: right;

  @include mobile {
    flex-basis: 100%;
    gap: 8px;
    order: 3;
    text-align: left;
  }
}

.name {
  font-weight: 600;
}

.completed {
  color: var(--colors-primary-low-contrast);

  &.done {
    color: var(--colors-green-medium);
  }

  @include text-12-14;
}

.actions {

  @include mobile {
    order: 2;
  }
}
</style>
