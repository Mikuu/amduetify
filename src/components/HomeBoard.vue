<template>
  <v-table class="mt-16 px-6 h-100" fixed-header>
    <thead>
      <tr>
        <th class="flex-grow-1 text-left">
          Project
          <input
            ref="projectInput"
            class="mx-8 px-8 text-h6 font-weight-light"
            type="text"
            v-model="newProjectName"
            @keyup.enter="createProject"
            :placeholder="isInputFocused? '' : '+'"
          />
        </th>
        <th class="text-left" style="max-width: 60px">Last modified</th>
        <th class="text-left" style="max-width: 60px">Views</th>
        <th class="text-left" style="max-width: 30px"></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="project in projects" :key="project.name">
        <td class="font-weight-light">{{ project.projectName }}</td>
        <td class="font-weight-light">May 30, 2023 Ariman</td>
        <td class="font-weight-light">5</td>
        <td class="font-weight-light"><ProjectMenu :projectId="project.projectId"/></td>
      </tr>
    </tbody>
  </v-table>

  <NetworkSnackbar :show="displaySnackbar" :success="opSucceed" :message="opMessage" />
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { useProjectStore } from "@/store/project";
import ProjectMenu from './ProjectMenu';
import NetworkSnackbar from "./NetworkSnackbar.vue";

const opMessage = ref('');
const opSucceed = ref(true);
const displaySnackbar = ref(false);

// const projects = reactive([]);
const projectInput = ref(null);
const newProjectName = ref('');
const isInputFocused = ref(false);

const projectStore = useProjectStore();
const projects = ref(projectStore.projects);

onMounted(async () => {
  // projects.push(
  //   { projectId: "PID001", projectName: "This is a very long and long and long, then continue long name", lastModified: "May 30, 2023 Ariman", views: 100, config: true },
  //   { projectId: "PID002", projectName: "This is a short name", lastModified: "May 30, 2023 Ariman", views: 50, config: true },
  //   { projectId: "PID003", projectName: "Sandbox", lastModified: "May 30, 2023 Ariman", views: 200, config: false }
  // );

  console.log(`FBI --> load projects`);
  await loadProjects();
  console.log(`FBI --> onMounted load completed`);
  console.log(projects.value);

  watch(projects, (newVal, oldVal) => {
    console.log(`FBI --> projects updated`);
    console.log(oldVal);
    console.log(newVal);
  }, { immediate: true });


});

const loadProjects = async () => {
  await projectStore.retrieveProjects(null, null);
  console.log(`FBI --> loading`);
  console.log(projects.value);
}

const createProject = () => {
  if (newProjectName.value.trim() === "") return;
  // projects.push({ projectId: "PID00new", projectName: newProjectName.value, lastModified: "May 30, 2023 Ariman", views: 0, config: true });
  newProjectName.value = '';
  projectInput.value.blur();
}
</script>

<style>
.flex-grow-1 {
  flex: 1;
}
</style>
