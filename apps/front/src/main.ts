import { createApp } from "vue";
import { VueQueryPlugin, VueQueryPluginOptions } from "@tanstack/vue-query";
import "./styles.css";
import App from "./App.vue";

const app = createApp(App);

const vueQueryPluginOptions: VueQueryPluginOptions = {
  queryClientConfig: {
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  },
};

app.use(VueQueryPlugin, vueQueryPluginOptions);
app.mount("#app");
