import { route } from "quasar/wrappers";
import VueRouter from "vue-router";
import { Store } from "vuex";
import { TRootState } from "../store/types/root";
import routes from "./routes";

declare global {
  interface Window { dataLayer: Array<any>, ym: any; }
}

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

export default route<Store<TRootState>>(function ({ store, Vue }) {
  Vue.use(VueRouter);

  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as is and change from quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  });

  if (!process.env.SERVER) {
    Router.beforeEach((to, from, next) => {
      const isAuthenticated = store.getters.isAuthenticated;
      const isUnauthorized = !isAuthenticated && !to.meta.unauthorized;
      const isInProd = process.env.ENV === "production" && !to.meta.prod;

      if (
        to.name && to.name !== "main" && !to.name.startsWith("profile") && isUnauthorized ||
        isInProd
      ) {
        return next({ name: "main" });
      }

      next();
    });

    Router.afterEach((to) => {
      if (typeof window.ym !== "undefined") {
        window.ym(84292183, "hit", to.fullPath);
      }

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "Pageview",
        url: to.fullPath
      });
    });
  }
  return Router;
});
