import { createApp } from 'vue';
import App from './App.vue';
import './assets/css/main.scss';
import { VueQueryPlugin, VueQueryPluginOptions } from '@tanstack/vue-query';

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
app.mount('#app');
