<script lang="ts">
  import { TransitionChild, TransitionRoot } from "@headlessui/vue";
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
    containerCss: "z-50",
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
</script>
<template>
  <TransitionRoot
    :show="isOpened"
    class="fixed inset-0"
    :class="[containerCss]"
    @before-enter="$emit('opening')"
    @after-enter="$emit('opened')"
    @before-leave="$emit('closing')"
    @after-leave="$emit('closed')"
  >
    <TransitionChild
      class="absolute inset-0"
      :class="[backdropCss]"
      enter="transition-opacity duration-300 ease-linear"
      enter-from="opacity-0"
      enter-to="opacity-100"
      leave="transition-opacity duration-300 ease-linear"
      leave-from="opacity-100"
      leave-to="opacity-0"
      @click.self="$emit('backdrop-clicked')"
    ></TransitionChild>
    <TransitionChild
      v-bind="$attrs"
      class="absolute"
      :class="[computedCss]"
      enter="transition-transform duration-300 ease-in-out"
      leave="transition-transform duration-300 ease-in-out"
      :enter-from="computedTranslate"
      :leave-to="computedTranslate"
    >
      <slot :close="close"></slot>
    </TransitionChild>
  </TransitionRoot>
</template>
