import { defineStore } from 'pinia'
import { keycloak } from "@/plugins/keycloak";
import * as ambClient from "@/clients/ambClient";

export const useProjectStore = defineStore('project', {
  state: () => ({
    projects: []
  }),

  getters: {},

  actions: {
    retrieveProjects(succeedHandler=null, failedHandler=null) {
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

    createProject(projectName, succeedHandler=null, failedHandler=null) {
      ambClient.createProject(keycloak.token, projectName)
        .then(response => {
          if (succeedHandler) { succeedHandler(); }
        })
        .catch(reason => {
          console.error(reason);
          if (failedHandler) { failedHandler(reason?.message ? `: ${reason?.message}` : ""); }
        });
    },

    deleteProject(pid, succeedHandler=null, failedHandler=null) {
      ambClient.deleteProject(keycloak.token, pid)
        .then(response => {
         if (succeedHandler) { succeedHandler(); }
        })
        .catch(reason => {
          console.error(reason);
          if (failedHandler) { failedHandler(); }
        });
    },

    getProject(pid, succeedHandler=null, failedHandler=null) {
      ambClient.getProject(keycloak.token, pid)
          .then(response => {
            if (succeedHandler) { succeedHandler(response.projectName); }
          })
          .catch(reason => {
            console.error(reason);
            if (failedHandler) { failedHandler(reason?.message ? `: ${reason?.message}` : ""); }
          });
    },

  },
})
