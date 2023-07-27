<template>
  <v-menu>
    <template v-slot:activator="{ props }">
      <v-btn icon="mdi-dots-vertical" variant="plain" v-bind="props"></v-btn>
    </template>

    <v-list>
      <v-list-item link @click="deleteProject">
        <template v-slot:prepend>
          <v-icon icon="mdi-delete" class="mr-4" color="primary"></v-icon>
        </template>
        <v-list-item-title>Delete</v-list-item-title>
      </v-list-item>
    </v-list>

  </v-menu>
</template>

<script setup>
import { useProjectStore } from "@/store/project";

const projectStore = useProjectStore();
const props = defineProps({pid: String});

const deleteProject = () => {
  const succeedHandler = () => { projectStore.retrieveProjects(); }
  projectStore.deleteProject(props.pid, succeedHandler, null);
}
</script>
