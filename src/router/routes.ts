import { RouteConfig } from "vue-router";

const routes: RouteConfig[] = [
  {
    path: "/",
    name: "main",
    components: {
      default: (): Promise<any> => import("pages/Presentation.vue")
    },
    meta: {
      toolbar: true,
      prod: true,
      unauthorized: true
    }
  },
  {
    path: "/auth/newpass",
    redirect: {
      name: "main"
    }
  },
  {
    path: "/about",
    name: "about",
    component: (): Promise<any> => import("pages/About.vue"),
    meta: {
      toolbar: true,
      prod: true,
      unauthorized: true
    }
  },
  {
    path: "/design",
    name: "design",
    redirect: {
      name: "design-intro"
    },
    components: {
      default: (): Promise<any> => import("pages/design-code/DesignCode.vue"),
      asideLeft: (): Promise<any> => import("components/aside/design-code/AsideDesignCode.vue")
    },
    meta: {
      toolbar: true,
      asideLeft: true,
      prod: true,
      unauthorized: true
    },
    children: [
      {
        path: "intro",
        name: "design-intro",
        components: {
          default: (): Promise<any> => import("pages/design-code/DesignIntro.vue")
        },
        meta: {
          toolbar: true,
          asideLeft: true,
          prod: true,
          unauthorized: true
        }
      },
      {
        path: "section/:id",
        name: "design-section",
        components: {
          default: (): Promise<any> => import("pages/design-code/DesignSection.vue"),
          asideSection: (): Promise<any> => import("components/aside/design-code/AsideDesignSection.vue")
        },
        meta: {
          toolbar: true,
          asideSection: true,
          prod: true,
          unauthorized: true
        }
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
          toolbar: true,
          prod: true
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
              showChangeEmailModal: true,
              prod: true
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
              showChangePasswordModal: true,
              prod: true
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
          toolbar: true,
          prod: true
        }
      },
      {
        path: "tickets",
        name: "user-tickets",
        redirect: {
          name: "user-tickets-parking"
        },
        components: {
          default: (): Promise<any> => import("pages/UserTickets.vue")
        },
        meta: {
          toolbar: true,
          prod: true
        },
        children: [
          {
            path: "apartments",
            name: "user-tickets-apartments",
            components: {
              default: (): Promise<any> => import("pages/tickets/UserTicketsApartments.vue")
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
              content: true,
              prod: true
            }
          },
          {
            path: "commerce",
            name: "user-tickets-commerce",
            components: {
              default: (): Promise<any> => import("pages/tickets/TicketsCommerce.vue")
            }
          },
          {
            path: "warehouse",
            name: "user-tickets-warehouse",
            components: {
              default: (): Promise<any> => import("pages/tickets/TicketsWarehouse/TicketsWarehouse.vue")
            },
            meta: {
              toolbar: true,
              asideLeft: true,
              content: true,
              prod: true
            }
          },
          {
            path: "crowdfunding",
            name: "user-tickets-crowdfunding",
            components: {
              default: (): Promise<any> => import("pages/tickets/TicketsCrowdfunding/TicketsCrowdfunding.vue")
            },
            meta: {
              toolbar: true,
              asideLeft: true,
              content: true
            }
          },
          {
            path: "vacancy",
            name: "user-tickets-vacancy",
            components: {
              default: (): Promise<any> => import("pages/tickets/UserTicketsVacancy/UserTicketsVacancy.vue")
            },
            meta: {
              toolbar: true,
              asideLeft: true,
              content: true,
              prod: true
            }
          },
          {
            path: "responds",
            name: "user-tickets-employee-responds",
            components: {
              default: (): Promise<any> => import("pages/tickets/UserTicketsEmployeeResponds.vue")
            },
            meta: {
              toolbar: true,
              asideLeft: true,
              content: true
            }
          },
          {
            path: "verify-requests",
            name: "user-tickets-verify-requests",
            components: {
              default: (): Promise<any> => import("pages/tickets/UserTicketsVerifyRequests.vue")
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
        path: "tickets/vacancy",
        name: "user-tickets-vacancy-page",
        redirect: { name: "user-tickets-vacancy-info" },
        components: {
          default: (): Promise<any> => import("pages/tickets/UserTicketsVacancy/UserVacancyPage.vue")
        },
        meta: {
          toolbar: true,
          asideLeft: true,
          content: true,
          prod: true
        },
        children: [
          {
            path: ":id",
            name: "user-tickets-vacancy-info",
            components: {
              default: (): Promise<any> => import("pages/tickets/UserTicketsVacancy/UserTicketsVacancyInfo.vue")
            },
            meta: {
              toolbar: true,
              asideLeft: true,
              content: true,
              prod: true
            }
          },
          {
            path: ":id/candidates",
            name: "user-tickets-vacancy-candidates",
            components: {
              default: (): Promise<any> => import("pages/tickets/UserTicketsVacancy/UserVacancyCandidates.vue")
            },
            meta: {
              toolbar: true,
              asideLeft: true,
              content: true,
              prod: true
            }
          }
        ]
      },
      {
        path: "company",
        name: "user-company",
        component: (): Promise<any> => import("pages/UserCompanyProfile.vue"),
        meta: {
          toolbar: true,
          prod: true
        }
      },
      {
        path: "bills",
        name: "user-bills",
        redirect: {
          name: "user-bills-parking"
        },
        meta: {
          prod: true
        },
        component: (): Promise<any> => import("pages/UserBills.vue"),
        children: [
          {
            path: "apartments/:ticket?",
            name: "user-bills-apartments",
            component: (): Promise<any> => import("pages/bills/UserBillsApartments.vue")
          },
          {
            path: "parking/:ticket?",
            name: "user-bills-parking",
            meta: {
              prod: true
            },
            component: (): Promise<any> => import("pages/bills/UserBillsParking.vue")
          },
          {
            path: "warehouse/:ticket?",
            name: "user-bills-warehouse",
            meta: {
              prod: true
            },
            component: (): Promise<any> => import("pages/bills/UserBillsWarehouse.vue")
          }
        ]
      }
    ]
  },
  {
    path: "/data",
    name: "data",
    components: {
      default: (): Promise<any> => import("pages/UnderDevelopment.vue")
    },
    meta: {
      prod: true,
      unauthorized: true
    }
  },
  {
    path: "/map",
    name: "map",
    components: {
      default: (): Promise<any> => import("pages/maps/MapsService.vue"),
      asideLeft: (): Promise<any> => import("components/aside/AsideMaps.vue")
    },
    meta: {
      map: true,
      isBurger: true,
      prod: true
    },
    children: [
      {
        path: "buildings",
        name: "map-buildings",
        components: {
          default: (): Promise<any> => import("pages/maps/buildings/MapBuildings.vue"),
          asideMaps: (): Promise<any> => import("components/aside/maps/buildings/AsideMapsBuildings.vue")
        },
        meta: {
          map: true,
          toolbar: true,
          asideMaps: true,
          unauthorized: true,
          prod: true
        },
        children: [
          {
            path: ":layer/:id",
            name: "map-buildings-item",
            components: {
              default: (): Promise<any> => import("pages/maps/buildings/MapBuildingsItem.vue"),
              asideBuildings: (): Promise<any> => import("components/aside/maps/buildings/AsideMapsBuildingsItem.vue")
            },
            meta: {
              map: true,
              toolbar: true,
              asideMaps: true,
              unauthorized: true,
              prod: true
            }
          }
        ]
      },
      {
        path: "transport",
        name: "map-transport",
        components: {
          default: (): Promise<any> => import("pages/maps/transport/MapTransport.vue"),
          asideMaps: (): Promise<any> => import("components/aside/maps/transport/AsideMapsTransport.vue")
        },
        meta: {
          map: true,
          toolbar: true,
          asideMaps: true,
          unauthorized: true,
          prod: false
        },
        children: [
          {
            path: ":layer/:id",
            name: "map-transport-item",
            components: {
              default: (): Promise<any> => import("pages/maps/transport/MapTransportItem.vue"),
              asideTransport: (): Promise<any> => import("components/aside/maps/transport/AsideMapsTransportItem.vue")
            },
            meta: {
              map: true,
              toolbar: true,
              asideMaps: true,
              unauthorized: true,
              prod: true
            }
          }
        ]
      },
      {
        path: "security",
        name: "map-security",
        components: {
          default: (): Promise<any> => import("pages/maps/security/MapSecurity.vue"),
          asideMaps: (): Promise<any> => import("components/aside/maps/security/AsideMapsSecurity.vue")
        },
        meta: {
          map: true,
          toolbar: true,
          asideMaps: true,
          unauthorized: true,
          prod: true
        }
      },
      {
        path: "territory",
        name: "map-territory",
        components: {
          default: (): Promise<any> => import("pages/maps/territory/MapTerritory.vue"),
          asideMaps: (): Promise<any> => import("components/aside/maps/territory/AsideMapsTerritory.vue")
        },
        meta: {
          map: true,
          toolbar: true,
          asideMaps: true,
          unauthorized: true,
          prod: false
        }
      },
      {
        path: "tourism",
        name: "map-tourism",
        components: {
          default: (): Promise<any> => import("../pages/maps/tourism/MapTourism.vue"),
          asideMaps: (): Promise<any> => import("components/aside/maps/tourism/AsideMapsTourism.vue")
        },
        meta: {
          map: true,
          toolbar: true,
          asideMaps: true,
          unauthorized: true,
          prod: true
        },
        children: [
          {
            path: ":category",
            name: "map-tourism-category",
            components: {
              default: (): Promise<any> => import("pages/maps/tourism/MapTourismCategory.vue"),
              asideTourism: (): Promise<any> => import("components/aside/maps/tourism/AsideMapsTourismCategory.vue")
            },
            meta: {
              map: true,
              toolbar: true,
              asideMaps: true,
              unauthorized: true,
              prod: true
            }
          },
          {
            path: ":category/:layer",
            name: "map-tourism-layer",
            components: {
              default: (): Promise<any> => import("pages/maps/tourism/MapTourismLayer.vue"),
              asideTourism: (): Promise<any> => import("components/aside/maps/tourism/AsideMapsTourismLayer.vue")
            },
            meta: {
              map: true,
              toolbar: true,
              asideMaps: true,
              unauthorized: true,
              prod: true
            }
          },
          {
            path: ":category/:layer/:id",
            name: "map-tourism-entity",
            components: {
              default: (): Promise<any> => import("pages/maps/tourism/MapTourismEntity.vue"),
              asideTourism: (): Promise<any> => import("components/aside/maps/tourism/AsideMapsTourismEntity.vue")
            },
            meta: {
              map: true,
              toolbar: true,
              asideMaps: true,
              unauthorized: true,
              prod: true
            }
          }
        ]
      },
      {
        path: "trees",
        name: "map-trees",
        components: {
          default: (): Promise<any> => import("pages/services/ServiceTrees.vue")
        },
        meta: {
          map: true,
          toolbar: true,
          unauthorized: true
        }
      },
      {
        path: "engineering",
        name: "map-engineering",
        components: {
          default: (): Promise<any> => import("pages/maps/engineering/MapsEngineering.vue"),
          asideMaps: (): Promise<any> => import("components/aside/maps/engineering/AsideMapsEngineering.vue")
        },
        meta: {
          map: true,
          toolbar: true,
          asideMaps: true,
          unauthorized: true,
          prod: true
        },
        children: [
          {
            path: ":layer/:id",
            name: "map-engineering-item",
            components: {
              default: (): Promise<any> => import("pages/maps/engineering/MapsEngineeringItem.vue"),
              asideEngineering: (): Promise<any> => import("components/aside/maps/engineering/AsideMapsEngineeringItem.vue")
            },
            meta: {
              map: true,
              toolbar: true,
              asideMaps: true,
              unauthorized: true,
              prod: true
            }
          }
        ]
      },
      {
        path: "light",
        name: "map-light",
        components: {
          default: (): Promise<any> => import("pages/maps/light/MapLight.vue"),
          asideMaps: (): Promise<any> => import("components/aside/maps/light/AsideMapsLight.vue")
        },
        meta: {
          map: true,
          toolbar: true,
          asideMaps: true,
          unauthorized: true,
          prod: false
        }
      },
      {
        path: "improvement",
        name: "map-improvement",
        components: {
          default: (): Promise<any> => import("pages/maps/improvement/MapImprovement.vue"),
          asideMaps: (): Promise<any> => import("components/aside/maps/improvement/AsideMapsImprovement.vue")
        },
        meta: {
          map: true,
          toolbar: true,
          asideMaps: true,
          unauthorized: true,
          prod: false
        }
      }
    ]
  },
  {
    path: "/services",
    name: "services",
    components: {
      default: (): Promise<any> => import("pages/services/BaseService.vue"), // STUB
      asideLeft: (): Promise<any> => import("components/aside/AsideServices.vue")
    },
    meta: {
      toolbar: true,
      prod: true,
      map: true,
      isBurger: true
    },
    children: [
      {
        path: "estate",
        name: "services-estate",
        components: {
          default: (): Promise<any> => import("pages/services/ServiceEstate.vue")
        },
        meta: {
          toolbar: true
        },
        children: [
          {
            path: ":id",
            name: "services-estate-details",
            components: {
              default: (): Promise<any> => import("pages/services/ServiceEstate.vue")
            },
            meta: {
              toolbar: true
            }
          }
        ]
      },
      {
        path: "transport",
        name: "services-transport",
        components: {
          default: (): Promise<any> => import("pages/services/ServiceEstate.vue")
        },
        meta: {
          toolbar: true
        }
      },
      {
        path: "landscape",
        name: "services-landscape",
        components: {
          default: (): Promise<any> => import("pages/services/ServiceEstate.vue")
        },
        meta: {
          toolbar: true
        }
      },
      {
        path: "light",
        name: "services-light",
        components: {
          default: (): Promise<any> => import("pages/services/ServiceLight.vue")
        },
        meta: {
          map: true,
          asideServices: true,
          toolbar: true
        }
      },
      {
        path: "planning",
        name: "services-planning",
        components: {
          default: (): Promise<any> => import("pages/services/ServiceEstate.vue")
        },
        meta: {
          toolbar: true
        }
      },
      {
        path: "apartments",
        name: "services-apartments",
        components: {
          default: (): Promise<any> => import("pages/services/ServiceApartments.vue")
        },
        meta: {
          map: true,
          toolbar: true
        }
      },
      {
        path: "commerce",
        name: "services-commerce",
        components: {
          default: (): Promise<any> => import("pages/services/ServiceCommerce.vue")
        },
        meta: {
          map: true,
          toolbar: true,
          creatorPoint: true
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
          map: true,
          asideServices: true,
          toolbar: true,
          prod: true
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
          map: true,
          asideServices: true,
          toolbar: true,
          prod: true
        }
      },
      {
        path: "ideas",
        name: "services-ideas",
        components: {
          default: (): Promise<any> => import("pages/services/ServiceIdeas.vue"),
          asideServices: (): Promise<any> => import("components/aside/services/AsideServicesIdeas.vue")
        },
        meta: {
          map: true,
          asideServices: true,
          toolbar: true
        }
      },
      {
        path: "crowdfunding",
        name: "services-crowdfunding",
        components: {
          default: (): Promise<any> => import("pages/services/ServiceCrowdfunding.vue"),
          asideServices: (): Promise<any> => import("components/aside/services/AsideServicesCrowdfunding.vue")
        },
        meta: {
          asideServices: true,
          toolbar: true
        }
      },
      {
        path: "vacancies",
        name: "services-vacancies",
        components: {
          default: (): Promise<any> => import("pages/services/vacancies/ServiceVacancy.vue"),
          asideServices: (): Promise<any> => import("components/aside/services/AsideServicesVacancy.vue")
        },
        meta: {
          asideServices: true,
          toolbar: true,
          prod: true
        }
      },
      {
        path: "vacancies/:id(\\d+)",
        name: "services-vacancies-item",
        components: {
          default: (): Promise<any> => import("pages/services/vacancies/ServiceVacancyItemPage.vue"),
          asideServices: (): Promise<any> => import("components/aside/services/AsideServicesVacancyItem.vue")
        },
        meta: {
          asideServices: true,
          toolbar: true,
          prod: true
        }
      },
      {
        path: "trees",
        name: "services-trees",
        components: {
          default: (): Promise<any> => import("pages/services/ServiceTrees.vue"),
          asideServices: (): Promise<any> => import("components/aside/services/AsideServicesTrees.vue")
        },
        meta: {
          map: true,
          asideServices: true,
          toolbar: true
        }
      }
    ]
  },
  {
    path: "/services/commerce/:id",
    name: "services-commerce-place",
    components: {
      default: (): Promise<any> => import("pages/services/commerce/CommercePlaceInfo.vue"),
      asideLeft: (): Promise<any> => import("components/aside/services/AsideServicesCommercePlace.vue")
    },
    meta: {
      toolbar: true
    }
  },
  {
    path: "/users",
    name: "users",
    components: {
      default: (): Promise<any> => import("pages/users/AdminUsers.vue")
    },
    meta: {
      prod: true
    }
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    name: "error-page",
    components: {
      default: (): Promise<any> => import("pages/Error404.vue")
    },
    meta: {
      prod: true,
      unauthorized: true
    }
  }
];

export default routes;
