<script setup lang="ts">
  import { useRoute } from "vue-router";

  import DrawerLayout from "@/components/DrawerLayout.vue";
  import RouterLinkButton from "@/components/RouterLinkButton.vue";

  const route = useRoute();

  const id = route.params.id as string;
</script>

<template>
  <DrawerLayout :parent-route="{ name: 'products' }">
    <div class="grid gap-2 px-6">
      <h1>Product {{ id }}</h1>
      <div class="flex">
        <RouterLinkButton :to="{ name: 'product-edit', params: { id } }"
          >Edit</RouterLinkButton
        >
      </div>
    </div>
  </DrawerLayout>
  <router-view />
</template>
