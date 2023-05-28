import type { App, ComputedRef, InjectionKey, Ref } from "vue";
import { computed, ref, watch } from "vue";

export interface StackDrawerInstanceContext {
  close(): void;
}

export interface StackDrawerGlobalContext {
  count: ComputedRef<number>;
  register(drawer: StackDrawerInstanceContext): number;
  unregister(drawer: StackDrawerInstanceContext): void;
}

export function createStackDrawerGlobalContext(): StackDrawerGlobalContext {
  const stackedDrawers: Ref<StackDrawerInstanceContext[]> = ref([]);
  const count = computed(() => stackedDrawers.value.length);
  let escKeyHandlerAdded = false;
  function register(drawer: StackDrawerInstanceContext) {
    stackedDrawers.value.push(drawer);
    const index = stackedDrawers.value.indexOf(drawer);
    return index;
  }
  function unregister(drawer: StackDrawerInstanceContext) {
    const index = stackedDrawers.value.indexOf(drawer);
    if (index !== -1) {
      stackedDrawers.value.splice(index, 1);
    }
  }
  function keyDownHandler(event: KeyboardEvent) {
    if (event.key === "Escape") {
      const lastDrawer = stackedDrawers.value[stackedDrawers.value.length - 1];
      if (lastDrawer) {
        lastDrawer.close();
      }
    }
  }
  watch(count, (count) => {
    if (count > 0) {
      if (!escKeyHandlerAdded) {
        document.addEventListener("keydown", keyDownHandler);
        escKeyHandlerAdded = true;
      }
    } else {
      document.removeEventListener("keydown", keyDownHandler);
      escKeyHandlerAdded = false;
    }
  });
  return {
    count,
    register,
    unregister,
  };
}

export const STACKED_DRAWER_KEY = Symbol(
  "StackedDrawerGlobalContext"
) as InjectionKey<StackDrawerGlobalContext>;

export default {
  install(app: App) {
    app.provide(STACKED_DRAWER_KEY, createStackDrawerGlobalContext());
  },
};
