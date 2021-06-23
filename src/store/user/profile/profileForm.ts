import { ActionTree, Module, MutationTree } from "vuex";
import { TRootState } from "src/store/types/root";
import { IProfileFormState } from "../../types/user/profile";
import { 
  SET_PROFILE_FORM_FIRSTNAME,
  SET_PROFILE_FORM_LASTNAME,
  SET_PROFILE_FORM_PATRONYMIC,
  SET_PROFILE_FORM_NO_PATRONYMIC,
  SET_PROFILE_FORM_EMAIL,
  SET_PROFILE_FORM_PHONE,
  SET_PROFILE_FORM_TELEGRAM_ALIAS,
  SET_PROFILE_FORM_AVATAR_URL,
  SET_PROFILE_FORM_NEW_EMAIL
} from "src/store/constants/mutation-constants";
import {
  UPDATE_USER_PROFILE,
  GET_USER_PROFILE_DEFAULT,
  UPDATE_USER_PROFILE_AVATAR,
  CHANGE_USER_PROFILE_EMAIL
} from "src/store/constants/action-constants";
import { UserProfileService } from "src/api/user/profile";

const state: IProfileFormState = {
  name: {
    first: null,
    full: null,
    last: null,
    patronymic: null,
    noPatronymic: null
  },
  contacts: {
    email: null,
    phone: null,
    telegramAlias: null
  },
  avatarUrl: null,
  avatarFile: null,
  newEmail: null
};

const mutations: MutationTree<IProfileFormState> = {
  [SET_PROFILE_FORM_FIRSTNAME] (state, payload) {
    state.name.first = payload;
  },

  [SET_PROFILE_FORM_LASTNAME] (state, payload) {
    state.name.last = payload;
  },
  
  [SET_PROFILE_FORM_PATRONYMIC] (state, payload) {
    state.name.patronymic = payload;
  },
  
  [SET_PROFILE_FORM_NO_PATRONYMIC] (state, payload) {
    state.name.noPatronymic = payload;
  },
  
  [SET_PROFILE_FORM_EMAIL] (state, payload) {
    state.contacts.email = payload;
  },
  
  [SET_PROFILE_FORM_PHONE] (state, payload) {
    state.contacts.phone = payload;
  },
  
  [SET_PROFILE_FORM_TELEGRAM_ALIAS] (state, payload) {
    state.contacts.telegramAlias = payload;
  },

  [SET_PROFILE_FORM_AVATAR_URL] (state, payload) {
    state.avatarUrl = payload;
  },
  
  [SET_PROFILE_FORM_NEW_EMAIL] (state, payload) {
    state.newEmail = payload;
  }
};

const actions: ActionTree<IProfileFormState, TRootState> = {

  [GET_USER_PROFILE_DEFAULT] ({ commit, rootGetters }) {
    const { name, contacts, avatar } = rootGetters["getAccount"];
    commit(SET_PROFILE_FORM_FIRSTNAME, name.first);
    commit(SET_PROFILE_FORM_LASTNAME, name.last);
    commit(SET_PROFILE_FORM_PATRONYMIC, name.patronymic);
    commit(SET_PROFILE_FORM_NO_PATRONYMIC, name.noPatronymic);
    commit(SET_PROFILE_FORM_EMAIL, contacts.email);
    commit(SET_PROFILE_FORM_PHONE, contacts.phone);
    commit(SET_PROFILE_FORM_TELEGRAM_ALIAS, contacts.telegramAlias);
    commit(SET_PROFILE_FORM_AVATAR_URL, avatar);
  },

  [UPDATE_USER_PROFILE] ({ state }) {
    const payload = {
      name: state.name,
      contacts: state.contacts
    };
    return UserProfileService.updateProfile(payload);
  },

  [UPDATE_USER_PROFILE_AVATAR] ({}, avatarFile) {
    return UserProfileService.updateAvatar(avatarFile);
  },
  
  [CHANGE_USER_PROFILE_EMAIL] ({ state }) {
    return UserProfileService.changeEmail(state.newEmail);
  }
};

const profileForm: Module<IProfileFormState, TRootState> = {
  namespaced: true,
  state,
  mutations,
  actions
};

export default profileForm;
