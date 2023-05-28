<script setup lang="ts">
  import { computed, inject, ref } from "vue";

  import SlidePanel from "./SlidePanel.vue";
  import { STACKED_DRAWER_KEY } from "./stackDrawersPlugin";
  interface Props {
    teleportTo?: string;
    drawerCss?: string;
    topMostDrawerWidthCss?: string;
  }
  const props = withDefaults(defineProps<Props>(), {
    teleportTo: "body",
    drawerCss: "",
    topMostDrawerWidthCss:
      "w-full sm:w-[calc(100%-8rem)] md:w-[calc(100%-16rem)]",
  });
  interface Emits {
    (e: "closing"): void;
    (e: "closed"): void;
  }
  defineEmits<Emits>();
  const index = ref<number | undefined>();
  const slidePanel = ref<InstanceType<typeof SlidePanel>>();
  const context = inject(STACKED_DRAWER_KEY);
  const stackDrawersCount = computed(() => context?.count.value ?? 0);
  const drawerWidth = computed<string>(() => {
    let result = props.topMostDrawerWidthCss;

    if (stackDrawersCount.value > 0) {
      const lastIndex = stackDrawersCount.value - 1;
      if (index.value === lastIndex) {
        result = props.topMostDrawerWidthCss;
      } else {
        result = "w-full";
      }
    }

    return result;
  });
  const stackDrawerInstanceContext = {
    close,
  };
  function open() {
    if (context) {
      index.value = context.register(stackDrawerInstanceContext);
    }
    slidePanel.value?.open();
  }
  function close() {
    if (context) {
      context.unregister(stackDrawerInstanceContext);
    }
    slidePanel.value?.close();
  }

  defineExpose({
    open,
    close,
  });
</script>
<template>
  <Teleport :to="teleportTo">
    <SlidePanel
      ref="slidePanel"
      side="right"
      class="bg-white transition-[width_transform] duration-300"
      :class="[drawerCss, drawerWidth]"
      @backdrop-clicked="close"
      @closing="$emit('closing')"
      @closed="$emit('closed')"
    >
      <slot :close="close"></slot>
    </SlidePanel>
  </Teleport>
</template>