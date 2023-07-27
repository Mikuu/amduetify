import { defineStore } from 'pinia'
import { keycloak } from "@/plugins/keycloak";
import * as ambClient from "@/clients/ambClient";

export const useViewStore = defineStore('view', {
  state: () => ({
    views: []
  }),

  getters: {},

  actions: {
    retrieveViews(succeedHandler=null, failedHandler=null) {
      // ambClient.retrieveProjects(keycloak.token, keycloak.idTokenParsed)
      //   .then(response => {
      //     this.projects = response.projects;
      //     if (succeedHandler) { succeedHandler(); }
      //   })
      //   .catch(reason => {
      //     console.error(reason);
      //     if (failedHandler) { failedHandler(); }
      //   });
    },

    createView(projectName, succeedHandler=null, failedHandler=null) {
      // ambClient.createProject(keycloak.token, projectName)
      //   .then(response => {
      //     if (succeedHandler) { succeedHandler(); }
      //   })
      //   .catch(reason => {
      //     console.error(reason);
      //     if (failedHandler) { failedHandler(reason?.message ? `: ${reason?.message}` : ""); }
      //   });
    },

    deleteView(pid, succeedHandler=null, failedHandler=null) {
      // ambClient.deleteProject(keycloak.token, pid)
      //   .then(response => {
      //    if (succeedHandler) { succeedHandler(); }
      //   })
      //   .catch(reason => {
      //     console.error(reason);
      //     if (failedHandler) { failedHandler(); }
      //   });
    },

  },
})
