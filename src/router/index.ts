import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
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

export default createRouter({
  history: createWebHistory(),
  routes,
});
