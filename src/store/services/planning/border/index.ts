import { ActionTree, GetterTree, Module, MutationTree } from "vuex";
import {
  SET_DATA,
  SET_EMPTY,
  UPDATE_PAGINATION,
  SET_REFERENCES, UPDATE_FILTERS, SET_DETAILS, SET_DETAILS_EMPTY
} from "src/store/constants/mutation-constants";
import { TRootState } from "src/store/types/root";
import {
  DELETE_DOCUMENT,
  DELETE_IMAGE,
  GET_DATA,
  GET_DETAILS,
  GET_REFERENCES,
  UPDATE_DETAILS, UPLOAD_IMAGE
} from "src/store/constants/action-constants";
import { IUserTicketsState } from "src/store/types/user/tickets";

const initialState = (): IUserTicketsState => {
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
    current: null
  };
};

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
    const { data } = await this.service.services.planning.getBorderData({
      ...state.filters,
      limit: state.pagination.limit,
      offset: state.pagination.offset - 1
    });

    commit(SET_DATA, data);
    commit(UPDATE_PAGINATION, { rowsNumber: data.count });
  },

  async [UPLOAD_IMAGE] (_, { id, payload }) {
    await this.service.services.planning.uploadBorderImage(id, payload);
  },

  async [DELETE_IMAGE] (_, id) {
    await this.service.services.planning.deleteBorderImage(id);
  },

  async [DELETE_DOCUMENT] (_, id) {
    await this.service.services.planning.deleteBorderDocument(id);
  },

  async [GET_DETAILS] ({ commit }, id) {
    const { data } = await this.service.services.planning.getBorderDetails(id);

    commit(SET_DETAILS, data);
  },

  async [UPDATE_DETAILS] (_, { id, payload }) {
    await this.service.services.planning.updateBorderDetails(id, payload);
  },

  async [GET_REFERENCES] ({ commit }) {
    const { data } = await this.service.services.planning.getBorderReferences();

    commit(SET_REFERENCES, data);
  }
};

const getters: GetterTree<IUserTicketsState, TRootState> = {
  types (state) {
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

const border: Module<IUserTicketsState, TRootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};

export default border;
