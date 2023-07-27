<template>
  <v-app>
    <AppBar :breadcrumbs="breadcrumbs"/>
    <Project :pid="pid"/>
  </v-app>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import AppBar from '@/components/AppBar.vue';
import Project from '@/components/ProjectBoard.vue';

const route = useRoute();
const pid = ref(route.params.pid);
const projectName = ref(null);

const breadcrumbs = [
    { title: 'Home', disabled: true, href: '' },
    { title: 'Home', disabled: true, href: '' },

];

onMounted(() => {
    pid.value = route.params.pid;
});

const fetchProjectName = () => {

};


</script>

<style scoped>

</style>
