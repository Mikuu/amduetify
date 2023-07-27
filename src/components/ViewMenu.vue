<template>
  <v-menu>
    <template v-slot:activator="{ props }">
      <v-btn icon="mdi-dots-vertical" variant="plain" v-bind="props"></v-btn>
    </template>

    <v-list>
      <v-list-item link @click="deleteView">
        <template v-slot:prepend>
          <v-icon icon="mdi-delete" class="mr-4" color="primary"></v-icon>
        </template>
        <v-list-item-title>Delete</v-list-item-title>
      </v-list-item>
    </v-list>

  </v-menu>
</template>

<script setup>
import { useViewStore } from "@/store/view";

const viewStore = useViewStore();
const props = defineProps({vid: String});

const deleteView = () => {
  const succeedHandler = () => { viewStore.retrieveViews(); }
  viewStore.deleteView(props.vid, succeedHandler, null);
}
</script>
