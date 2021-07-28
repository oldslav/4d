import { ActionTree, GetterTree, Module, MutationTree } from "vuex";
import { TRootState } from "src/store/types/root";
import { IUserTicketsState } from "src/store/types/user/tickets";
import { SET_USER_TICKETS, UPDATE_PAGINATION } from "src/store/constants/mutation-constants";
import {
  ADD_USER_TICKET_FILE_PARKING,
  CREATE_USER_TICKET_PARKING,
  DELETE_USER_TICKET_PARKING,
  GET_USER_TICKETS_PARKING,
  GET_EMPLOYEE_TICKETS_PARKING,
  REJECT_TICKET_PARKING,
  APPROVE_TICKET_PARKING,
  GET_USER_TICKET_PARKING_PAYMENT_LINK,
  ADD_PARKING_FILES,
  SEND_CONTRACT_INFO_PARKING
} from "src/store/constants/action-constants";

const state = (): IUserTicketsState => ({
  filters: null,
  pagination: {
    limit: 10,
    offset: 1,
    sort: null
  },
  data: null
});

const mutations: MutationTree<IUserTicketsState> = {
  [SET_USER_TICKETS] (state, payload) {
    state.data = payload;
  },
  [UPDATE_PAGINATION] (state, pagination) {
    state.pagination = { ...state.pagination, ...pagination };
  }
};

const actions: ActionTree<IUserTicketsState, TRootState> = {
  async [GET_USER_TICKETS_PARKING] ({ state, commit }) {
    const { filters, pagination: { limit, offset } } = state;

    const { data } = await this.service.user.tickets.getTicketsParking({
      filters,
      limit,
      offset: offset - 1
    });

    commit(SET_USER_TICKETS, data);
  },

  async [GET_EMPLOYEE_TICKETS_PARKING] ({ state, commit }) {
    const { filters, pagination: { limit, offset, sort } } = state;

    const f = Object.assign({}, filters, { statusId: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] });

    const { data } = await this.service.user.tickets.getEmployeeTicketsParking({
      filters: f,
      limit,
      offset: offset - 1,
      ...!!sort && { sort }
    });

    commit(SET_USER_TICKETS, data);
  },

  [REJECT_TICKET_PARKING] (_, { id, reason }) {
    return this.service.user.tickets.rejectTicketParking(id, reason);
  },

  [APPROVE_TICKET_PARKING] (_, { id }) {
    return this.service.user.tickets.approveTicketParking(id);
  },

  async [DELETE_USER_TICKET_PARKING] ({ dispatch }, payload) {
    await this.service.user.tickets.deleteTicketLiving(payload);

    dispatch(GET_USER_TICKETS_PARKING);
  },

  async [CREATE_USER_TICKET_PARKING] ({ dispatch }, payload) {
    const { documents, ...result } = payload;
    const { data: { id } } = await this.service.user.tickets.createTicketParking(result);
    await dispatch(ADD_PARKING_FILES, { id, documents });
    await this.service.user.tickets.requestApprovalParking(id);
  },

  async [SEND_CONTRACT_INFO_PARKING] ({ dispatch }, { id, payload }) {
    return this.service.user.tickets.sendContractInfoParking(id, payload)
      .then(() => dispatch(GET_EMPLOYEE_TICKETS_PARKING));
  },

  async [ADD_PARKING_FILES] ({ dispatch }, { id, documents }) {
    const files = await dispatch("bundleFiles", documents, { root: true });
    await Promise.all(files.map((f: any) => dispatch(ADD_USER_TICKET_FILE_PARKING, { id, payload: f })));
  },

  async [ADD_USER_TICKET_FILE_PARKING] (_, { id, payload }) {
    await this.service.user.tickets.addTicketsParkingFile(id, payload);
  },

  async [GET_USER_TICKET_PARKING_PAYMENT_LINK] (_, id) {
    const { data } = await this.service.user.tickets.getParkingPayments({ paid: false });

    const paymentId = data.find((i: any) => i.id === id).id;
    return this.service.user.bills.getPaymentLink(paymentId);
  }
};

const getters: GetterTree<IUserTicketsState, TRootState> = {
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

const parking: Module<IUserTicketsState, TRootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};

export default parking;
