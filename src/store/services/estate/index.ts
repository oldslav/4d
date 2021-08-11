import { ActionTree, GetterTree, Module, MutationTree } from "vuex";
import {
  SET_DATA,
  SET_EMPTY,
  UPDATE_PAGINATION,
  SET_REFERENCES, UPDATE_FILTERS
} from "src/store/constants/mutation-constants";
import { TRootState } from "src/store/types/root";
import { GET_DATA, GET_REFERENCES } from "src/store/constants/action-constants";
import { IUserTicketsState } from "src/store/types/user/tickets";

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
    references: null
  };
};

const state = initialState;

const mutations: MutationTree<IUserTicketsState> = {
  [SET_EMPTY]: state => Object.assign(state, initialState()),
  [SET_DATA]: (state, payload) => state.data = payload,
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
    const { data } = await this.service.services.estate.getEstate({
      ...state.filters,
      limit: state.pagination.limit,
      offset: state.pagination.offset - 1
    });

    commit(SET_DATA, data);
    commit(UPDATE_PAGINATION, { rowsNumber: data.count });
  },

  async [GET_REFERENCES] ({ commit }) {
    const { data } = await this.service.services.estate.getEstateReferences();

    commit(SET_REFERENCES, data);
  }
};

const getters: GetterTree<IUserTicketsState, TRootState> = {
  infrastructureTypes (state) {
    return state.references.category.map((item: any) => ({
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

const estate: Module<IUserTicketsState, TRootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};

export default estate;
