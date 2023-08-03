<template>
  <v-table class="mt-16 px-6 h-100" fixed-header>
    <thead>
    <tr>
      <th class="flex-grow-1 text-left">
        Views
        <input
          ref="viewInput"
          class="mx-8 px-8 text-h6 font-weight-light"
          type="text"
          v-model="newViewName"
          @keyup.enter="createView"
          :placeholder="isInputFocused? '' : '+'"
        />
      </th>
      <th class="text-left" style="max-width: 60px">Last modified</th>
      <th class="text-left" style="max-width: 60px">View Type</th>
      <th class="text-left" style="max-width: 30px"><ViewsMenu :pid="props.pid" /></th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="view in viewStore.views" :key="view.viewName">
      <td class="font-weight-light">
        <router-link
        :to="`/view/${view.vid}`"
        class="custom-router-link"
        active-class="custom-active-link"
        >{{ view.viewName }}</router-link>
      </td>
      <td class="font-weight-light">May 30, 2023 Ariman</td>
      <td class="font-weight-light">5</td>
      <td class="font-weight-light"><ViewMenu :vid="view.vid" :pid="view.pid"/></td>
    </tr>
    </tbody>
  </v-table>

  <NetworkSnackbar :show="displaySnackbar" :success="opSucceed" :message="opMessage" />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useViewStore } from "@/store/view";
import "@/assets/routerLink.css";
import ViewMenu from './ViewMenu.vue';
import ViewsMenu from "@/components/ViewsMenu.vue";
import NetworkSnackbar from "./NetworkSnackbar.vue";

const opMessage = ref('');
const opSucceed = ref(true);
const displaySnackbar = ref(false);

const viewInput = ref(null);
const newViewName = ref('');
const isInputFocused = ref(false);

const viewStore = useViewStore();
const props = defineProps(['pid']);

const viewType = ref('requirements');

onMounted(() => {
  loadViews();
});

const getOnFailed = (messagePrefix) => {
  return (reason) => {
    opSucceed.value = false;
    opMessage.value = `${messagePrefix} ${reason}`;
    displaySnackbar.value = true;
    setTimeout(() => { displaySnackbar.value = false }, 5000);
  }
};

const loadViews = () => {
  viewStore.retrieveViews(props.pid, null, getOnFailed("Retrieve views failed"));
}

const createView = () => {
  const trimmedViewName = newViewName.value.trim();
  if (trimmedViewName === "") return;

  const onSucceed = () => {
    viewStore.retrieveViews(props.pid, null, getOnFailed("Retrieve views failed"));
  };

  viewStore.createView(props.pid, viewType.value, trimmedViewName, onSucceed, getOnFailed("Create view failed"));

  newViewName.value = '';
  viewInput.value.blur();
}
</script>

<style>
.flex-grow-1 {
  flex: 1;
}
</style>
