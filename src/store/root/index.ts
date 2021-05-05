import { IRootState } from "src/store/types/root";
import { ActionContext, ActionTree, MutationTree } from "vuex";

const state: IRootState = {

};

const mutations: MutationTree<IRootState> = {

};

const actions: ActionTree<IRootState, IRootState> = {
  serverInit ({ dispatch }: ActionContext<IRootState, IRootState>) {
    return dispatch("account/fetchAccount");
  },

  browserInit (/* context */) {
    // console.log('browserInit')
    // your code
  }
};

export default { state, actions, mutations };
