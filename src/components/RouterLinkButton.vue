<script setup lang="ts">
  defineProps<{
    to: string | { name: string; params?: Record<string, string | number> };
  }>();
</script>
<template>
  <router-link
    :to="to"
    class="inline-block rounded bg-slate-300 px-4 py-2 text-sm text-slate-800 transition-colors hover:bg-slate-200"
  >
    <slot />
  </router-link>
</template>
