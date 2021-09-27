import { ActionTree, GetterTree, Module, MutationTree } from "vuex";
import {
  SET_APARTMENT_INFO,
  SET_DATA,
  SET_EMPTY,
  UPDATE_APARTMENTS_PAGINATION
} from "src/store/constants/mutation-constants";
import { TRootState } from "src/store/types/root";
import { GET_APARTMENT_INFO, GET_APARTMENTS } from "src/store/constants/action-constants";
import { IUserTicketsState } from "src/store/types/user/tickets";

const initialState = (): IUserTicketsState => {
  return {
    filters: null,
    pagination: {
      limit: 10,
      offset: 1
    },
    data: null,
    current: null
  };
};

const state = initialState;

const mutations: MutationTree<IUserTicketsState> = {
  [SET_EMPTY]: state => Object.assign(state, initialState()),
  [SET_DATA]: (state, payload) => state.data = payload,
  [UPDATE_APARTMENTS_PAGINATION] (state, pagination) {
    state.pagination = { ...state.pagination, ...pagination };
  },
  [SET_APARTMENT_INFO]: (state, payload) => state.current = payload
};

const actions: ActionTree<IUserTicketsState, TRootState> = {
  async [GET_APARTMENTS] ({ state, commit }, { requestId, buildingId }) {
    const { data } = await this.service.services.apartments.getApartments({
      requestId,
      buildingId,
      limit: state.pagination.limit,
      offset: state.pagination.offset - 1
    });

    commit(SET_DATA, data);
    commit(UPDATE_APARTMENTS_PAGINATION, { rowsNumber: data.count });
  },

  async [GET_APARTMENT_INFO] ({ commit }, id: number) {
    const { data } = await this.service.services.apartments.getApartmentDetails(id);
    commit(SET_APARTMENT_INFO, data);
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
  },

  getApartmentInfo: (state) => state.current
};

const apartments: Module<IUserTicketsState, TRootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};

export default apartments;
