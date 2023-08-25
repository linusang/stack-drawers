<script setup lang="ts">
  import { computed, inject, ref } from "vue";

  import SlidePanel from "./SlidePanel.vue";
  import { STACK_DRAWERS_KEY } from "./stackDrawersPlugin";

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

  interface Slots {
    default: {
      close: () => void;
      drawersCount: number;
      index: number | null;
      isTopMost: boolean;
    };
  }
  defineSlots<Slots>();

  const index = ref<number | undefined>();
  const slidePanel = ref<InstanceType<typeof SlidePanel>>();

  const context = inject(STACK_DRAWERS_KEY);

  const drawersCount = computed(() => context?.count.value ?? 0);
  const drawerWidth = computed<string>(() => {
    let result = props.topMostDrawerWidthCss;

    if (drawersCount.value > 0) {
      const lastIndex = drawersCount.value - 1;
      if (index.value === lastIndex) {
        result = props.topMostDrawerWidthCss;
      } else {
        result = "w-full";
      }
    }

    return result;
  });
  const isTopMost = computed(() => index.value === drawersCount.value - 1);

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
      class="bg-white"
      :class="[drawerCss, drawerWidth]"
      @backdrop-clicked="close"
      @closing="$emit('closing')"
      @closed="$emit('closed')"
    >
      <slot
        :close="close"
        :drawers-count="drawersCount"
        :index="index"
        :is-top-most="isTopMost"
      ></slot>
    </SlidePanel>
  </Teleport>
</template>
