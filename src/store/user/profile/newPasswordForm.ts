import { ActionTree, Module, MutationTree } from "vuex";
import { IRootState } from "src/store/types/root";
import { INewPasswordFormState } from "../../types/user/profile";
import { 
  SET_NEW_PASSWORD_FORM_OLD_PASSWORD,
  SET_NEW_PASSWORD_FORM_PASSWORD,
  SET_NEW_PASSWORD_FORM_CONFIRM_PASSWORD
} from "src/store/constants/mutation-constants";
import { CHANGE_USER_PROFILE_PASSWORD } from "src/store/constants/action-constants";
import { UserProfileService } from "src/api/user/profile";

const state: INewPasswordFormState = {
  oldPassword: null,
  password: null,
  confirmPassword: null
};

const mutations: MutationTree<INewPasswordFormState> = {
  [SET_NEW_PASSWORD_FORM_OLD_PASSWORD] (state, payload) {
    state.oldPassword = payload;
  },

  [SET_NEW_PASSWORD_FORM_PASSWORD] (state, payload) {
    state.password = payload;
  },
  
  [SET_NEW_PASSWORD_FORM_CONFIRM_PASSWORD] (state, payload) {
    state.confirmPassword = payload;
  }
};

const actions: ActionTree<INewPasswordFormState, IRootState> = {
  [CHANGE_USER_PROFILE_PASSWORD] ({ state }) {
    return UserProfileService.changePassword(state);
  }
};

const newPasswordForm: Module<INewPasswordFormState, IRootState> = {
  namespaced: true,
  state,
  mutations,
  actions
};

export default newPasswordForm;
