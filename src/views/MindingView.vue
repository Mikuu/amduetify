<template>
  <v-app>
    <AppBar :breadcrumbs="breadcrumbs"/>
    <MindCanvas :vid="route.params.vid"/>
  </v-app>
</template>

<script setup>
import { ref, onMounted, reactive } from "vue";
import MindCanvas from '@/components/MindCanvas.vue';
import AppBar from '@/components/AppBar.vue';
import { useRoute } from 'vue-router';
import { useViewStore } from "@/store/view";

const route = useRoute();
const viewStore = useViewStore();

const viewName = ref(null);
const projectUri = ref(null);
const projectName = ref(null);

const breadcrumbs = reactive([
  { title: 'Home', disabled: false, href: '/home' },
  { title: projectName, disabled: false, href: projectUri },
  { title: viewName, disabled: true, href: '' },
]);

onMounted( async () => {
  // console.log(`FBI --> MindingView onMounted started`);
  await fetchView();
  // console.log(`FBI --> MindingView onMounted completed`);
});

const fetchView = async () => {
  const onSucceed = () => {
    viewName.value = viewStore.view.viewName;
    projectName.value = viewStore.view.projectName;
    projectUri.value = `/project/${viewStore.view.pid}`;
  };

  const onFailed = () => {};

  await viewStore.getView(route.params.vid, onSucceed, onFailed);
};

</script>


<style scoped>

</style>
