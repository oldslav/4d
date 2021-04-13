import { ActionTree, ActionContext } from "vuex";
import { IRootState } from "./state";

const actions: ActionTree<IRootState, IRootState> = {
  serverInit ({ dispatch }: ActionContext<IRootState, IRootState>) {
    return dispatch("account/fetchAccount");
  },

  browserInit (/* context */) {
    // console.log('browserInit')
    // your code
  }
};

export default actions;
