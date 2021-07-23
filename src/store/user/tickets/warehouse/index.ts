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
  APPROVE_TICKET_WAREHOUSE, SEND_CONTRACT_INFO_WAREHOUSE, GET_USER_TICKET
} from "src/store/constants/action-constants";

const state = (): IUserTicketsState => ({
  filters: null,
  pagination: {
    limit: 10,
    offset: 1
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
    const files = await dispatch("bundleFiles", documents, { root: true });
    await Promise.all(files.map((f: any) => dispatch(ADD_USER_TICKET_FILE_WAREHOUSE, { id, file: f })));
  },

  [ADD_USER_TICKET_FILE_WAREHOUSE] (_, { id, file }) {
    return this.service.user.tickets.addTicketsWarehouseFile(id, file);
  },

  async [GET_USER_TICKETS_WAREHOUSE] ({ state, commit }) {
    const { filters, pagination } = state;

    const { data } = await this.service.user.tickets.getTicketsWarehouse({
      filters,
      ...pagination,
      offset: pagination.offset - 1
    });

    commit(SET_USER_TICKETS, data);
  },

  async [GET_USER_TICKET] ({ commit }, id) {
    const { data } = await this.service.user.tickets.getWarehouseTicketById(id);
    const { images, ...ticket } = data;
    const documents: any = {
      passport: []
    };
    await Promise.all(images.map(async (doc: any) => {
      const { imagePath, docType, fileName } = doc;
      const { data } = await this.service.common.getFile(imagePath);
      const file = new File([data], fileName, { type: data.type });
      documents[docType.name].push(file);
    }));
    commit(SET_USER_TICKET, { ...ticket, documents });
  },

  async [GET_EMPLOYEE_TICKETS_WAREHOUSE] ({ state, commit }) {
    const { filters, pagination: { offset, limit } } = state;

    const f = Object.assign({}, filters, { statusId: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] });

    const { data } = await this.service.user.tickets.getEmployeeTicketsWarehouse({
      filters: f,
      limit,
      offset: offset - 1
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
