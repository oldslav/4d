import { IServiceTreesState } from "src/store/types/trees";
import { ActionTree, Module, MutationTree } from "vuex";
import { SET_EMPTY, SET_TREES_STATS, SET_TREE } from "src/store/constants/mutation-constants";
import { GET_TREES_STATS, GET_TREE, UPDATE_TREE, ADD_TREE_FILES } from "src/store/constants/action-constants";
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
  [SET_TREES_STATS]: (state, payload) => state.treesStats = payload,
  [SET_TREE]: (state, payload) => state.selectedTree = payload
};

const actions: ActionTree<IServiceTreesState, TRootState> = {
  async [GET_TREES_STATS] ({ commit }) {
    const { data } = await this.service.services.trees.getTreesStats();

    const treesStats = data.statsByPlant;

    commit(SET_TREES_STATS, treesStats);
  },

  async [GET_TREE] ({ commit }, id) {
    const { data } = await this.service.services.trees.getTree(id);

    commit(SET_TREE, data);
  },

  async [UPDATE_TREE] ({ dispatch }, payload) {
    const { treeId, statusId, description, media } = payload;
    const { data: { id } } = await this.service.services.trees.updateTree(treeId, { statusId, description });
    if (media && media.length > 0) await dispatch(ADD_TREE_FILES, { id, media });
  },

  async [ADD_TREE_FILES] (_, { id, media }) {
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
