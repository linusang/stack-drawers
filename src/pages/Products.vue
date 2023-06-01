<script setup lang="ts">
  import AppDrawer from "@/components/AppDrawer.vue";
  import RouterLinkButton from "@/components/RouterLinkButton.vue";
  import IconChevronRight from "~icons/heroicons/chevron-right-20-solid";
</script>
<template>
  <AppDrawer :parent-route="{ name: 'home' }">
    <template #header>
      <h1>Products</h1>
    </template>

    <div class="grid gap-2 px-6 py-4">
      <div class="flex gap-4">
        <RouterLinkButton
          :to="{ name: 'product', params: { id: 1 } }"
          class="flex items-center gap-1"
          >Open Product 1 Drawer
          <IconChevronRight class="h-6 w-6 text-slate-700" />
        </RouterLinkButton>
        <RouterLinkButton
          :to="{ name: 'product', params: { id: 2 } }"
          class="flex items-center gap-1"
          >Open Product 2 Drawer
          <IconChevronRight class="h-6 w-6 text-slate-700" />
        </RouterLinkButton>
      </div>
    </div>
  </AppDrawer>

  <router-view />
</template>
