import { ActionTree, GetterTree, Module, MutationTree } from "vuex";
import { TRootState } from "src/store/types/root";
import {
  GET_DATA,
  UPLOAD_IMAGE,
  DELETE_IMAGE,
  DELETE_DOCUMENT,
  GET_DETAILS,
  UPDATE_DETAILS,
  GET_REFERENCES
} from "src/store/constants/action-constants";
import {
  SET_DATA,
  UPDATE_PAGINATION,
  SET_DETAILS,
  SET_REFERENCES,
  SET_EMPTY,
  SET_DETAILS_EMPTY, UPDATE_FILTERS
} from "src/store/constants/mutation-constants";
import { IUserTicketsState } from "src/store/types/user/tickets";

const initialState = (): IUserTicketsState => ({
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
  current: null
});

const state = initialState;

const mutations: MutationTree<IUserTicketsState> = {
  [SET_EMPTY]: state => Object.assign(state, initialState()),
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

const actions: ActionTree<IUserTicketsState, TRootState> = {
  async [GET_DATA] ({ state, commit }) {
    const { data } = await this.service.services.tourism.getData({
      ...state.filters,
      limit: state.pagination.limit,
      offset: state.pagination.offset - 1
    });

    commit(SET_DATA, data);
    commit(UPDATE_PAGINATION, { rowsNumber: data.count });
  },

  async [UPLOAD_IMAGE] (_, { id, payload }) {
    await this.service.services.tourism.uploadImage(id, payload);
  },

  async [DELETE_IMAGE] (_, id) {
    await this.service.services.tourism.deleteImage(id);
  },

  async [DELETE_DOCUMENT] (_, id) {
    await this.service.services.tourism.deleteDocument(id);
  },

  async [GET_DETAILS] ({ commit }, id) {
    const { data } = await this.service.services.tourism.getDetails(id);

    commit(SET_DETAILS, data);
  },

  async [UPDATE_DETAILS] (_, { id, payload }) {
    await this.service.services.tourism.updateDetails(id, payload);
  },

  async [GET_REFERENCES] ({ commit }) {
    const { data } = await this.service.services.tourism.getReferences();

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

const tourism: Module<IUserTicketsState, TRootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};

export default tourism;
