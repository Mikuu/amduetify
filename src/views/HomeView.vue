<template>
  <v-app>
    <AppBar :breadcrumbs="breadcrumbs"/>
    <Home />
  </v-app>
</template>

<script setup>
import AppBar from '@/components/AppBar.vue';
import Home from '@/components/HomeBoard.vue';

const breadcrumbs = [{ title: 'Home', disabled: true, href: '' }];

</script>

<style scoped>

</style>
