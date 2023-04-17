import { createApp } from "vue";
import { VueQueryPlugin } from "@tanstack/vue-query";
import "./styles.css";
import App from "./App.vue";

const app = createApp(App);
app.use(VueQueryPlugin);
app.mount("#app");
