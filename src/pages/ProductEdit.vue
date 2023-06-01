<script setup lang="ts">
  import { useRoute } from "vue-router";

  import AppDrawer from "@/components/AppDrawer.vue";

  const route = useRoute();

  const id = route.params.id as string;
</script>
<template>
  <AppDrawer :parent-route="{ name: 'product', params: { id } }">
    <template #header>
      <h1>Editing Product {{ id }}</h1>
    </template>
    <div class="px-6 py-4">
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum
        exercitationem culpa animi sed laborum nihil consequatur possimus nemo
        aspernatur impedit nesciunt expedita ullam quasi unde earum deserunt
        esse, dolorem beatae debitis. Hic possimus, porro incidunt at sunt, qui
        nam unde voluptate, pariatur delectus omnis provident adipisci a?
        Asperiores, dolore aspernatur.
      </p>
    </div>
  </AppDrawer>
</template>
