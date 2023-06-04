<script setup lang="ts">
  import { computed, onMounted, ref } from "vue";
  import { RouteLocationRaw, useRouter } from "vue-router";

  import BackButton from "./BackButton.vue";
  import StackDrawer from "./StackDrawer.vue";

  const props = defineProps<{
    parentRoute?: RouteLocationRaw;
  }>();

  const slots = defineSlots<{
    header(props: { back: () => void }): any;
    default(props: { back: () => void }): any;
    footer(props: { back: () => void }): any;
  }>();
  const router = useRouter();
  const stackDrawer = ref<InstanceType<typeof StackDrawer>>();

  const hasFooter = computed(() => !!slots.footer);

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
    <div class="flex h-full max-h-full flex-col">
      <div class="flex items-center gap-8 bg-slate-100 px-6 py-4 shadow-md">
        <BackButton @click="close"></BackButton>
        <slot name="header" :back="close"></slot>
      </div>
      <div class="grow overflow-auto">
        <slot :back="close"></slot>
      </div>

      <div v-if="hasFooter" class="bg-slate-100 px-6 py-4 shadow-t-md">
        <slot name="footer" :back="close"></slot>
      </div>
    </div>
  </StackDrawer>
</template>
