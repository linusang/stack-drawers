<template>
  <button
    class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-300 text-slate-800 transition-colors hover:bg-slate-200"
    v-bind="$attrs"
  >
    <IconArrowLeft class="h-6 w-6 text-slate-700" />
  </button>
</template>
<script setup lang="ts">
  import IconArrowLeft from "~icons/heroicons/arrow-left-solid";
</script>
