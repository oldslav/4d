import { route } from "quasar/wrappers";
import VueRouter from "vue-router";
import { Store } from "vuex";
import { IRootState } from "../store/types/root";
import routes from "./routes";

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

export default route<Store<IRootState>>(function ({ Vue }) {
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

  return Router;
});
