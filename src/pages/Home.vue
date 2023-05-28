<script setup lang="ts">
  import RouterLinkButton from "@/components/RouterLinkButton.vue";

  // const domainPath = import.meta.env.VITE_BASE_URL
  //   ? location.origin + import.meta.env.VITE_BASE_URL
  //   : document.location.origin;
</script>
<template>
  <div class="flex h-screen items-center justify-center">
    <div class="grid max-w-[32rem] gap-6 px-4">
      <div class="text-xl font-bold">
        Hi, I'm a demo app to show how StackDrawers work.
      </div>
      <div>
        <ul class="grid gap-4">
          <li>
            Click on the products button to open a drawer, then click on either
            product to open another drawer.
          </li>
          <li>
            Notice the URL changes as you open and close drawers. This is
            because StackDrawers are designed to work with Vue Router.
          </li>
          <!-- <li>
            Try going to
            <span class="bg-gray-300 font-mono"
              >{{ domainPath }}/products/2/edit</span
            >
            directly in the address bar to open up all the drawers representing
            that route.
          </li> -->
          <li>
            You may also use the ESC key to close the topmost drawer. Try it!
          </li>
          <li>
            The drawers are also responsive. When in mobile view, the drawers
            take up the full width.
          </li>
        </ul>
      </div>
      <div class="flex justify-center">
        <RouterLinkButton to="/products">Open Products Drawer</RouterLinkButton>
      </div>
    </div>
  </div>

  <router-view />
</template>
