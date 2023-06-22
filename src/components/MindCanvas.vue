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

  onMounted(() => {
    const mindStore = useMindStore();
    mindStore.initializeMind('#mind-map');
    if (mindStore.mindDataStored) {
      mindStore.loadMindData();
    }

    // const mindStore = useMindStore();
    // mindStore.experiment('#mind-map', 6);
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
