import { RouteConfig } from "vue-router";

import MainLayout from "@/layouts/MainLayout.vue";
import ProfileLayout from "@/layouts/ProfileLayout.vue";
import EmptyLayout from "@/layouts/EmptyLayout.vue";
import Toolbar from "@/components/Toolbar.vue";

const routes: RouteConfig[] = [
  {
    path: "/",
    name: "main",
    components: {
      default: (): Promise<any> => import("pages/Index.vue"),
      toolbar: Toolbar
    },
    meta: {
      layout: MainLayout
    }
  },
  {
    path: "/playground",
    name: "playground",
    redirect: {
      name: "playground-buttons"
    },
    components: {
      default: (): Promise<any> => import("pages/UIPlayground.vue"),
      toolbar: Toolbar,
      asideLeft: (): Promise<any> => import("components/aside/AsideProfile.vue")
    },
    meta: {
      layout: MainLayout
    },
    children: [
      {
        path: "buttons",
        name: "playground-buttons",
        meta: {
          layout: MainLayout
        },
        component: (): Promise<any> => import("components/playground/Buttons.vue")
      },
      {
        path: "inputs",
        name: "playground-inputs",
        meta: {
          layout: MainLayout
        },
        component: (): Promise<any> => import("components/playground/Inputs.vue")
      },
      {
        path: "selects",
        name: "playground-selects",
        meta: {
          layout: MainLayout
        },
        component: (): Promise<any> => import("components/playground/Selects.vue")
      }
    ]
  },
  {
    path: "/profile",
    name: "profile",
    components: {
      default: (): Promise<any> => import("pages/Profile.vue"),
      toolbar: Toolbar,
      asideLeft: (): Promise<any> => import("@/components/Aside/AsideProfile.vue")
    },
    meta: {
      layout: ProfileLayout
    }
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/error",
    alias: "*",
    name: "error-page",
    components: {
      default: (): Promise<any> => import("pages/Error404.vue"),
      toolbar: Toolbar
    },
    meta: {
      layout: EmptyLayout
    }
  }
];

export default routes;
