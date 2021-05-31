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
    path: "/about",
    name: "about",
    component: (): Promise<any> => import("pages/About.vue"),
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
          default: (): Promise<any> => import("pages/UserProfile.vue"),
          asideLeft: (): Promise<any> => import("@/components/aside/AsideProfile.vue")
        },
        meta: {
          asideLeft: true,
          toolbar: true,
          asideRight: false,
          content: true
        },
        children: [
          {
            path: "change-email",
            name: "change-email",
            components: {
              default: (): Promise<any> => import("pages/UserProfile.vue"),
              asideLeft: (): Promise<any> => import("@/components/aside/AsideProfile.vue")
            },
            meta: {
              asideLeft: true,
              toolbar: true,
              asideRight: false,
              content: true,
              showChangeEmailModal: true
            }
          },
          {
            path: "change-password",
            name: "change-password",
            components: {
              default: (): Promise<any> => import("pages/UserProfile.vue"),
              asideLeft: (): Promise<any> => import("@/components/aside/AsideProfile.vue")
            },
            meta: {
              asideLeft: true,
              toolbar: true,
              asideRight: false,
              content: true,
              modal: true,
              showChangePasswordModal: true
            }
          }
        ]
      },
      {
        path: "documents",
        name: "user-documents",
        components: {
          default: (): Promise<any> => import("pages/UserDocuments.vue")
        },
        meta: {
          toolbar: true,
          asideLeft: true,
          content: true
        }
      },
      {
        path: "tickets",
        name: "user-tickets",
        redirect: {
          name: "user-tickets-apartments"
        },
        components: {
          default: (): Promise<any> => import("pages/UserTickets.vue")
        },
        meta: {
          toolbar: true,
          asideLeft: true,
          content: true
        },
        children: [
          {
            path: "apartments",
            name: "user-tickets-apartments",
            components: {
              default: (): Promise<any> => import("pages/tickets/ApartmentRent.vue")
            },
            meta: {
              toolbar: true,
              asideLeft: true,
              content: true
            }
          },
          {
            path: "ideas",
            name: "user-tickets-ideas",
            components: {
              default: (): Promise<any> => import("pages/tickets/UserTicketsIdeas.vue")
            },
            meta: {
              toolbar: true,
              asideLeft: true,
              content: true
            }
          },
          {
            path: "parking",
            name: "user-tickets-parking",
            components: {
              default: (): Promise<any> => import("pages/tickets/UserTicketsParking.vue")
            },
            meta: {
              toolbar: true,
              asideLeft: true,
              content: true
            }
          }
        ]
      },
      {
        path: "bills",
        name: "user-bills",
        components: {
          default: (): Promise<any> => import("pages/UserBills.vue")
        },
        meta: {
          toolbar: true,
          asideLeft: true,
          content: true
        }
      }
    ]
  },
  {
    path: "/data",
    name: "data",
    components: {
      default: (): Promise<any> => import("pages/Services.vue"),
      asideLeft: (): Promise<any> => import("components/aside/AsideServices.vue")
    },
    meta: {
      asideLeft: true,
      toolbar: true,
      asideRight: false,
      content: true
    }
  },
  {
    path: "/services",
    name: "services",
    components: {
      default: { render: (c) => c("router-view") }, // STUB
      asideLeft: (): Promise<any> => import("components/aside/AsideServices.vue")
    },
    meta: {
      asideLeft: true,
      toolbar: true,
      asideRight: false,
      content: true
    },
    children: [
      {
        path: "living",
        name: "services-living",
        components: {
          default: (): Promise<any> => import("pages/Services.vue")
        },
        meta: {
          asideLeft: true,
          toolbar: true,
          asideRight: false,
          content: true
        }
      },
      {
        path: "commerce",
        name: "services-commerce",
        components: {
          default: (): Promise<any> => import("pages/Services.vue")
        },
        meta: {
          asideLeft: true,
          toolbar: true,
          asideRight: false,
          content: true
        }
      },
      {
        path: "parking",
        name: "services-parking",
        components: {
          default: (): Promise<any> => import("components/services/parking/ServiceParking.vue"),
          asideServices: (): Promise<any> => import("components/aside/services/AsideServicesParking.vue")
        },
        meta: {
          asideLeft: true,
          asideServices: true,
          toolbar: true,
          asideRight: false,
          content: true
        }
      },
      {
        path: "warehouse",
        name: "services-warehouse",
        components: {
          default: (): Promise<any> => import("pages/services/ServiceWarehouse.vue")
        },
        meta: {
          asideLeft: true,
          toolbar: true,
          asideRight: false,
          content: true
        }
      },
      {
        path: "ideas",
        name: "services-ideas",
        components: {
          default: (): Promise<any> => import("pages/Services.vue")
        },
        meta: {
          asideLeft: true,
          toolbar: true,
          asideRight: false,
          content: true
        }
      },
      {
        path: "vacancies",
        name: "services-vacancies",
        components: {
          default: (): Promise<any> => import("pages/Services.vue")
        },
        meta: {
          asideLeft: true,
          toolbar: true,
          asideRight: false,
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
