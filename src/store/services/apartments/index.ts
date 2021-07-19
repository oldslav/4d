import { ActionTree, GetterTree, Module, MutationTree } from "vuex";
import {
  SET_DATA,
  SET_EMPTY,
  UPDATE_APARTMENTS_PAGINATION
} from "src/store/constants/mutation-constants";
import { TRootState } from "src/store/types/root";
import { GET_APARTMENTS } from "src/store/constants/action-constants";
import { IUserTicketsState } from "src/store/types/user/tickets";
import { ApartmentsService } from "src/api/services/apartments";

const initialState = (): IUserTicketsState => {
  return {
    filters: null,
    pagination: {
      limit: 10,
      offset: 1
    },
    data: null
  };
};

const state = initialState;

const mutations: MutationTree<IUserTicketsState> = {
  [SET_EMPTY]: state => Object.assign(state, initialState()),
  [SET_DATA]: (state, payload) => state.data = payload,
  [UPDATE_APARTMENTS_PAGINATION] (state, pagination) {
    state.pagination = { ...state.pagination, ...pagination };
  }
};

const actions: ActionTree<IUserTicketsState, TRootState> = {
  async [GET_APARTMENTS] ({ state, commit }, requestId) {
    const { data } = await ApartmentsService.getApartmentsGeo({
      requestId,
      ...state.pagination,
      offset: state.pagination.offset - 1
    });

    commit(SET_DATA, data);
    commit(UPDATE_APARTMENTS_PAGINATION, { rowsNumber: data.count });
  }
};

const getters: GetterTree<IUserTicketsState, TRootState> = {
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

const apartments: Module<IUserTicketsState, TRootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};

export default apartments;
