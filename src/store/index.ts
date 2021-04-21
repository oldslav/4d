import { store } from "quasar/wrappers";
import Vuex from "vuex";

import { IRootState } from "src/store/types/root";

import root from "./root";
import modules from "./modules";

export default store(function ({ Vue }) {
  Vue.use(Vuex);

  const Store = new Vuex.Store<IRootState>({
    ...root,
    modules,
    strict: !!process.env.DEBUGGING
  });

  return Store;
});
