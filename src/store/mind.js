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

// const pid = 'PID8af9fb79e7e0475f8835d5edbc861ea9';
// const vid = 'VID49fb3f8d9a05414d8e6ddacb230cf8f7';

export const useMindStore = defineStore('mind', {
  state: () => ({
    pid: null,
    vid: null,
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
    // experiment(elementLocator, level) {
    //   const options = { el: elementLocator };
    //   const mind = new MindElixir(options);
    //   const rootNode = MindElixir.new("demo");
    //   mind.install(nodeMenu);
    //   mind.init(rootNode);
    //
    //   const mockData = generateMockMindData(level);
    //   mind.refresh(mockData);
    // },

    /***
     * This action must be called before pull and save data.
     * **/
    async chargeMetaData(vid) {
      const viewDataResponse = await ambClient.getView(keycloak.token, vid);
      this.pid = viewDataResponse.pid;
      this.vid = viewDataResponse.vid;
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
      const rootNode = MindElixir.new("Athena");

      this.mind = new MindElixir(options);
      this.mind.install(nodeMenu);
      this.mind.init(rootNode);
      this.mind.bus.addListener('operation', eventListener);
    },

    initializeMindData(rootNodeName) {
      const rootNode = MindElixir.new(rootNodeName);
      this.mind.init(rootNode);
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
      const viewData = extractViewData(this.vid, fullData);
      const updateNodes = flattenNodeData(fullData.nodeData, this.mindOperationStorage.updatedNodesIds);

      /** saving to backend **/
      ambClient.updateNodeBulk(keycloak.token, this.pid, this.vid, updateNodes, this.mindOperationStorage.removedNodesIds)
        .then(() => {
          this.cleanMindOperationStorage();
          if (typeof succeedHandler === 'function') succeedHandler();

        }).catch((reason) => {
          console.error(reason);
          if (typeof failedHandler === 'function') failedHandler();
      });
    },

    // async pullMindData(succeedHandler, failedHandler) {
    //   const viewDataResponse = await ambClient.getView(keycloak.token, this.vid);
    //
    //   /** pulling data from backend **/
    //   ambClient.fetchNodeBulk(keycloak.token, this.pid, this.vid)
    //     .then(response => {
    //       const mindData = nodesToMindData(response.nodes);
    //       console.log(mindData);
    //       if (typeof succeedHandler === 'function') succeedHandler();
    //
    //       const mindDataFromBackend = {
    //         /** backend doesn't support and never save frontend linkData, thus always create empty object when fetch
    //          * from backend **/
    //         linkData: {},
    //         theme: viewDataResponse.theme,
    //         direction: viewDataResponse.direction,
    //         nodeData: mindData
    //       };
    //       this.loadMindData(mindDataFromBackend);
    //
    //     })
    //     .catch((reason) => {
    //       console.error(reason);
    //       if (typeof failedHandler === 'function') failedHandler();
    //     })
    // },

    async pullMindData(succeedHandler=null, failedHandler=null) {
      // const viewDataResponse = await ambClient.getView(keycloak.token, this.vid);

      /** pulling data from backend **/
      ambClient.fetchNodeBulk(keycloak.token, this.pid, this.vid)
        .then(async response => {
          const mindData = nodesToMindData(response.nodes);
          console.log(`FBI --> response:`);
          console.log(response);
          console.log(response.nodes);
          console.log(mindData);

          // if (mindData) {
          //   this.loadMindData({
          //     /** backend doesn't support and never save frontend linkData, thus always create empty object when fetch
          //      * from backend **/
          //     linkData: {},
          //     theme: viewDataResponse.theme,
          //     direction: viewDataResponse.direction,
          //     nodeData: mindData
          //   });
          //
          // } else {
          //   this.initializeMindData(viewDataResponse.viewName);
          // }

          await this.loadBackendMindDataOrInitializeNewMind(this.vid, mindData);
          if (typeof succeedHandler === 'function') succeedHandler();

        })
        .catch((reason) => {
          console.error(reason);
          if (typeof failedHandler === 'function') failedHandler();
        })
    },

    cleanMindOperationStorage() {
      this.mindOperationStorage.updatedNodesIds = [];
      this.mindOperationStorage.removedNodesIds = [];
    },

    setupAutoSyncMindDataToStorage() {
      setInterval(() => {
        this.mindDataStorage = JSON.stringify(this.mind.getData());
      }, SYNC_MIND_DATA_INTERVAL);
    },

    async loadBackendMindDataOrInitializeNewMind(vid, mindData) {
      const viewDataResponse = await ambClient.getView(keycloak.token, vid);

      console.log(`FBI --> mindData: `);
      console.log(mindData);


      if (mindData) {
        this.loadMindData({
          /** backend doesn't support and never save frontend linkData, thus always create empty object when fetch
           * from backend **/
          linkData: {},
          theme: viewDataResponse.theme,
          direction: viewDataResponse.direction,
          nodeData: mindData
        });

      } else {
        this.initializeMindData(viewDataResponse.viewName);
      }
    },

    loadMindData(mindData) {
      this.mind.refresh(mindData);
    }
  },

})
