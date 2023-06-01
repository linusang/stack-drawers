import "./App.css";

import { createApp } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";

import App from "./App.vue";
import stackDrawersPlugin from "./components/stackDrawersPlugin";
import { routes } from "./routes";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
});

const app = createApp(App);
app.use(router);
app.use(stackDrawersPlugin);
app.mount("#app");
