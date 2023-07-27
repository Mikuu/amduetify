import { defineStore } from 'pinia'

export const useBreadcrumbsStore = defineStore('breadcrumbs', {
  state: () => ({
    breadcrumbsConfig: [
      {
        title: 'Home',
        display: true,
        disabled: false,
        href: '/home',
      },
      {
        title: '',
        display: true,
        disabled: false,
        href: '',
      },
      {
        title: '',
        display: true,
        disabled: true,
        href: '',
      }
    ]
  }),

  getters: {
    breadcrumbs: () => { this.breadcrumbsConfig.filter(breadcrumb => breadcrumb.display) }
  },

  actions: {
    setHome(breadcrumb) {
      this.breadcrumbsConfig[0].display = breadcrumb.display;
      this.breadcrumbsConfig[0].disabled = breadcrumb.disabled;
      return this;
    },
    setProject(breadcrumb) {
      this.breadcrumbsConfig[1].title = breadcrumb?.title ? breadcrumb.title : this.breadcrumbsConfig[1].title;
      this.breadcrumbsConfig[1].display = breadcrumb?.display? breadcrumb.display : this.breadcrumbsConfig[1].display;
      this.breadcrumbsConfig[1].disabled = breadcrumb?.disabled? breadcrumb.disabled : this.breadcrumbsConfig[1].disabled;
      this.breadcrumbsConfig[1].href = breadcrumb?.href ? breadcrumb.href : this.breadcrumbsConfig[1].href;
      return this;
    },
    setView(breadcrumb) {
      this.breadcrumbsConfig[2].title = breadcrumb?.title ? breadcrumb.title : this.breadcrumbsConfig[2].title;
      this.breadcrumbsConfig[2].display = breadcrumb?.display? breadcrumb.display : this.breadcrumbsConfig[2].display;
      this.breadcrumbsConfig[2].disabled = breadcrumb?.disabled? breadcrumb.disabled : this.breadcrumbsConfig[2].disabled;
      this.breadcrumbsConfig[2].href = breadcrumb?.href ? breadcrumb.href : this.breadcrumbsConfig[2].href;
      return this;
    }
  },
})
