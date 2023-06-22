<template>
  <v-app-bar :elevation="1">
    <v-app-bar-title>Autominding</v-app-bar-title>
    <template v-slot:append>
      <v-btn icon="mdi-heart" @click="checkMindData"></v-btn>

      <v-btn icon="mdi-content-save" @click="saveMindData"></v-btn>

      <v-btn icon="mdi-dots-vertical"></v-btn>
    </template>
  </v-app-bar>
</template>

<script setup>
  import { useMindStore } from "@/store/mind";
  const mindStore = useMindStore();

  const checkMindData = () => {
    mindStore.checkMindData();
  };

  const saveMindData = () => {
    mindStore.saveMindData();
  };

</script>
