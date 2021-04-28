import { RouteConfig } from "vue-router";

const routes: RouteConfig[] = [
  {
    path: "/",
    name: "main",
    components: {
      default: (): Promise<any> => import("pages/Index.vue")
    },
    meta: {
      asideLeft: false,
      toolbar: true,
      asideRight: false,
      content: true
    }
  },
  {
    path: "/playground",
    name: "playground",
    redirect: {
      name: "playground-buttons"
    },
    components: {
      default: (): Promise<any> => import("pages/UIPlayground.vue")
    },
    children: [
      {
        path: "buttons",
        name: "playground-buttons",
        component: (): Promise<any> => import("components/playground/Buttons.vue"),
        meta: {
              asideLeft: false,
              toolbar: true,
              asideRight: false,
              content: true
            }
      },
      {
        path: "inputs",
        name: "playground-inputs",
        component: (): Promise<any> => import("components/playground/Inputs.vue"),
        meta: {
          asideLeft: false,
          toolbar: true,
          asideRight: false,
          content: true
        }
      },
      {
        path: "selects",
        name: "playground-selects",
        component: (): Promise<any> => import("components/playground/Selects.vue"),
        meta: {
          asideLeft: false,
          toolbar: true,
          asideRight: false,
          content: true
        }
      }
    ],
    meta: {
      asideLeft: false,
      toolbar: true,
      asideRight: false,
      content: true
    }
  },
  {
    path: "/user",
    name: "user",
    redirect: {
      name: "user-profile"
    },
    components: {
      default: { render: (c) => c("router-view") }, // STUB
      asideLeft: (): Promise<any> => import("components/aside/AsideProfile.vue")
    },
    meta: {
      toolbar: true,
      asideLeft: true,
      content: true
    },
    children: [
      {
        path: "profile",
        name: "user-profile",
        components: {
          default: (): Promise<any> => import("pages/Profile.vue")
        },
        meta: {
          asideLeft: true,
          toolbar: true,
          asideRight: false,
          content: true
        }
      },
      {
        path: "tickets",
        name: "user-tickets",
        components: {
          default: (): Promise<any> => import("pages/UserTickets.vue")
        },
        meta: {
          toolbar: true,
          asideLeft: true,
          content: true
        }
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/error",
    alias: "*",
    name: "error-page",
    components: {
      default: (): Promise<any> => import("pages/Error404.vue")
    },
    meta: {
      asideLeft: false,
      toolbar: false,
      asideRight: false,
      content: true
    }
  }
];

export default routes;
