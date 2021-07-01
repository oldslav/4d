import { ActionTree, Module, MutationTree } from "vuex";
import { TRootState } from "src/store/types/root";
import { IUserTicketsState } from "src/store/types/user/tickets";
import { SET_USER_TICKETS } from "src/store/constants/mutation-constants";
import {
  REQUEST_APPROVAL_LIVING,
  ADD_USER_TICKET_FILE_LIVING,
  CREATE_USER_TICKET_LIVING,
  DELETE_USER_TICKET_LIVING,
  GET_USER_TICKETS_LIVING,
  GET_EMPLOYEE_TICKETS_LIVING,
  REJECT_TICKET_LIVING,
  APPROVE_TICKET_LIVING,
  UPDATE_TICKET_APARTMENT, UPDATE_TICKET_APARTMENT_VIEWED
} from "src/store/constants/action-constants";
import { TicketsService } from "src/api/user/tickets/tickets";

const state: IUserTicketsState = {
  filters: null,
  pagination: {
    limit: 10,
    offset: 1
  },
  data: null
};

const mutations: MutationTree<IUserTicketsState> = {
  [SET_USER_TICKETS] (state, payload) {
    state.data = payload;
  }
};

const actions: ActionTree<IUserTicketsState, TRootState> = {
  async [GET_USER_TICKETS_LIVING] ({ state, commit }) {
    const { filters } = state;

    const { data } = await TicketsService.getTicketsLiving({
      filters
    });

    commit(SET_USER_TICKETS, data);
  },

  async [GET_EMPLOYEE_TICKETS_LIVING] ({ state, commit }) {
    const { filters } = state;

    const f = Object.assign({}, filters, { statusId: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] }); // no draft

    const { data } = await TicketsService.getEmployeeTicketsLiving({ filters: f });

    commit(SET_USER_TICKETS, data);
  },

  [REJECT_TICKET_LIVING] (_, { id, reason }) {
    return TicketsService.rejectTicketLiving(id, reason);
  },

  [APPROVE_TICKET_LIVING] (_, { id, payload }) {
    return TicketsService.approveTicketLiving(id, payload);
  },
  
  async [UPDATE_TICKET_APARTMENT] (_, { requestId, apartmentId }) {
    await TicketsService.choiceApartment(requestId, apartmentId);
  },
  
  async [UPDATE_TICKET_APARTMENT_VIEWED] (_, { requestId, apartmentViewed }) {
    await TicketsService.viewedApartment(requestId, apartmentViewed);
  },

  async [DELETE_USER_TICKET_LIVING] ({ dispatch }, payload) {
    await TicketsService.deleteTicketLiving(payload);

    dispatch(GET_USER_TICKETS_LIVING);
  },

  async [CREATE_USER_TICKET_LIVING] (_, payload) {
    const { data } = await TicketsService.createTicketLiving(payload);

    return data;
  },

  async [ADD_USER_TICKET_FILE_LIVING] (_, { id, payload }) {
    await TicketsService.addTicketLivingFile(id, payload);
  },

  [REQUEST_APPROVAL_LIVING] ({ dispatch }, id) {
    return TicketsService.requestApprovalLiving(id)
      .then(() => dispatch(GET_USER_TICKETS_LIVING));
  }
};

const living: Module<IUserTicketsState, TRootState> = {
  namespaced: true,
  state,
  mutations,
  actions
};

export default living;
