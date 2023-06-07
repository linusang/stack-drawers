<script lang="ts">
  import { computed, defineComponent, ref } from "vue";

  export default defineComponent({
    inheritAttrs: false,
  });
</script>
<script setup lang="ts">
  interface Props {
    side?: "bottom" | "left" | "right";
    containerCss?: string;
    backdropCss?: string;
  }

  const props = withDefaults(defineProps<Props>(), {
    side: "bottom",
    containerCss: "",
    backdropCss: "bg-slate-800/50",
  });

  interface Emits {
    (e: "backdrop-clicked"): void;
    (e: "opening"): void;
    (e: "opened"): void;
    (e: "closing"): void;
    (e: "closed"): void;
  }

  defineEmits<Emits>();

  const isOpened = ref(false);

  function open() {
    isOpened.value = true;
  }
  function close() {
    isOpened.value = false;
  }

  defineExpose({
    open,
    close,
  });

  const computedCss = computed(() => {
    let css = "";
    switch (props.side) {
      case "bottom":
        css = "left-0 right-0 bottom-0";
        break;
      case "left":
        css = "left-0 top-0 bottom-0";
        break;
      case "right":
        css = "right-0 top-0 bottom-0";
        break;
    }
    return css;
  });

  const computedTranslate = computed(() => {
    let css = "";
    switch (props.side) {
      case "bottom":
        css = "translate-y-full";
        break;
      case "left":
        css = "-translate-x-full";
        break;
      case "right":
        css = "translate-x-full";
        break;
    }
    return css;
  });

  const computedTransformValue = computed(() => {
    let transformValue = "none";
    switch (props.side) {
      case "bottom":
        transformValue = "translate(0, 100%)";
        break;
      case "left":
        transformValue = "translate(-100%, 0)";
        break;
      case "right":
        transformValue = "translate(100%, 0)";
        break;
    }
    return transformValue;
  });
</script>
<template>
  <Transition
    name="slide-panel"
    :duration="{ enter: 300, leave: 300 }"
    @before-enter="$emit('opening')"
    @after-enter="$emit('opened')"
    @before-leave="$emit('closing')"
    @after-leave="$emit('closed')"
  >
    <div v-if="isOpened" class="fixed inset-0" :class="[containerCss]">
      <div
        class="slide-panel-backdrop absolute inset-0 transition-opacity duration-300"
        :class="[backdropCss]"
        @click.self="$emit('backdrop-clicked')"
      ></div>
      <div
        v-bind="$attrs"
        class="slide-panel-content absolute duration-300"
        :class="[computedCss]"
        :style="{ '--transform-value': computedTransformValue }"
      >
        <slot :close="close"></slot>
      </div>
    </div>
  </Transition>
</template>
<style scoped>
  .slide-panel-enter-from .slide-panel-backdrop,
  .slide-panel-leave-to .slide-panel-backdrop {
    opacity: 0;
  }

  .slide-panel-content {
    transition-property: transform, width, height;
  }

  .slide-panel-enter-from .slide-panel-content,
  .slide-panel-leave-to .slide-panel-content {
    transform: var(--transform-value);
  }
</style>
