import { ActionTree, GetterTree, Module, MutationTree } from "vuex";
import { TRootState } from "src/store/types/root";
import { IUserTicketsState } from "src/store/types/user/tickets";
import { SET_USER_TICKETS, SET_USER_TICKET, UPDATE_PAGINATION } from "src/store/constants/mutation-constants";
import {
  ADD_USER_TICKET_FILE_WAREHOUSE,
  ADD_WAREHOUSE_FILES,
  CREATE_USER_TICKET_WAREHOUSE,
  DELETE_USER_TICKET_WAREHOUSE,
  GET_USER_TICKETS_WAREHOUSE,
  GET_EMPLOYEE_TICKETS_WAREHOUSE,
  REJECT_TICKET_WAREHOUSE,
  APPROVE_TICKET_WAREHOUSE, SEND_CONTRACT_INFO_WAREHOUSE, GET_USER_TICKET, TERMINATE_TICKET
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
  async [CREATE_USER_TICKET_WAREHOUSE] ({ dispatch }, payload) {
    const { documents, ...result } = payload;
    const { data: { id } } = await this.service.user.tickets.createTicketWarehouse(result);
    await dispatch(ADD_WAREHOUSE_FILES, { id, documents });
    await this.service.user.tickets.requestApprovalWarehouse(id);
  },

  async [ADD_WAREHOUSE_FILES] ({ dispatch }, { id, documents }) {
    const files = await dispatch("bundleFiles", { files: documents, asNew: true }, { root: true });
    await Promise.all(files.map((f: any) => dispatch(ADD_USER_TICKET_FILE_WAREHOUSE, { id, file: f })));
  },

  [ADD_USER_TICKET_FILE_WAREHOUSE] (_, { id, file }) {
    return this.service.user.tickets.addTicketsWarehouseFile(id, file);
  },

  async [GET_USER_TICKETS_WAREHOUSE] ({ state, commit }) {
    const { filters, pagination: { limit, offset } } = state;

    const { data } = await this.service.user.tickets.getTicketsWarehouse({
      filters,
      limit,
      offset: offset - 1
    });

    commit(SET_USER_TICKETS, data);
  },

  async [GET_USER_TICKET] ({ commit, dispatch }, id) {
    const { data } = await this.service.user.tickets.getWarehouseTicketById(id);
    const { images, ...ticket } = data;
    const documents: any = {
      passport: []
    };
    const files = await dispatch("loadFiles", images, { root: true });
    Object.assign(documents, files);
    commit(SET_USER_TICKET, { ...ticket, documents });
  },

  async [GET_EMPLOYEE_TICKETS_WAREHOUSE] ({ state, commit }) {
    const { filters, pagination: { offset, limit, sort } } = state;

    const f = Object.assign({}, filters, { statusId: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14] });

    const { data } = await this.service.user.tickets.getEmployeeTicketsWarehouse({
      filters: f,
      limit,
      offset: offset - 1,
      ...!!sort && { sort }
    });

    commit(SET_USER_TICKETS, data);
  },

  async [REJECT_TICKET_WAREHOUSE] (_, { id, reason }) {
    await this.service.user.tickets.rejectTicketWarehouse(id, reason);
  },

  async [APPROVE_TICKET_WAREHOUSE] (_, { id }) {
    await this.service.user.tickets.approveTicketWarehouse(id);
  },

  async [DELETE_USER_TICKET_WAREHOUSE] ({ dispatch }, payload) {
    await this.service.user.tickets.deleteTicketWarehouse(payload);
    await dispatch(GET_USER_TICKETS_WAREHOUSE);
  },

  async [SEND_CONTRACT_INFO_WAREHOUSE] ({ dispatch }, { id, payload }) {
    await this.service.user.tickets.sendContractInfoWarehouse(id, payload);
    await dispatch(GET_EMPLOYEE_TICKETS_WAREHOUSE);
  },

  [TERMINATE_TICKET] (_, { ticketId, reason }) {
    return this.service.user.tickets.terminateWarehouseContract(ticketId, reason);
  }
};

const getters: GetterTree<IUserTicketsState, TRootState> = {
  getCurrentTicket: (state) => state.current,
  tableData (state) {
    return state.data;
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
const warehouse: Module<IUserTicketsState, TRootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};

export default warehouse;
