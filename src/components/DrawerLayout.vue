<script setup lang="ts">
  import { onMounted, ref } from "vue";
  import { RouteLocationRaw, useRouter } from "vue-router";

  import DemoButton from "./DemoButton.vue";
  import StackDrawer from "./StackDrawer.vue";

  const props = defineProps<{
    parentRoute?: RouteLocationRaw;
  }>();

  const router = useRouter();
  const stackDrawer = ref<InstanceType<typeof StackDrawer>>();

  function closed() {
    if (props.parentRoute) {
      router.push(props.parentRoute);
    }
  }

  onMounted(() => {
    stackDrawer.value?.open();
  });
</script>
<template>
  <StackDrawer
    ref="stackDrawer"
    v-slot="{ close }"
    drawer-css="shadow-l-lg"
    @closed="closed"
  >
    <div
      class="grid grid-rows-[min-content_1fr] items-start justify-start px-6 py-4"
    >
      <DemoButton @click="close">Back</DemoButton>
    </div>
    <div>
      <slot></slot>
    </div>
  </StackDrawer>
</template>
