<script setup lang="ts">
  import { Icon } from "@iconify/vue";
  import { useRoute } from "vue-router";

  import AppDrawer from "@/components/AppDrawer.vue";
  import DemoButton from "@/components/DemoButton.vue";
  import RouterLinkButton from "@/components/RouterLinkButton.vue";

  const route = useRoute();

  const id = route.params.id as string;
</script>

<template>
  <AppDrawer :parent-route="{ name: 'products' }">
    <template #header>
      <h1>Product {{ id }}</h1>
    </template>
    <div class="px-6 py-4">
      <div class="grid gap-4">
        <div class="flex h-[2000px]">
          <div class="bg-stripe w-24 shrink-0"></div>
          <div class="flex grow flex-col justify-between">
            <div class="grid gap-6">
              <p class="px-6 text-center">
                Scroll here to see the overflow in between the header and footer
              </p>
              <div class="text-center">
                <RouterLinkButton
                  :to="{ name: 'product-edit', params: { id } }"
                  class="inline-flex items-center gap-1"
                  >Edit Product
                  <Icon
                    icon="heroicons-solid:chevron-right"
                    class="h-6 w-6 text-slate-600"
                  ></Icon
                ></RouterLinkButton>
              </div>
            </div>
            <p class="px-6 text-center">End of content</p>
          </div>

          <div class="bg-stripe w-24 shrink-0"></div>
        </div>
      </div>
    </div>

    <template #footer="{ back }">
      <div class="flex justify-end">
        <DemoButton @click="back">OK</DemoButton>
      </div>
    </template>
  </AppDrawer>
  <router-view />
</template>

<style scoped>
  .bg-stripe {
    background-image: repeating-linear-gradient(
      45deg,
      rgb(203 213 225),
      rgb(203 213 225) 30px,
      rgb(226 232 240) 30px,
      rgb(226 232 240) 60px
    );
  }
</style>
