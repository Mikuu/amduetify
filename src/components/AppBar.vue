<template>
  <v-app-bar :elevation="1">
    <v-app-bar-title>Autominding</v-app-bar-title>
    <template v-slot:append>
      <v-btn icon="mdi-heart" @click="checkMindData"></v-btn>
      <v-btn icon="mdi-content-save-outline" @click="saveMindData"></v-btn>
      <v-btn icon="mdi-cloud-download-outline" @click="pullMindData"></v-btn>
      <v-btn icon="mdi-logout" @click="logout"></v-btn>
    </template>
  </v-app-bar>

  <NetworkSnackbar :show="displaySnackbar" :success="saveDataSucceed" :message="saveDataMessage" />

</template>

<script setup>
  import { ref, inject } from 'vue';
  import { useMindStore } from "@/store/mind";
  import NetworkSnackbar from "./NetworkSnackbar.vue";

  const saveDataMessage = ref('');
  const saveDataSucceed = ref(true);
  const displaySnackbar = ref(false);
  const keycloak = ref(inject('keycloak'));
  const mindStore = useMindStore();

  const checkMindData = () => {
    mindStore.checkMindData();
  };

  const saveMindData = () => {
    mindStore.saveMindData(
      () => {
        saveDataSucceed.value = true;
        saveDataMessage.value = 'Save mind data succeed';
        displaySnackbar.value = true;
        setTimeout(() => { displaySnackbar.value = false }, 2000);
      },
      () => {
        saveDataSucceed.value = false;
        saveDataMessage.value = 'Save mind data failed';
        displaySnackbar.value = true;
        setTimeout(() => { displaySnackbar.value = false }, 3000);
      },
    );
  };

  const pullMindData = () => {
    mindStore.pullMindData(
      () => {
        saveDataSucceed.value = true;
        saveDataMessage.value = 'Pull mind data succeed';
        displaySnackbar.value = true;
        setTimeout(() => { displaySnackbar.value = false }, 2000);
      },
      () => {
        saveDataSucceed.value = false;
        saveDataMessage.value = 'Pull mind data failed';
        displaySnackbar.value = true;
        setTimeout(() => { displaySnackbar.value = false }, 3000);
      });
  };

  const logout = () => {
    // console.log(keycloak.value.token);
    // console.log(keycloak.value.idToken);

    keycloak.value.logout({
      redirectUri: 'http://localhost:8080/realms/automind/account'
    });
  };

</script>
