<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="show"
        class="modal-mask"
        @click="$emit('close')"
      >
        <div
          class="modal-container"
          @click.stop
        >
          <div class="modal-header">
            <div
              v-if="$slots['modal-heading']"
              class="modal-heading"
            >
              <slot name="modal-heading" />
            </div>

            <UIRoundButton
              icon="xmark"
              @click="$emit('close')"
            />
          </div>

          <div class="modal-content">
            <slot />
          </div>

          <div
            v-if="$slots['modal-footer']"
            class="modal-footer"
          >
            <slot name="modal-footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
const props = defineProps<{
  show: boolean;
}>();

defineEmits<{
  close: []
}>();

watch(
  () => props.show,
  (value) => {
    if (value) {
      document.body.classList.add('scroll-locked');
    } else {
      document.body.classList.remove('scroll-locked');
    }
  },
);
</script>

<style lang="scss" scoped>
.modal-mask {
  will-change: opacity;

  position: fixed;
  z-index: 9998;
  top: 0;
  inset-inline-start: 0;

  overflow-y: scroll;
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;
  padding-top: 78px;
  padding-bottom: 78px;

  background-color: rgba(0, 0, 0, .75);

  transition: opacity .3s ease;

  @include mobile {
    padding: 48px 4px 0;
  }
}

.modal-container {
  will-change: transform;

  transform: translate3d(0, 0, 0);

  display: flex;
  flex-direction: column;

  width: 100%;
  max-width: 500px;
  margin: auto;
  border-radius: 16px;

  background: var(--colors-primary);

  transition: transform .3s ease;

  @include mobile {
    max-width: none;
    margin-top: auto;
    margin-bottom: 0;
    border-radius: 20px 20px 0 0;
  }
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  transform: translate3d(0, 100%, 0);
}

.modal-header {
  display: flex;
  justify-content: flex-end;

  padding: 18px 16px;
  border-bottom: 1px solid var(--colors-primary-border-light);

  font-weight: 500;
  color: var(--colors-primary-text);

  @include text-24;
}

.modal-heading {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  padding-left: 40px;
}

.modal-content {
  padding: 18px 16px;
}

.modal-footer {
  display: flex;
  flex-direction: column;
  gap: 8px;

  padding: 16px;
  border-top: 1px solid var(--colors-primary-border-light);
}
</style>
