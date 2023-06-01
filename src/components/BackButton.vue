<template>
  <button
    class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-300 text-slate-800 transition-colors hover:bg-slate-200"
    v-bind="$attrs"
  >
    <Icon icon="heroicons-solid:arrow-left" class="h-6 w-6 text-slate-700" />
  </button>
</template>
<script setup lang="ts">
  import { Icon } from "@iconify/vue";
</script>
