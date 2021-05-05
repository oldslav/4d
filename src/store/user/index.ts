import { ActionTree, Module, MutationTree } from "vuex";
import { IRootState } from "src/store/types/root";
import userTickets from "src/store/user/tickets";
import neighbors from "src/store/user/neighbors";
import documents from "src/store/user/documents";
import vehicles from "src/store/user/vehicles";
import { IUserState } from "src/store/types/user";
import { USER_LOGIN } from "src/store/constants/action-constants";
import { SET_EMPTY, SET_USER } from "src/store/constants/mutation-constants";
import AuthService from "src/api/auth";

const initialState = (): IUserState => {
  return {
    name: {
      first: null,
      last: null,
      patronymic: null,
      full: null
    },
    email: null,
    phones: null,
    telegram: null,
    uid: null,
    login: null,
    createdAt: null,
    updatedAt: null,
    access_token: null
  };
};

const state: () => IUserState = initialState;

const mutations: MutationTree<IUserState> = {
  [SET_USER]: (state, payload) => Object.assign(state, payload),
  [SET_EMPTY]: state => Object.assign(state, initialState())
};

const actions: ActionTree<IUserState, IRootState> = {
  async [USER_LOGIN] ({ commit }) {
    const payload = new FormData();
  
    payload.append("username", "user");
    payload.append("password", "user");
    payload.append("grant_type", "password");
    
    const { data } = await AuthService.login(payload);
    
    commit(SET_USER, data);
  }
};

const user: Module<IUserState, IRootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  modules: {
    userTickets,
    documents,
    vehicles,
    neighbors
  }
};

export default user;
