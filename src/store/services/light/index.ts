import { IServiceTreesState } from "src/store/types/trees";
import { ActionTree, GetterTree, Module, MutationTree } from "vuex";
import {
  SET_EMPTY,
  SET_LIGHT_STATS,
  SET_LIGHT,
  SET_DATA,
  SET_DETAILS,
  SET_DETAILS_EMPTY, SET_REFERENCES, UPDATE_PAGINATION, UPDATE_FILTERS
} from "src/store/constants/mutation-constants";
import {
  GET_LIGHT_STATS,
  GET_LIGHT,
  UPDATE_LIGHT,
  ADD_LIGHT_FILES,
  GET_DATA, UPLOAD_IMAGE, DELETE_IMAGE, DELETE_DOCUMENT, GET_DETAILS, UPDATE_DETAILS, GET_REFERENCES
} from "src/store/constants/action-constants";
import { TRootState } from "src/store/types/root";
import { IUserTicketsState } from "src/store/types/user/tickets";

const initialState = (): IServiceTreesState => {
  return {
    filters: {
      query: null,
      typeId: null
    },
    pagination: {
      limit: 10,
      offset: 1
    },
    data: null,
    references: null,
    current: null,
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
  [SET_LIGHT]: (state, payload) => state.selectedTree = payload,
  [SET_DATA]: (state, payload) => state.data = payload,
  [SET_DETAILS]: (state, payload) => state.current = payload,
  [SET_DETAILS_EMPTY]: (state) => state.current = null,
  [SET_REFERENCES]: (state, payload) => state.references = payload,
  [UPDATE_PAGINATION] (state, pagination) {
    state.pagination = { ...state.pagination, ...pagination };
  },
  [UPDATE_FILTERS] (state, filters) {
    state.filters = { ...state.filters, ...filters };
  }
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
  },

  async [GET_DATA] ({ state, commit }) {
    const { data } = await this.service.services.light.getData({
      ...state.filters,
      limit: state.pagination.limit,
      offset: state.pagination.offset - 1
    });

    commit(SET_DATA, data);
    commit(UPDATE_PAGINATION, { rowsNumber: data.count });
  },

  async [UPLOAD_IMAGE] (_, { id, payload }) {
    await this.service.services.light.uploadImage(id, payload);
  },

  async [DELETE_IMAGE] (_, id) {
    await this.service.services.light.deleteImage(id);
  },

  async [DELETE_DOCUMENT] (_, id) {
    await this.service.services.light.deleteDocument(id);
  },

  async [GET_DETAILS] ({ commit }, id) {
    const { data } = await this.service.services.light.getDetails(id);

    commit(SET_DETAILS, data);
  },

  async [UPDATE_DETAILS] (_, { id, payload }) {
    await this.service.services.light.updateDetails(id, payload);
  },

  async [GET_REFERENCES] ({ commit }) {
    const { data } = await this.service.services.light.getReferences();

    commit(SET_REFERENCES, data);
  }
};

const getters: GetterTree<IUserTicketsState, TRootState> = {
  infrastructureTypes (state) {
    return state.references.type.map((item: any) => ({
      value: item.id,
      label: item.name
    }));
  },

  tableData (state) {
    const { data } = state;

    if (data) {
      return {
        items: data.items
      };
    }
  },

  tablePagination (state) {
    const { pagination, data } = state;

    if (data) {
      return {
        rowsPerPage: pagination.limit,
        page: pagination.offset,
        rowsNumber: data.count
      };
    }
  }
};

const light: Module<IServiceTreesState, TRootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};

export default light;
