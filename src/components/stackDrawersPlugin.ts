import type { App, ComputedRef, InjectionKey, Ref } from "vue";
import { computed, ref, watch } from "vue";

export interface StackDrawerOptions {
  inertElements: () => (HTMLElement | null)[];
  lockBodyScroll: boolean;
}

export interface StackDrawerInstanceContext {
  close(): void;
}

export interface StackDrawersGlobalContext {
  count: ComputedRef<number>;
  register(drawer: StackDrawerInstanceContext): number;
  unregister(drawer: StackDrawerInstanceContext): void;
}

export function createStackDrawersGlobalContext(
  options?: Partial<StackDrawerOptions>
): StackDrawersGlobalContext {
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
  function handleEscKey(count: number) {
    if (count > 0) {
      if (!escKeyHandlerAdded) {
        document.addEventListener("keydown", keyDownHandler);
        escKeyHandlerAdded = true;
      }
    } else {
      document.removeEventListener("keydown", keyDownHandler);
      escKeyHandlerAdded = false;
    }
  }

  function unfocusCurrentActiveElement() {
    if (
      document.activeElement &&
      "blur" in document.activeElement &&
      typeof document.activeElement.blur === "function"
    ) {
      document.activeElement.blur();
    }
  }

  function handleBodyScroll() {
    if (options?.lockBodyScroll) {
      if (count.value > 0 && document.body.style.overflow !== "hidden") {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.removeProperty("overflow");
      }
    }
  }

  function handleInert(count: number) {
    if (typeof options?.inertElements !== "function") {
      return;
    }
    if (count > 0) {
      options.inertElements().forEach((element) => {
        if (element && !element.hasAttribute("inert")) {
          element.setAttribute("inert", "");
        }
      });
    } else {
      options.inertElements().forEach((element) => {
        if (element && element.hasAttribute("inert")) {
          element.removeAttribute("inert");
        }
      });
    }
  }

  watch(count, (count) => {
    handleEscKey(count);
    unfocusCurrentActiveElement();
    handleBodyScroll();
    handleInert(count);
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

export default function (options?: Partial<StackDrawerOptions>) {
  return {
    install(app: App) {
      app.provide(STACK_DRAWERS_KEY, createStackDrawersGlobalContext(options));
    },
  };
}
