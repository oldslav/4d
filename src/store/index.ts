import { store } from "quasar/wrappers";
import Vuex from "vuex";

import { TRootState } from "src/store/types/root";

import root from "./root";
import modules from "./modules";
import wait from "src/store/plugins/wait";

export default store(function ({ Vue }) {
  Vue.use(Vuex);
  
  const Store = new Vuex.Store<TRootState>({
    ...root,
    modules,
    strict: !!process.env.DEBUGGING
  });
  
  Vue.use(wait, { store: Store });

  return Store;
});
