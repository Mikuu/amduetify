<template>
  <v-app>
    <AppBar :breadcrumbs="breadcrumbs"/>
    <Project :pid="route.params.pid"/>
  </v-app>

  <NetworkSnackbar :show="displaySnackbar" :success="opSucceed" :message="opMessage" />
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useProjectStore } from "@/store/project";
import AppBar from '@/components/AppBar.vue';
import Project from '@/components/ProjectBoard.vue';
import NetworkSnackbar from "@/components/NetworkSnackbar.vue";

const opMessage = ref('');
const opSucceed = ref(true);
const displaySnackbar = ref(false);

const route = useRoute();
const projectStore = useProjectStore();
const projectName = ref(null);

const breadcrumbs = reactive([
    { title: 'Home', disabled: false, href: '/home' },
    { title: projectName, disabled: true, href: '' },
]);

onMounted(async () => {
  await fetchProjectName();
});

const fetchProjectName = async () => {

  const onSucceed = (projectNameFromResponse) => {
    projectName.value = projectNameFromResponse;
  };

  const onFailed = (reason) => {
    opSucceed.value = false;
    opMessage.value = `get project failed ${reason}`;
    displaySnackbar.value = true;
    setTimeout(() => { displaySnackbar.value = false }, 5000);
  }

  projectStore.getProject(route.params.pid, onSucceed, onFailed);
};


</script>

<style scoped>

</style>
