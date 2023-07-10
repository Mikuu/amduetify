/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import { loadFonts } from './webfontloader';
import vuetify from './vuetify';
import pinia from '../store';
import router from '../router';
import { KeycloakPlugin, keycloak } from "@/plugins/keycloak";

export function registerPlugins (app) {
  loadFonts()
  app
    .use(vuetify)
    .use(router)
    .use(pinia)
    .use(KeycloakPlugin);

  app.provide('keycloak', keycloak);
}
