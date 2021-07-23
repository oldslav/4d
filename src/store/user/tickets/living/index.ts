import { ActionTree, GetterTree, Module, MutationTree } from "vuex";
import { TRootState } from "src/store/types/root";
import { IUserTicketsState } from "src/store/types/user/tickets";
import { SET_USER_TICKET, SET_USER_TICKETS, UPDATE_PAGINATION } from "src/store/constants/mutation-constants";
import {
  REQUEST_APPROVAL_LIVING,
  ADD_USER_TICKET_FILE_LIVING,
  CREATE_USER_TICKET_LIVING,
  DELETE_USER_TICKET_LIVING,
  GET_USER_TICKETS_LIVING,
  GET_EMPLOYEE_TICKETS_LIVING,
  REJECT_TICKET_LIVING,
  ADD_USER_TICKET_NEIGHBOR,
  APPROVE_TICKET_LIVING,
  UPDATE_TICKET_APARTMENT,
  UPDATE_TICKET_APARTMENT_VIEWED,
  GET_USER_TICKET, CREATE_LEGAL_TICKET_LIVING, SEND_CONTRACT_INFO_LIVING
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
  async [GET_USER_TICKETS_LIVING] ({ state, commit }) {
    const { filters, pagination: { limit, offset } } = state;

    const { data } = await this.service.user.tickets.getTicketsLiving({
      filters,
      limit,
      offset: offset - 1
    });

    commit(SET_USER_TICKETS, data);
  },

  async [GET_USER_TICKET] ({ commit }, ticketId) {
    const { data } = await this.service.user.tickets.getTicketLiving(ticketId);

    data.documents = {
      passport: [],
      snils: [],
      inn: [],
      job: [],
      job_petition: []
    };

    await Promise.all(data.images.map(async (doc: any) => {
      const { imagePath, docType, fileName } = doc;
      const { data: fileData } = await this.service.common.getFile(imagePath);
      const file = new File([fileData], fileName, {
        type: fileData.type
      });

      data.documents[docType.name].push(file);
    }));

    commit(SET_USER_TICKET, data);
  },

  async [GET_EMPLOYEE_TICKETS_LIVING] ({ state, commit }) {
    const { filters, pagination: { sort, offset, limit } } = state;

    const f = Object.assign({}, filters, { statusId: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] }); // no draft

    const { data } = await this.service.user.tickets.getEmployeeTicketsLiving({
      filters: f,
      limit,
      offset: offset - 1,
      ...!!sort && { sort }
    });

    commit(SET_USER_TICKETS, data);
  },

  [REJECT_TICKET_LIVING] (_, { id, reason }) {
    return this.service.user.tickets.rejectTicketLiving(id, reason);
  },

  [APPROVE_TICKET_LIVING] (_, { id, payload }) {
    return this.service.user.tickets.approveTicketLiving(id, payload);
  },

  async [UPDATE_TICKET_APARTMENT] (_, { requestId, apartmentId }) {
    await this.service.user.tickets.choiceApartment(requestId, apartmentId);
  },

  async [UPDATE_TICKET_APARTMENT_VIEWED] (_, { requestId, apartmentViewed }) {
    await this.service.user.tickets.viewedApartment(requestId, apartmentViewed);
  },

  async [DELETE_USER_TICKET_LIVING] ({ dispatch }, payload) {
    await this.service.user.tickets.deleteTicketLiving(payload);

    dispatch(GET_USER_TICKETS_LIVING);
  },

  async [CREATE_USER_TICKET_LIVING] (_, payload) {
    const { data } = await this.service.user.tickets.createTicketLiving(payload);

    return data;
  },

  async [CREATE_LEGAL_TICKET_LIVING] ({ dispatch }, payload) {
    const { documents, ...rest } = payload;
    const { data: { id } } = await this.service.user.tickets.createLegalTicketLiving(rest);
    const files = await dispatch("bundleFiles", documents, { root: true });

    await Promise.all(files.map((f: any) => dispatch(ADD_USER_TICKET_FILE_LIVING, { id, payload: f })));
  },

  async [ADD_USER_TICKET_FILE_LIVING] (_, { id, payload }) {
    await this.service.user.tickets.addTicketLivingFile(id, payload);
  },

  async [ADD_USER_TICKET_NEIGHBOR] ({ dispatch }, { ticketId, payload }) {
    const { documents, ...neighbor } = payload;
    const { data: { id } } = await this.service.user.tickets.addTicketLivingNeighbor(ticketId, neighbor);
    const files = await dispatch("bundleFiles", documents, { root: true });
    await Promise.all(files.map((f: any) => this.service.user.tickets.addTicketLivingNeighborFile(id, ticketId, f)));
  },

  [REQUEST_APPROVAL_LIVING] ({ dispatch }, id) {
    return this.service.user.tickets.requestApprovalLiving(id)
      .then(() => dispatch(GET_USER_TICKETS_LIVING));
  },

  [SEND_CONTRACT_INFO_LIVING] ({ dispatch }, { id, payload }) {
    return this.service.user.tickets.sendContractInfoLiving(id, payload)
      .then(() => dispatch(GET_EMPLOYEE_TICKETS_LIVING));
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

const living: Module<IUserTicketsState, TRootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};

export default living;
