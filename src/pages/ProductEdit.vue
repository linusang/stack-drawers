<script setup lang="ts">
  import { useRoute } from "vue-router";

  import DrawerLayout from "@/components/DrawerLayout.vue";

  const route = useRoute();

  const id = route.params.id as string;
</script>
<template>
  <DrawerLayout :parent-route="{ name: 'product', params: { id } }">
    <div class="px-6">
      <h1>Product Edit ID: {{ id }}</h1>
    </div>
  </DrawerLayout>
</template>
