import { createApp } from "vue";
import App from "./App.vue";
import "./styles.css";
import { VueQueryPlugin, VueQueryPluginOptions } from "@tanstack/vue-query";
import { createVuetify } from "vuetify";
import { VSkeletonLoader } from "vuetify/labs/VSkeletonLoader";

const app = createApp(App);
// const vuetify = createVuetify({
//   components: {
//     VSkeletonLoader,
//   },
// });

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
// app.use(vuetify);
app.mount("#app");
