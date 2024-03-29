import { RouteConfig } from "vue-router";

const routes: RouteConfig[] = [
  {
    path: "/",
    component: (): Promise<any> => import("layouts/MainLayout.vue"),
    children: [
      { path: "", name: "index", component: (): Promise<any> => import("pages/Index.vue") },
      { path: "/UIKit", name: "ui-kit", component: (): Promise<any> => import("pages/UI-kit.vue") }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    name: "error-page",
    component: (): Promise<any> => import("pages/Error404.vue")
  }
];

export default routes;
