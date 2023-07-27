import Keycloak from 'keycloak-js';
import { reactive, readonly } from 'vue';

const keycloakState = reactive({
  authenticated: false,
  initialized: false,
  token: null,
});

export const keycloak = new Keycloak({
    url: "http://localhost:8080/",
    clientId: "automind-app",
    realm: "automind",
});

export const KeycloakPlugin = {
  install: (app) => {
    app.provide('keycloak', keycloak);
    app.provide('keycloakState', readonly(keycloakState));
  },
};

export const initKeycloak = async () => {
    const authenticated = await keycloak.init({ onLoad: 'check-sso' });
    keycloakState.initialized = true;
    keycloakState.authenticated = authenticated;
    keycloakState.token = keycloak.token;

    console.log(`keycloak initialized: authenticated=${authenticated}`);
};
