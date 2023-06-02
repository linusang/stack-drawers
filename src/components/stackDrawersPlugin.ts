import type { App, ComputedRef, InjectionKey, Ref } from "vue";
import { computed, ref, watch } from "vue";

export interface StackDrawerInstanceContext {
  close(): void;
}

export interface StackDrawersGlobalContext {
  count: ComputedRef<number>;
  register(drawer: StackDrawerInstanceContext): number;
  unregister(drawer: StackDrawerInstanceContext): void;
}

export function createStackDrawersGlobalContext(): StackDrawersGlobalContext {
  const stackDrawers: Ref<StackDrawerInstanceContext[]> = ref([]);
  const count = computed(() => stackDrawers.value.length);
  let escKeyHandlerAdded = false;
  function register(drawer: StackDrawerInstanceContext) {
    stackDrawers.value.push(drawer);
    const index = stackDrawers.value.indexOf(drawer);
    return index;
  }
  function unregister(drawer: StackDrawerInstanceContext) {
    const index = stackDrawers.value.indexOf(drawer);
    if (index !== -1) {
      stackDrawers.value.splice(index, 1);
    }
  }
  function keyDownHandler(event: KeyboardEvent) {
    if (event.key === "Escape") {
      const lastDrawer = stackDrawers.value[stackDrawers.value.length - 1];
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

export const STACK_DRAWERS_KEY = Symbol(
  "StackDrawersGlobalContext"
) as InjectionKey<StackDrawersGlobalContext>;

export default {
  install(app: App) {
    app.provide(STACK_DRAWERS_KEY, createStackDrawersGlobalContext());
  },
};
