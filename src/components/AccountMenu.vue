<template>
  <v-menu>
    <template v-slot:activator="{ props }">
      <v-btn icon="mdi-account" v-bind="props"></v-btn>
    </template>
    <v-list>
      <v-list-item :title=username :subtitle=email></v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list>
      <v-list-item link>
        <template v-slot:prepend>
          <v-icon icon="mdi-account-edit" color="primary"></v-icon>
        </template>
        <v-list-item-title>Change password</v-list-item-title>
      </v-list-item>

      <v-list-item link @click="logout">
        <template v-slot:prepend>
          <v-icon icon="mdi-logout" color="primary"></v-icon>
        </template>
        <v-list-item-title>Logout</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script setup>
  import {inject, ref} from "vue";

  const keycloak = ref(inject('keycloak'));
  const email = keycloak.value.idTokenParsed.email;
  const username = keycloak.value.idTokenParsed.preferred_username;

  const logout = () => {
    keycloak.value.logout({
      redirectUri: window.location.origin
    });
  };
</script>
