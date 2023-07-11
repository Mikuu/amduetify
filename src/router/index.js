import { createRouter, createWebHistory } from 'vue-router'
import MindingView from "@/views/MindingView"
import { keycloak } from "@/plugins/keycloak";

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
      },
    ],
    meta: {
      requireAuth: false,
    }
  },
  {
    path: '/minding',
    name: 'Minding',
    component: MindingView,
    meta: {
      requireAuth: true,
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  const checkAndAuthenticateWhenAuthRequired = () => {
    if (keycloak.authenticated) {
      next();

    } else {
      keycloak.login({
        redirectUri:  window.location.origin + to.fullPath
      })
    }
  };

  if (to.meta.requireAuth) {
    checkAndAuthenticateWhenAuthRequired();

  } else {
    next()
  }
})

export default router
