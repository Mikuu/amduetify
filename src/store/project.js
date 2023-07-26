import { defineStore } from 'pinia'
import { keycloak } from "@/plugins/keycloak";
import * as ambClient from "@/clients/ambClient";

export const useProjectStore = defineStore('project', {
  state: () => ({
    projects: []
  }),

  getters: {},

  actions: {
    retrieveProjects(succeedHandler, failedHandler) {
      ambClient.retrieveProjects(keycloak.token, keycloak.idTokenParsed)
        .then(response => {
          this.projects = response.projects;
          if (succeedHandler) { succeedHandler(); }
        })
        .catch(reason => {
          console.error(reason);
          if (failedHandler) { failedHandler(); }
        });
    },

    createProject(projectName, succeedHandler, failedHandler) {
      ambClient.createProject(keycloak.token, projectName)
        .then(response => {
          this.projects.unshift({ pid: response.pid, projectName: response.projectName });
          if (succeedHandler) { succeedHandler(); }
        })
        .catch(reason => {
          console.error(reason);
          if (failedHandler) { failedHandler(); }
        });


    },

  },
})
