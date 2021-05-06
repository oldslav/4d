import { Module, MutationTree } from "vuex";
import { IRootState } from "src/store/types/root";
import { INewPasswordFormState } from "../../types/user/profile";
import { 
  SET_NEW_PASSWORD_FORM_PASSWORD,
  SET_NEW_PASSWORD_FORM_NEW_PASSWORD,
  SET_NEW_PASSWORD_FORM_CONFIRM_PASSWORD
} from "src/store/constants/mutation-constants";

const state: INewPasswordFormState = {
  password: null,
  newPassword: null,
  confirmPassword: null  
};

const mutations: MutationTree<INewPasswordFormState> = {
  [SET_NEW_PASSWORD_FORM_PASSWORD] (state, payload) {
    state.password = payload;
  },

  [SET_NEW_PASSWORD_FORM_NEW_PASSWORD] (state, payload) {
    state.newPassword = payload;
  },
  
  [SET_NEW_PASSWORD_FORM_CONFIRM_PASSWORD] (state, payload) {
    state.confirmPassword = payload;
  }
};

const newPasswordForm: Module<INewPasswordFormState, IRootState> = {
  namespaced: true,
  state,
  mutations
};

export default newPasswordForm;
