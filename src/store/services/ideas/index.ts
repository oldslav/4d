import { ActionTree, GetterTree, Module, MutationTree } from "vuex";
import {
  SET_DATA,
  SET_EMPTY,
  UPDATE_PAGINATION
} from "src/store/constants/mutation-constants";
import { TRootState } from "src/store/types/root";
import { IUserTicketsState } from "src/store/types/user/tickets";
import { CREATE_IDEA } from "src/store/constants/action-constants";

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
  [UPDATE_PAGINATION] (state, pagination) {
    state.pagination = { ...state.pagination, ...pagination };
  }
};

const actions: ActionTree<IUserTicketsState, TRootState> = {
  async [CREATE_IDEA] (_, payload) {
    await this.service.services.ideas.createIdea(payload);
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

const ideas: Module<IUserTicketsState, TRootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};

export default ideas;
