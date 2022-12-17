import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("@/views/Photos.vue"),
  },
  {
    path: "/search",
    component: () => import("@/views/Search.vue"),
  },
  {
    path: "/favorites",
    component: () => import("@/views/Favorites.vue"),
  },
  {
    path: "/upload",
    component: () => import("@/views/Upload.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;