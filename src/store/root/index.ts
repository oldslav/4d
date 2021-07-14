import { TRootState } from "src/store/types/root";
import { ActionContext, ActionTree, MutationTree } from "vuex";
import { GET_ACCOUNT, GET_REFERENCES, SERVER_INIT } from "src/store/constants/action-constants";

const state = (): TRootState => ({
  wait: process.env.SERVER ? {} : undefined
});

const mutations: MutationTree<TRootState> = {};

const actions: ActionTree<TRootState, TRootState> = {
  async [SERVER_INIT] ({ dispatch, rootGetters }: ActionContext<TRootState, TRootState>) {
    try {
      await dispatch(GET_ACCOUNT, null, { root: true });
    } catch (e) {
      // do nothing
    }

    if (rootGetters.isAuthenticated) {
      await dispatch(`references/${ GET_REFERENCES }`, null, { root: true });
    }
  },

  browserInit (/* context */) {
    // console.log('browserInit')
    // your code
  }
};

export default { state, actions, mutations };
