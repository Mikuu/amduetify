import { defineStore } from 'pinia'
import { keycloak } from "@/plugins/keycloak";
import * as ambClient from "@/clients/ambClient";

export const useViewStore = defineStore('view', {
  state: () => ({
    views: [],
    view: null
  }),

  getters: {},

  actions: {
    retrieveViews(pid, succeedHandler=null, failedHandler=null) {
      ambClient.retrieveViews(keycloak.token, pid)
        .then(response => {
          this.views = response.views;
          if (succeedHandler) { succeedHandler(); }
        })
        .catch(reason => {
          console.error(reason);
          if (failedHandler) { failedHandler(reason?.message ? `: ${reason?.message}` : ""); }
        });
    },

    async getView(vid, succeedHandler=null, failedHandler=null) {
      await ambClient.getView(keycloak.token, vid)
        .then(response => {
          this.view = response;
          if (succeedHandler) { succeedHandler(); }
        })
        .catch(reason => {
          console.error(reason);
          if (failedHandler) { failedHandler(); }
        });
    },

    createView(pid, viewType, viewName, succeedHandler=null, failedHandler=null) {
      ambClient.createView(keycloak.token, pid, viewType, viewName)
        .then(response => {
          if (succeedHandler) { succeedHandler(); }
        })
        .catch(reason => {
          console.error(reason);
          if (failedHandler) { failedHandler(reason?.message ? `: ${reason?.message}` : ""); }
        });
    },

    deleteView(vid, succeedHandler=null, failedHandler=null) {
      ambClient.deleteView(keycloak.token, vid)
        .then(response => {
         if (succeedHandler) { succeedHandler(); }
        })
        .catch(reason => {
          console.error(reason);
          if (failedHandler) { failedHandler(); }
        });
    },

    deleteViews(pid, succeedHandler=null, failedHandler=null) {
      ambClient.deleteViews(keycloak.token, pid)
        .then(response => {
         if (succeedHandler) { succeedHandler(); }
        })
        .catch(reason => {
          console.error(reason);
          if (failedHandler) { failedHandler(); }
        });
    },

  },
})
