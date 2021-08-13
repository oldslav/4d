import { IServiceTreesState } from "src/store/types/trees";
import { ActionTree, Module, MutationTree } from "vuex";
import { SET_EMPTY, SET_TREES_STATS } from "src/store/constants/mutation-constants";
import { GET_TREES_STATS } from "src/store/constants/action-constants";
import { TRootState } from "src/store/types/root";

const initialState = (): IServiceTreesState => {
  return {
    treesStats: null
  };
};

const state = initialState;

const mutations: MutationTree<IServiceTreesState> = {
  [SET_EMPTY]: state => Object.assign(state, initialState()),
  [SET_TREES_STATS]: (state, payload) => state.treesStats = payload
};

const actions: ActionTree<IServiceTreesState, TRootState> = {
  async [GET_TREES_STATS] ({ commit }) {
    const { data } = await this.service.services.trees.getTreesStats();

    const treesStats = data.statsByPlant;

    commit(SET_TREES_STATS, treesStats);
  }
};

const trees: Module<IServiceTreesState, TRootState> = {
  namespaced: true,
  state,
  mutations,
  actions
};

export default trees;
