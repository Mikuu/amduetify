<template>
  <v-app-bar :elevation="1">
    <v-app-bar-title>Autominding</v-app-bar-title>
    <template v-slot:append>
      <v-btn icon="mdi-heart" @click="checkMindData"></v-btn>
      <v-btn icon="mdi-content-save" @click="saveMindData"></v-btn>
      <v-btn icon="mdi-dots-vertical"></v-btn>
    </template>
  </v-app-bar>

  <NetworkSnackbar :show="displaySnackbar" :success="saveDataSucceed" :message="saveDataMessage" />

</template>

<script setup>
  import { ref } from 'vue';
  import { useMindStore } from "@/store/mind";
  import NetworkSnackbar from "./NetworkSnackbar.vue";

  const saveDataMessage = ref('');
  const saveDataSucceed = ref(true);
  const displaySnackbar = ref(false);
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
        saveDataMessage.value = 'Save mind data failed, please check the network failure';
        displaySnackbar.value = true;
        setTimeout(() => { displaySnackbar.value = false }, 5000);
      },
    );
  };

</script>
