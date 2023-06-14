<template>
  <v-main>
    <v-container class="pa-0" fluid>
      <div id="mind-map"></div>
    </v-container>
  </v-main>
</template>

<script setup>
import MindElixir, { E } from "mind-elixir";
import nodeMenu from '@mind-elixir/node-menu';

import { onMounted } from "vue";

const options = {
  el: '#mind-map',
}

const minding = () => {
  const mind = new MindElixir(options);
  const rootNode = MindElixir.new("demo");
  mind.install(nodeMenu);
  mind.init(rootNode);

  E(rootNode.id);
};

onMounted(() => {
  minding();
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
