<template>
  <v-main>
    <v-container class="pa-0" fluid>
      <div id="mind-map"></div>
    </v-container>
  </v-main>
</template>

<script setup>
import { onMounted } from "vue";
import { useMindStore } from "@/store/mind";

const props = defineProps(['vid']);

onMounted(async () => {
  // console.log(`FBI --> MindCanvas onMounted started`);
  const mindStore = useMindStore();
  await mindStore.chargeMetaData(props.vid);

  mindStore.initializeMind('#mind-map');
  await mindStore.pullMindData();

  mindStore.setupAutoSyncMindDataToStorage();

  // console.log(`FBI --> MindCanvas onMounted completed`);
});
</script>

<style>
@import '../../node_modules/@mind-elixir/node-menu/dist/style.css';
#mind-map {
  width: 100vw;
  height: 93vh;
  box-sizing: content-box;
}
</style>
