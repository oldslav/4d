import { ActionTree, GetterTree, Module, MutationTree } from "vuex";
import { TRootState } from "src/store/types/root";
import { IUserVerificationRequestState } from "src/store/types/user/tickets/verification-request";
import {
  APPROVE_VERIFICATION_REQUEST,
  FETCH_VERIFICATION_REQUESTS,
  FETCH_VERIFICATION_REQUESTS_REFERENCES,
  REJECT_VERIFICATION_REQUEST
} from "src/store/constants/action-constants";
import {
  SET_VERIFICATION_REQUESTS,
  SET_VERIFICATION_REQUESTS_REFERENCES,
  UPDATE_VERIFICATION_REQUESTS_PAGINATION
} from "src/store/constants/mutation-constants";

const state = (): IUserVerificationRequestState => ({
  references: {},
  pagination: { limit: 10, offset: 1 },
  data: null
});

const getters: GetterTree<IUserVerificationRequestState, TRootState> = {
  tableData (state) {
    const { data } = state;

    if (data) {
      return { items: data.items };
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

  getVerificationRequestsStatuses (state){
    return state.references.requestStatuses || [];
  }
};

const mutations: MutationTree<IUserVerificationRequestState> = {
  [SET_VERIFICATION_REQUESTS] (state, payload) {
    state.data = payload;
  },

  [SET_VERIFICATION_REQUESTS_REFERENCES] (state, references) {
    state.references = references;
  },

  [UPDATE_VERIFICATION_REQUESTS_PAGINATION] (state, pagination) {
    if (pagination) {
      const page = pagination.page || 1;
      const rowsPerPage = pagination.rowsPerPage || 10;
      state.pagination = { limit: rowsPerPage, offset: page };
    }
  }
};

const actions: ActionTree<IUserVerificationRequestState, TRootState> = {
  async [FETCH_VERIFICATION_REQUESTS_REFERENCES] ({ commit }) {
    const { data } = await this.service.user.verificationRequests.getVerificationRequestsReferences();

    commit(SET_VERIFICATION_REQUESTS_REFERENCES, data);
  },

  async [FETCH_VERIFICATION_REQUESTS] ({ commit, state }, { query, pagination } = {}) {
    commit(UPDATE_VERIFICATION_REQUESTS_PAGINATION, pagination);

    const params = {
      limit: state.pagination.limit,
      offset: state.pagination.offset - 1,
      ...query || {}
    };

    const { data } = await this.service.user.verificationRequests.findAll(params);

    commit(SET_VERIFICATION_REQUESTS, data);
  },

  async [REJECT_VERIFICATION_REQUEST] (ctx, { id, reason }) {
    const { data } = await this.service.user.verificationRequests.rejectRequest(id, reason);

    return data;
  },

  async [APPROVE_VERIFICATION_REQUEST] (ctx, { id, text }) {
    const { data } = await this.service.user.verificationRequests.approveRequest(id, text);

    return data;
  }
};

const verificationRequest: Module<IUserVerificationRequestState, TRootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};

export default verificationRequest;
