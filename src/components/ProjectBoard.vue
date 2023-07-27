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
      <th class="text-left" style="max-width: 30px"></th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="view in viewStore.views" :key="view.viewName">
      <td class="font-weight-light">{{ view.viewName }}</td>
      <td class="font-weight-light">May 30, 2023 Ariman</td>
      <td class="font-weight-light">5</td>
      <td class="font-weight-light"><ViewMenu :vid="view.vid"/></td>
    </tr>
    </tbody>
  </v-table>

  <NetworkSnackbar :show="displaySnackbar" :success="opSucceed" :message="opMessage" />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useViewStore } from "@/store/view";
import ViewMenu from './ViewMenu.vue';
import NetworkSnackbar from "./NetworkSnackbar.vue";

const opMessage = ref('');
const opSucceed = ref(true);
const displaySnackbar = ref(false);

const viewInput = ref(null);
const newViewName = ref('');
const isInputFocused = ref(false);

const viewStore = useViewStore();
const props = defineProps(['pid']);

onMounted(() => {
  loadViews();
});

const loadViews = () => {
  viewStore.retrieveViews();
}

const createView = () => {
  const trimmedViewName = newViewName.value.trim();
  if (trimmedViewName === "") return;

  const onSucceed = () => {
    viewStore.retrieveViews();
  };

  const onFailed = (reason) => {
    opSucceed.value = false;
    opMessage.value = `Create view failed ${reason}`;
    displaySnackbar.value = true;
    setTimeout(() => { displaySnackbar.value = false }, 5000);
  }

  viewStore.createView(trimmedViewName, onSucceed, onFailed);

  newViewName.value = '';
  viewInput.value.blur();
}
</script>

<style>
.flex-grow-1 {
  flex: 1;
}
</style>
