import { ActionTree, GetterTree, Module, MutationTree } from "vuex";
import { TRootState } from "src/store/types/root";
import { IUserTicketsState } from "src/store/types/user/tickets";
import buildings from "src/store/services/estate/buildings";
import commerce from "src/store/services/estate/commerce";

const initialState = (): IUserTicketsState => {
  return {
    filters: {
      query: null,
      categoryId: null
    },
    pagination: {
      limit: 10,
      offset: 1
    },
    data: null,
    references: null,
    current: null
  };
};

const state = initialState;

const mutations: MutationTree<IUserTicketsState> = {};

const actions: ActionTree<IUserTicketsState, TRootState> = {};

const getters: GetterTree<IUserTicketsState, TRootState> = {};

const estate: Module<IUserTicketsState, TRootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
  modules: {
    buildings,
    commerce
  }
};

export default estate;
