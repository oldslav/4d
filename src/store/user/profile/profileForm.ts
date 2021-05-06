import { Module, MutationTree } from "vuex";
import { IRootState } from "src/store/types/root";
import { IProfileFormState } from "../../types/user/profile";
import { 
  SET_PROFILE_FORM_FIRSTNAME,
  SET_PROFILE_FORM_LASTNAME,
  SET_PROFILE_FORM_PATRONYMIC,
  SET_PROFILE_FORM_EMAIL,
  SET_PROFILE_FORM_PHONE,
  SET_PROFILE_FORM_TELEGRAM_ALIAS,
  SET_PROFILE_FORM_NEW_EMAIL
} from "src/store/constants/mutation-constants";

const state: IProfileFormState = {
  firstName: null,
  lastName: null,
  patronymic: null,
  email: null,
  phone: null,
  telegramAlias: null,
  newEmail: null
};

const mutations: MutationTree<IProfileFormState> = {
  [SET_PROFILE_FORM_FIRSTNAME] (state, payload) {
    state.firstName = payload;
  },

  [SET_PROFILE_FORM_LASTNAME] (state, payload) {
    state.lastName = payload;
  },
  
  [SET_PROFILE_FORM_PATRONYMIC] (state, payload) {
    state.patronymic = payload;
  },
  
  [SET_PROFILE_FORM_EMAIL] (state, payload) {
    state.email = payload;
  },
  
  [SET_PROFILE_FORM_PHONE] (state, payload) {
    state.phone = payload;
  },
  
  [SET_PROFILE_FORM_TELEGRAM_ALIAS] (state, payload) {
    state.telegramAlias = payload;
  },
  
  [SET_PROFILE_FORM_NEW_EMAIL] (state, payload) {
    state.newEmail = payload;
  }
};

const profileForm: Module<IProfileFormState, IRootState> = {
  namespaced: true,
  state,
  mutations
};

export default profileForm;
