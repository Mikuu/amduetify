import Keycloak from 'keycloak-js';
import { reactive, readonly } from 'vue';

const keycloakState = reactive({
  authenticated: false,
  token: null,
});

export const keycloak = new Keycloak();

keycloak.init({ onLoad: 'login-required' })
  .then((authenticated) => {
    keycloakState.authenticated = authenticated;
    keycloakState.token = keycloak.token;
  });

export const KeycloakPlugin = {
  install: (app) => {
    app.config.globalProperties.$keycloak = readonly(keycloakState);
  },
};
