<script setup lang="ts">
  import DrawerLayout from "@/components/DrawerLayout.vue";
  import RouterLinkButton from "@/components/RouterLinkButton.vue";
</script>
<template>
  <DrawerLayout :parent-route="{ name: 'home' }">
    <div class="grid gap-2 px-6">
      <h1>Products</h1>
      <div class="flex gap-4">
        <RouterLinkButton :to="{ name: 'product', params: { id: 1 } }"
          >Open Product 1 Drawer</RouterLinkButton
        >
        <RouterLinkButton :to="{ name: 'product', params: { id: 2 } }"
          >Open Product 2 Drawer</RouterLinkButton
        >
      </div>
    </div>
  </DrawerLayout>

  <router-view />
</template>
