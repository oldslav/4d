import { ActionTree, GetterTree, Module, MutationTree } from "vuex";
import { TRootState } from "src/store/types/root";
import { IUserTicketsState } from "src/store/types/user/tickets";
import border from "src/store/services/planning/border";

const initialState = (): any => ({});

const state = initialState;

const mutations: MutationTree<IUserTicketsState> = {};

const actions: ActionTree<IUserTicketsState, TRootState> = {};

const getters: GetterTree<IUserTicketsState, TRootState> = {};

const planning: Module<IUserTicketsState, TRootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
  modules: {
    border
  }
};

export default planning;
