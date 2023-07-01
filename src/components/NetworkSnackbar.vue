<template>
  <v-snackbar
    v-model="displaySnackbar"
    :color="snackColor"
    :close-on-content-click="true"
    location="top"
    rounded="pill"
    min-width="80"
  >
    {{ props.message }}
  </v-snackbar>
</template>

<script setup>
import {computed, ref, watchEffect} from 'vue';

const props = defineProps({
  show: Boolean,
  message: String,
  success: Boolean,
});

const displaySnackbar = ref(props.show);
watchEffect(() => displaySnackbar.value = props.show);

const snackColor = computed(() => {
  return props.success ? 'green-lighten-1' : 'orange-darken-1';
});
</script>
