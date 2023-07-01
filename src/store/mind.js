// Utilities
import { defineStore } from 'pinia'
import MindElixir from "mind-elixir";
import nodeMenu from '@mind-elixir/node-menu';
import { useLocalStorage } from '@vueuse/core';
import { generateMockMindData } from "@/utils/mockUtils";
import { extractViewData, flattenNodeData } from "@/utils/dataUtils";
import { updateNodeBulk } from "@/clients/ambClient";

const SYNC_MIND_DATA_INTERVAL = 5000;

export const useMindStore = defineStore('mind', {
  state: () => ({
    mind: null,
    mindDataStorage: useLocalStorage('mind-data', null),
    mindOperationStorage: useLocalStorage('mind-operation', {
      updatedNodesIds: [],
      removedNodesIds: []
    }),
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
      const eventListener = operation => {
        switch (operation.name) {
          case 'finishEdit':
          case 'reshapeNode':
          case 'updateMemo':
            console.log(operation);
            console.log(operation.obj.parent.id);
            if (!this.mindOperationStorage.updatedNodesIds.includes(operation.obj.id)) {
              this.mindOperationStorage.updatedNodesIds.push(operation.obj.id);
            }
            break;
          case 'removeNode':
            this.mindOperationStorage.removedNodesIds.push(operation.obj.id);
            break;
          default:
            console.log('unlisted operation: ' + operation.name + ' -->');
            console.log(operation)
        }
      };

      const options = { el: elementLocator };
      const rootNode = MindElixir.new("demo");

      this.mind = new MindElixir(options);
      this.mind.install(nodeMenu);
      this.mind.init(rootNode);
      this.mind.bus.addListener('operation', eventListener);
    },

    checkMindData() {
      console.log(this.mindDataSync);
      console.log(this.mindDataStored);
    },

    async saveMindData(succeedHandler, failedHandler) {
      const pid = 'PID8af9fb79e7e0475f8835d5edbc861ea9';
      const vid = 'VID903beeb7fdff49ad93e43f7edfa32f11';
      const fullData = this.mind.getData();
      const viewData = extractViewData(vid, fullData);
      const updateNodes = flattenNodeData(fullData.nodeData, this.mindOperationStorage.updatedNodesIds);

      /** saving to backend **/
      updateNodeBulk(pid, vid, updateNodes, this.mindOperationStorage.removedNodesIds)
        .then(() => {
          this.cleanMindOperationStorage();
          succeedHandler();

        }).catch(() => {
          failedHandler();
      });
    },

    cleanMindOperationStorage() {
      this.mindOperationStorage.updatedNodesIds = [];
      this.mindOperationStorage.removedNodesIds = [];
    },

    syncMindDataToStorage() {
      setInterval(() => {
        this.mindDataStorage = JSON.stringify(this.mind.getData());
      }, SYNC_MIND_DATA_INTERVAL);
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
