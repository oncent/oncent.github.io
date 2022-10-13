import { createMemoryHistory, createRouter } from "vue-router";

const router = createRouter({
  // history: createWebHashHistory(import.meta.env.BASE_URL),
  // 使用MemoryHistory可以在保持路由不变的前提下模拟路由行为，可以防止在移动端手势触发或者浏览器前进后退按钮导致的路由改变
  history: createMemoryHistory(),
  routes: [
    {
      path: "/",
      redirect: "/home",
    },
    {
      path: "/home",
      component: () => import("@/layouts/MainLayout.vue"),
      children: [
        {
          path: "/home",
          name: "home",
          component: () => import("@/views/HomeView.vue"),
        },
        {
          path: "/stat",
          name: "stat",
          component: () => import("@/views/StatView.vue"),
        },
        {
          path: "/search",
          name: "search",
          component: () => import("@/views/SearchView.vue"),
        },
      ],
    },

    {
      path: "/edit",
      name: "edit",
      component: () => import("@/views/EditorView.vue"),
      meta: {
        popup: true,
      },
      beforeEnter: (to, from) => {
        if (from.fullPath === "/") {
          return "/home";
        }
        return true;
      },
    },
    {
      path: "/settings",
      name: "settings",
      component: () => import("@/views/SettingsView.vue"),
      meta: {
        popup: true,
        popupOption: {
          closeOnModal: true,
        },
      },
      beforeEnter: (to, from) => {
        if (from.fullPath === "/") {
          return "/home";
        }
        return true;
      },
    },
  ],
});

export default router;
