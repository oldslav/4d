import { ActionTree, Module } from "vuex";
import { TRootState } from "src/store/types/root";
import { CONFIRM_RESET_PASSWORD, RESET_PASSWORD } from "src/store/constants/action-constants";

const actions: ActionTree<any, TRootState> = {
  [RESET_PASSWORD] (_, email) {
    return this.service.user.profile.resetPassword(email);
  },

  [CONFIRM_RESET_PASSWORD] (_, payload) {
    return this.service.user.profile.confirmResetPassword(payload);
  }
};

const resetPassword: Module<any, TRootState> = {
  namespaced: true,
  actions
};

export default resetPassword;
