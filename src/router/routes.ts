import { RouteConfig } from "vue-router";

import MainLayout from "@/layouts/MainLayout.vue";
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
    components: {
      default: (): Promise<any> => import("pages/UIPlayground.vue"),
      toolbar: Toolbar
    },
    meta: {
      layout: MainLayout
    }
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    name: "error-page",
    components: {
      default: (): Promise<any> => import("pages/Error404.vue"),
      toolbar: Toolbar
    },
    meta: {
      layout: MainLayout
    }
  }
];

export default routes;
