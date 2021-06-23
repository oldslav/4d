import { TRootState } from "src/store/types/root";
import { ActionContext, ActionTree, MutationTree } from "vuex";

const state: TRootState = {

};

const mutations: MutationTree<TRootState> = {

};

const actions: ActionTree<TRootState, TRootState> = {
  serverInit ({ dispatch }: ActionContext<TRootState, TRootState>) {
    return dispatch("account/fetchAccount");
  },

  browserInit (/* context */) {
    // console.log('browserInit')
    // your code
  }
};

export default { state, actions, mutations };
