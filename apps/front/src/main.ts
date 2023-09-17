import { createApp } from "vue";
import App from "./App.vue";
import "./styles.css";
import { VueQueryPlugin, VueQueryPluginOptions } from "@tanstack/vue-query";
import VueVirtualScroller from "vue-virtual-scroller";
// import { createVuetify } from "vuetify";
// import * as components from "vuetify/components";
// import * as directives from "vuetify/directives";

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

// const vuetify = createVuetify({
//   components,
//   directives,
// });

app.use(VueQueryPlugin, vueQueryPluginOptions);
app.use(VueVirtualScroller);
// app.use(vuetify);
app.mount("#app");
