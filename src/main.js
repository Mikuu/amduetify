import App from './App.vue'
import { createApp } from 'vue'

import { registerPlugins } from '@/plugins';
import { initKeycloak } from "@/plugins/keycloak";

const app = createApp(App)

initKeycloak()
  .then(() => {
    registerPlugins(app)
    app.mount('#app')
  })
  .catch( error => {
    console.log(`initialize keycloak failed:`);
    console.log(error);
  })
