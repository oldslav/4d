import { ActionTree, GetterTree, Module, MutationTree } from "vuex";
import { TRootState } from "src/store/types/root";
import { IUserTicketsState } from "src/store/types/user/tickets";
import { SET_USER_TICKET, SET_USER_TICKETS, UPDATE_PAGINATION } from "src/store/constants/mutation-constants";
import {
  REQUEST_APPROVAL_LIVING,
  ADD_USER_TICKET_FILE_LIVING,
  CREATE_USER_TICKET_LIVING,
  CANCEL_USER_TICKET_LIVING,
  GET_USER_TICKETS_LIVING,
  GET_EMPLOYEE_TICKETS_LIVING,
  REJECT_TICKET_LIVING,
  ADD_USER_TICKET_NEIGHBOR,
  APPROVE_TICKET_LIVING,
  UPDATE_TICKET_APARTMENT,
  UPDATE_TICKET_APARTMENT_VIEWED,
  GET_USER_TICKET,
  CREATE_LEGAL_TICKET_LIVING,
  SEND_CONTRACT_INFO_LIVING,
  UPDATE_TICKET,
  DELETE_USER_TICKET_LIVING,
  GET_LEGAL_TICKET, UPDATE_LEGAL_TICKET, SEND_COMPANY_PAYMENT, TERMINATE_TICKET
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

  async [GET_LEGAL_TICKET] ({ commit, dispatch }, ticketId) {
    const { data } = await this.service.user.tickets.getTicketLiving(ticketId);
    const { images, ...ticket } = data;
    const documents = {
      passport: [],
      inn: [],
      job_petition: [],
      consent_processing_personal_data: [],
      inn_jur: [],
      ogrn: [],
      egrjul: [],
      partner_card: []
    };
    const files = await dispatch("loadFiles", images, { root: true });
    Object.assign(documents, files);
    commit(SET_USER_TICKET, { documents, ...ticket });
  },

  async [GET_USER_TICKET] ({ commit, dispatch }, ticketId) {
    const { data } = await this.service.user.tickets.getTicketLiving(ticketId);
    const { images, neighbors: ns, ...ticket } = data;
    const documents = {
      passport: [],
      snils: [],
      inn: [],
      job: [],
      job_petition: []
    };
    const files = await dispatch("loadFiles", images, { root: true });
    Object.assign(documents, files);
    const neighbors = await Promise.all(ns.map(async (n: any) => {
      const { images, ...neighbor } = n;
      const documents = await dispatch("loadFiles", images, { root: true });
      return { ...neighbor, documents };
    }));
    commit(SET_USER_TICKET, { ...ticket, documents, neighbors });
  },

  async [GET_EMPLOYEE_TICKETS_LIVING] ({ state, commit }) {
    const { filters, pagination: { sort, offset, limit } } = state;

    const f = Object.assign({}, filters, { statusId: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14] }); // no draft

    const { data } = await this.service.user.tickets.getEmployeeTicketsLiving({
      filters: f,
      limit,
      offset: offset - 1,
      ...!!sort && { sort }
    });

    commit(SET_USER_TICKETS, data);
  },

  async [SEND_COMPANY_PAYMENT] (_, { id, payload }) {
    const files = new FormData();
    payload.forEach((f: any) => {
      files.append("files", f);
    });
    await this.service.user.tickets.uploadLivingCompanyPayment(id, files);
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

  async [CANCEL_USER_TICKET_LIVING] ({ dispatch }, payload) {
    await this.service.user.tickets.cancelTicketLiving(payload);

    dispatch(GET_USER_TICKETS_LIVING);
  },

  async [DELETE_USER_TICKET_LIVING] (_, id) {
    await this.service.user.tickets.deleteTicketLiving(id);
  },

  async [CREATE_USER_TICKET_LIVING] ({ dispatch }, payload) {
    const { neighbors, documents, ...rest } = payload;
    const { data: { id } } = await this.service.user.tickets.createTicketLiving(rest);
    const files = await dispatch("bundleFiles", { files: documents, asNew: true }, { root: true });
    await Promise.all(files.map((f: any) => dispatch(ADD_USER_TICKET_FILE_LIVING, { id, payload: f })));
    await Promise.all(neighbors.map((n: any) => dispatch(ADD_USER_TICKET_NEIGHBOR, { ticketId: id, payload: n })));
    return id;
  },

  async [UPDATE_LEGAL_TICKET] ({ getters, dispatch }, { ticketId, payload }) {
    const { documents, ...rest } = payload;
    const { documents: oldDocuments } = getters.getCurrentTicket;
    const filesIds: number[] = Object.values(oldDocuments).reduce((res: number[], val: any) => {
      const ids = val.map((v: any) => v.id);
      res.push(...ids);
      return res;
    }, []);
    await Promise.all(filesIds.map((id: number) => this.service.user.tickets.deleteFileLiving(ticketId, id)));
    await this.service.user.tickets.updateTicketLiving(ticketId, rest);
    const files = await dispatch("bundleFiles", { files: documents, asNew: true }, { root: true });
    await Promise.all(files.map((f: any) => dispatch(ADD_USER_TICKET_FILE_LIVING, { id: ticketId, payload: f })));
    return ticketId;
  },

  async [UPDATE_TICKET] ({ getters, dispatch }, { ticketId, payload }) {
    const { neighbors, documents, ...rest } = payload;
    const { neighbors: oldNeighbors, documents: oldDocuments } = getters.getCurrentTicket;
    const filesIds: number[] = Object.values(oldDocuments).reduce((res: number[], val: any) => {
      const ids = val.map((v: any) => v.id);
      res.push(...ids);
      return res;
    }, []);
    const neighborsIds: number[] = oldNeighbors.map((val: any) => val.id);
    // console.log(filesIds, neighborsIds);
    await Promise.all(filesIds.map((id: number) => this.service.user.tickets.deleteFileLiving(ticketId, id)));
    await Promise.all(neighborsIds.map((id: number) => this.service.user.tickets.deleteNeighborLiving(ticketId, id)));
    // update ticket
    await this.service.user.tickets.updateTicketLiving(ticketId, rest);
    const files = await dispatch("bundleFiles", { files: documents, asNew: true }, { root: true });
    await Promise.all(files.map((f: any) => dispatch(ADD_USER_TICKET_FILE_LIVING, { id: ticketId, payload: f })));
    await Promise.all(neighbors.map((n: any) => dispatch(ADD_USER_TICKET_NEIGHBOR, { ticketId, payload: n })));

    return ticketId;
  },

  async [CREATE_LEGAL_TICKET_LIVING] ({ dispatch }, payload) {
    const { documents, ...rest } = payload;
    const { data: { id } } = await this.service.user.tickets.createLegalTicketLiving(rest);
    const files = await dispatch("bundleFiles", { files: documents, asNew: true }, { root: true });

    await Promise.all(files.map((f: any) => dispatch(ADD_USER_TICKET_FILE_LIVING, { id, payload: f })));
  },

  async [ADD_USER_TICKET_FILE_LIVING] (_, { id, payload }) {
    await this.service.user.tickets.addTicketLivingFile(id, payload);
  },

  async [ADD_USER_TICKET_NEIGHBOR] ({ dispatch }, { ticketId, payload }) {
    const { documents, ...neighbor } = payload;
    const { data: { id } } = await this.service.user.tickets.addTicketLivingNeighbor(ticketId, neighbor);
    const files = await dispatch("bundleFiles", { files: documents, asNew: true }, { root: true });
    await Promise.all(files.map((f: any) => this.service.user.tickets.addTicketLivingNeighborFile(id, ticketId, f)));
  },

  [REQUEST_APPROVAL_LIVING] ({ dispatch }, id) {
    return this.service.user.tickets.requestApprovalLiving(id)
      .then(() => dispatch(GET_USER_TICKETS_LIVING));
  },

  [SEND_CONTRACT_INFO_LIVING] ({ dispatch }, { id, payload }) {
    return this.service.user.tickets.sendContractInfoLiving(id, payload)
      .then(() => dispatch(GET_EMPLOYEE_TICKETS_LIVING));
  },

  [TERMINATE_TICKET] (_, { ticketId, reason }) {
    return this.service.user.tickets.terminateLivingContract(ticketId, reason);
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

const living: Module<IUserTicketsState, TRootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};

export default living;
