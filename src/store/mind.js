// Utilities
import { defineStore } from 'pinia'
import MindElixir from "mind-elixir";
import nodeMenu from '@mind-elixir/node-menu';
import { useLocalStorage } from '@vueuse/core';
import { generateMockMindData } from "@/utils/mockUtils";

const eventListener = operation => {
  console.log(operation);
};

const initializeMind = elementLocator => {
    const options = { el: elementLocator };
    const mind = new MindElixir(options);
    const rootNode = MindElixir.new("demo");
    mind.install(nodeMenu);
    mind.init(rootNode);
    mind.bus.addListener('operation', eventListener);

    return mind;
};

export const useMindStore = defineStore('mind', {
  state: () => ({
    mind: null,
    mindDataStorage: useLocalStorage('mind-data', null)
  }),

  getters: {
    mindDataSync: (state) => state.mind.getData(),
    mindDataStored: (state) => JSON.parse(state.mindDataStorage),
  },

  actions: {
    experiment(elementLocator, level) {
      const options = { el: elementLocator };
      const mind = new MindElixir(options);
      const rootNode = MindElixir.new("demo");
      mind.install(nodeMenu);
      mind.init(rootNode);

      const mockData = generateMockMindData(level);
      mind.refresh(mockData);
    },

    initializeMind(elementLocator) {
      this.mind = initializeMind(elementLocator);
    },

    checkMindData() {
      console.log(this.mindDataSync);
      console.log(this.mindDataStored);
    },

    saveMindData() {
      this.mindDataStorage = JSON.stringify(this.mind.getData());
    },

    loadMindData() {
      if (this.mindDataStorage) {
        this.mind.refresh(this.mindDataStored);
      } else {
        console.log("FBI-ERROR: loading mindData failed: " + this.mindDataStored);
      }
    }
  },

})
