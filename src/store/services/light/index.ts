import { IServiceTreesState } from "src/store/types/trees";
import { ActionTree, Module, MutationTree } from "vuex";
import { SET_EMPTY, SET_LIGHT_STATS, SET_LIGHT } from "src/store/constants/mutation-constants";
import { GET_LIGHT_STATS, GET_LIGHT, UPDATE_LIGHT, ADD_LIGHT_FILES } from "src/store/constants/action-constants";
import { TRootState } from "src/store/types/root";

const initialState = (): IServiceTreesState => {
  return {
    treesStats: [],
    selectedTree: {
      request: {
        author: {
          name: {}
        }
      },
      status: {},
      plant: {}
    }
  };
};

const state = initialState;

const mutations: MutationTree<IServiceTreesState> = {
  [SET_EMPTY]: state => Object.assign(state, initialState()),
  [SET_LIGHT_STATS]: (state, payload) => state.treesStats = payload,
  [SET_LIGHT]: (state, payload) => state.selectedTree = payload
};

const actions: ActionTree<IServiceTreesState, TRootState> = {
  async [GET_LIGHT_STATS] ({ commit }) {
    const { data } = await this.service.services.trees.getTreesStats();

    const treesStats = data.statsByPlant;

    commit(SET_LIGHT_STATS, treesStats);
  },

  async [GET_LIGHT] ({ commit }, id) {
    const { data } = await this.service.services.trees.getTree(id);

    commit(SET_LIGHT, data);
  },

  async [UPDATE_LIGHT] ({ dispatch }, payload) {
    const { treeId, statusId, description, media } = payload;
    const { data: { id } } = await this.service.services.trees.updateTree(treeId, { statusId, description });
    if (media && media.length > 0) await dispatch(ADD_LIGHT_FILES, { id, media });
  },

  async [ADD_LIGHT_FILES] (_, { id, media }) {
    await Promise.all(
      media.map(async (file: any) => {
        const payload = new FormData();
        payload.append("file", file);
        await this.service.services.trees.addTreeFile(id, payload);
      })
    );
  }
};

const trees: Module<IServiceTreesState, TRootState> = {
  namespaced: true,
  state,
  mutations,
  actions
};

export default trees;
