<script setup lang="ts">
  import RouterLinkButton from "@/components/RouterLinkButton.vue";
  import IconChevronRight from "~icons/heroicons/chevron-right-20-solid";
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
          <li>
            Try going to the URL directly in the address bar of an opened drawer
            in a new browser tab. You should see the drawer(s) opened
            automatically.
          </li>
          <li>
            You may also use the ESC key to close the topmost drawer. Try it!
          </li>
          <li>
            The drawers are also responsive. When in mobile view, the drawers
            take up the full width.
          </li>
          <li>
            Try pressing tabs multiple times and notice that the focuses' are
            performed only at the topmost drawer and not at the bottom drawers /
            layers
          </li>
        </ul>
      </div>
      <div class="flex justify-center">
        <RouterLinkButton to="/products" class="inline-flex items-center"
          >Open Products Drawer
          <IconChevronRight class="h-6 w-6 text-slate-700"
        /></RouterLinkButton>
      </div>
      <div class="flex justify-center">
        <a
          href="https://github.com/linusang/stack-drawers"
          class="text-blue-600 underline"
          >Source</a
        >
      </div>
    </div>
  </div>

  <router-view />
</template>
