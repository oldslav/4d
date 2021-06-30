import { RouteConfig } from "vue-router";

const routes: RouteConfig[] = [
  {
    path: "/",
    name: "main",
    components: {
      default: (): Promise<any> => import("pages/Presentation.vue")
    },
    meta: {
      toolbar: true
    }
  },
  {
    path: "/about",
    name: "about",
    component: (): Promise<any> => import("pages/About.vue"),
    meta: {
      toolbar: true
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
    meta: {
      toolbar: true
    },
    children: [
      {
        path: "buttons",
        name: "playground-buttons",
        component: (): Promise<any> => import("components/playground/Buttons.vue")
      },
      {
        path: "inputs",
        name: "playground-inputs",
        component: (): Promise<any> => import("components/playground/Inputs.vue")
      },
      {
        path: "selects",
        name: "playground-selects",
        component: (): Promise<any> => import("components/playground/Selects.vue")
      }
    ]
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
      asideLeft: true
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
          toolbar: true
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
          default: (): Promise<any> => import("pages/documents/ProfileDocuments.vue")
        },
        meta: {
          toolbar: true
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
          toolbar: true
        },
        children: [
          {
            path: "apartments",
            name: "user-tickets-apartments",
            components: {
              default: (): Promise<any> => import("pages/tickets/ApartmentRent.vue")
            },
            meta: {
              toolbar: true
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
              default: (): Promise<any> => import("pages/tickets/ParkingRent.vue")
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
        path: "company",
        name: "user-company",
        component: (): Promise<any> => import("pages/UserCompanyProfile.vue"),
        meta: {
          toolbar: true
        }
      },
      {
        path: "bills",
        name: "user-bills",
        components: {
          default: (): Promise<any> => import("pages/UserBills.vue")
        },
        meta: {
          toolbar: true
        }
      }
    ]
  },
  {
    path: "/data",
    name: "data",
    components: {
      default: (): Promise<any> => import("pages/UnderDevelopment.vue")
    }
  },
  {
    path: "/design",
    name: "design",
    components: {
      default: (): Promise<any> => import("pages/UnderDevelopment.vue")
    }
  },
  {
    path: "/map",
    name: "map",
    components: {
      default: (): Promise<any> => import("pages/UnderDevelopment.vue")
    }
  },
  {
    path: "/services",
    name: "services",
    components: {
      default: (): Promise<any> => import("pages/services/BaseService.vue"), // STUB
      asideLeft: (): Promise<any> => import("components/aside/AsideServices.vue")
    },
    meta: {
      toolbar: true
    },
    children: [
      {
        path: "living",
        name: "services-living",
        components: {
          default: (): Promise<any> => import("pages/Services.vue")
        },
        meta: {
          toolbar: true
        }
      },
      {
        path: "commerce",
        name: "services-commerce",
        components: {
          default: (): Promise<any> => import("pages/Services.vue")
        },
        meta: {
          toolbar: true
        }
      },
      {
        path: "parking",
        name: "services-parking",
        components: {
          default: (): Promise<any> => import("pages/services/ServiceParking.vue"),
          asideServices: (): Promise<any> => import("components/aside/services/AsideServicesParking.vue")
        },
        meta: {
          asideServices: true,
          toolbar: true
        }
      },
      {
        path: "warehouse",
        name: "services-warehouse",
        components: {
          default: (): Promise<any> => import("pages/services/ServiceWarehouse.vue"),
          asideServices: (): Promise<any> => import("components/aside/services/AsideServicesWarehouse.vue")
        },
        meta: {
          asideServices: true,
          toolbar: true
        }
      },
      {
        path: "ideas",
        name: "services-ideas",
        components: {
          default: (): Promise<any> => import("pages/Services.vue")
        },
        meta: {
          toolbar: true
        }
      },
      {
        path: "vacancies",
        name: "services-vacancies",
        components: {
          default: (): Promise<any> => import("pages/Services.vue")
        },
        meta: {
          toolbar: true
        }
      }
    ]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    name: "error-page",
    components: {
      default: (): Promise<any> => import("pages/Error404.vue")
    }
  }
];

export default routes;
