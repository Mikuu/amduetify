// Utilities
import { defineStore } from 'pinia'
import MindElixir from "mind-elixir";
import nodeMenu from '@mind-elixir/node-menu';
import { useLocalStorage } from '@vueuse/core';
import { generateMockMindData } from "@/utils/mockUtils";
import { extractViewData, flattenNodeData, nodesToMindData } from "@/utils/dataUtils";
import { keycloak } from "@/plugins/keycloak";
import * as ambClient from "@/clients/ambClient";

const SYNC_MIND_DATA_INTERVAL = 5000;

const pid = 'PID8af9fb79e7e0475f8835d5edbc861ea9';
const vid = 'VID49fb3f8d9a05414d8e6ddacb230cf8f7';

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
            if (!this.mindOperationStorage.updatedNodesIds.includes(operation.obj.id)) {
              this.mindOperationStorage.updatedNodesIds.push(operation.obj.id);
            }
            break;
          case 'removeNode':
            this.mindOperationStorage.removedNodesIds.push(operation.obj.id);
            break;
          default:
            // console.log('unlisted operation: ' + operation.name + ' -->');
            // console.log(operation)
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
      console.log(this.mindDataStorage.toString());

      console.log(`authenticated: ${keycloak.authenticated}`);
      console.log(`token: ${keycloak.token}`);
    },

    async saveMindData(succeedHandler, failedHandler) {
      const fullData = this.mind.getData();
      const viewData = extractViewData(vid, fullData);
      const updateNodes = flattenNodeData(fullData.nodeData, this.mindOperationStorage.updatedNodesIds);

      /** saving to backend **/
      ambClient.updateNodeBulk(keycloak.token, pid, vid, updateNodes, this.mindOperationStorage.removedNodesIds)
        .then(() => {
          this.cleanMindOperationStorage();
          succeedHandler();

        }).catch((reason) => {
          console.error(reason);
          failedHandler();
      });
    },

    async pullMindData(succeedHandler, failedHandler) {
      const viewDataResponse = await ambClient.retrieveView(keycloak.token, pid, vid);

      /** pulling data from backend **/
      ambClient.fetchNodeBulk(keycloak.token, pid, vid)
        .then(response => {
          const mindData = nodesToMindData(response.nodes);
          console.log(mindData);
          succeedHandler();

          const mindDataFromBackend = {
            /** backend doesn't support and never save frontend linkData, thus always create empty object when fetch
             * from backend **/
            linkData: {},
            theme: viewDataResponse.theme,
            direction: viewDataResponse.direction,
            nodeData: mindData
          };
          this.loadMindData(mindDataFromBackend);

        })
        .catch((reason) => {
          console.error(reason);
          failedHandler();
        })
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

    loadMindData(mindData) {
      this.mind.refresh(mindData);
    }
  },

})
