<template>
  <v-app-bar :elevation="1">
    <v-app-bar-title class="flex-none">Autominding</v-app-bar-title>
    <v-breadcrumbs class="pl-12 text-body-2" :items="props.breadcrumbs" divider="/"></v-breadcrumbs>
    <template v-slot:append>
      <v-btn icon="mdi-heart" @click="checkMindData"></v-btn>
      <v-btn icon="mdi-content-save-outline" @click="saveMindData"></v-btn>
      <v-btn icon="mdi-cloud-download-outline" @click="pullMindData"></v-btn>
      <AccountMenu/>

    </template>
  </v-app-bar>

  <NetworkSnackbar :show="displaySnackbar" :success="saveDataSucceed" :message="saveDataMessage" />

</template>

<script setup>
  import { ref, inject } from 'vue';
  import { useMindStore } from "@/store/mind";
  import NetworkSnackbar from "./NetworkSnackbar.vue";
  import AccountMenu from "./AccountMenu.vue";

  const saveDataMessage = ref('');
  const saveDataSucceed = ref(true);
  const displaySnackbar = ref(false);
  const keycloak = ref(inject('keycloak'));
  const mindStore = useMindStore();

  const props = defineProps(['breadcrumbs']);

  const checkMindData = () => {
    mindStore.checkMindData();
    console.log(`keycloak.tokenParsed:`);
    const tokenParsed = keycloak.value.idTokenParsed;
    console.log(JSON.parse(JSON.stringify(tokenParsed)));
    console.log(`iat: ${new Date(tokenParsed.iat * 1000).toISOString()}, exp: ${new Date(tokenParsed.exp * 1000).toISOString()}`)
    console.log(`keycloak.subject: ${keycloak.value.subject}`);
    console.log(`keycloak.idTokenParsed:`);
    console.log(JSON.parse(JSON.stringify(keycloak.value.idTokenParsed)));
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

</script>

<style>
.flex-none {
  flex: none;
}
</style>
