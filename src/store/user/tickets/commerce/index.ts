import { IUserTicketsState } from "src/store/types/user/tickets";
import { ActionTree, GetterTree, Module, MutationTree } from "vuex";
import { TRootState } from "src/store/types/root";
import { SET_USER_TICKET, SET_USER_TICKETS, UPDATE_PAGINATION } from "src/store/constants/mutation-constants";
import {
  APPROVE_TICKET_COMMERCE,
  CANCEL_TICKET_COMMERCE,
  CREATE_COMMERCE_TICKET,
  DELETE_TICKET_COMMERCE,
  GET_COMPANY_COMMERCE_TICKET,
  GET_COMPANY_COMMERCE_TICKETS, GET_EMPLOYEE_COMMERCE_TICKET,
  GET_EMPLOYEE_COMMERCE_TICKETS, REJECT_TICKET_COMMERCE,
  REQUEST_APPROVAL_COMMERCE, SIGN_CONTRACT_COMMERCE
} from "src/store/constants/action-constants";

const state = (): IUserTicketsState => ({
  filters: null,
  pagination: {
    limit: 10,
    offset: 1,
    sort: null
  },
  data: null,
  current: null
});

const mutations: MutationTree<IUserTicketsState> = {
  [SET_USER_TICKETS] (state, payload) {
    state.data = payload;
  },
  [SET_USER_TICKET] (state, payload) {
    state.current = payload;
  },
  [UPDATE_PAGINATION] (state, pagination) {
    state.pagination = { ...state.pagination, ...pagination };
  }
};

const actions: ActionTree<IUserTicketsState, TRootState> = {
  async [GET_COMPANY_COMMERCE_TICKETS] ({ commit, state }) {
    const { filters, pagination: { limit, offset } } = state;
    const { data } = await this.service.user.tickets.getCompanyTicketsCommerce({
      filters,
      limit,
      offset: offset - 1
    });
    commit(SET_USER_TICKETS, data);
  },

  async [GET_EMPLOYEE_COMMERCE_TICKETS] ({ commit, state }) {
    const { filters, pagination: { limit, offset } } = state;

    const f = Object.assign({}, filters, { statusId: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13] }); // no draft
    const { data } = await this.service.user.tickets.getEmployeeTicketsCommerce({
      filters: f,
      limit,
      offset: offset - 1
    });
    commit(SET_USER_TICKETS, data);
  },

  async [GET_COMPANY_COMMERCE_TICKET] ({ commit, dispatch }, ticketId) {
    const { data } = await this.service.user.tickets.getCompanyCommerceTicketById(ticketId);
    const { images, ...ticket } = data;
    const documents = await dispatch("loadFiles", images, { root: true });
    commit(SET_USER_TICKET, { ...ticket, documents });
  },

  async [GET_EMPLOYEE_COMMERCE_TICKET] ({ commit, dispatch }, id) {
    const { data } = await this.service.user.tickets.getEmployeeCommerceTicketById(id);
    const { images, ...ticket } = data;
    const documents = await dispatch("loadFiles", images, { root: true });
    commit(SET_USER_TICKET, { ...ticket, documents });
  },

  async [CREATE_COMMERCE_TICKET] ({ dispatch }, { placeId, payload }) {
    const { documents, ...rest } = payload;
    const { data: { id } } = await this.service.user.tickets.createCommerceTicket(placeId, rest);
    const files = await dispatch("bundleFiles", { files: documents, asNew: true }, { root: true });
    await Promise.all(files.map((f: any) => this.service.user.tickets.uploadCommerceTicketFile(id, f)));
    await dispatch(REQUEST_APPROVAL_COMMERCE, id);
  },

  [REQUEST_APPROVAL_COMMERCE] (_, id) {
    return this.service.user.tickets.requestCommerceTicketApproval(id);
  },

  [CANCEL_TICKET_COMMERCE] (_, id) {
    return this.service.user.tickets.cancelCommerceTicket(id);
  },

  [DELETE_TICKET_COMMERCE] (_, id) {
    return this.service.user.tickets.deleteCommerceTicket(id);
  },

  [APPROVE_TICKET_COMMERCE] (_, id) {
    return this.service.user.tickets.approveCommerceTicket(id);
  },

  [REJECT_TICKET_COMMERCE] (_, { id, reason }) {
    return this.service.user.tickets.rejectCommerceTicket(id, reason);
  },

  [SIGN_CONTRACT_COMMERCE] (_, id) {
    return this.service.user.tickets.sendContractInfoCommerce(id);
  }
};

const getters: GetterTree<IUserTicketsState, TRootState> = {
  tableData: (state) => state.data,
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
  getCurrentTicket: (state) => state.current
};

const commerce: Module<IUserTicketsState, TRootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};

export default commerce;
