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
        <v-list-item-title>Delete all views</v-list-item-title>
      </v-list-item>
    </v-list>

  </v-menu>
</template>

<script setup>
import { useViewStore } from "@/store/view";

const viewStore = useViewStore();
const props = defineProps({ pid: String});

const deleteView = () => {
  const onSucceed = () => { viewStore.retrieveViews(props.pid) };
  viewStore.deleteViews(props.pid, onSucceed);
}
</script>
