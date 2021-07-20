import { ActionTree, Module, MutationTree } from "vuex";
import { TRootState } from "src/store/types/root";
import { IUserTicketsState } from "src/store/types/user/tickets";
import { SET_USER_TICKETS } from "src/store/constants/mutation-constants";
import {
  GET_USER_TICKETS_CROWDFUNDING,
  GET_EMPLOYEE_TICKETS_CROWDFUNDING,
  REJECT_TICKET_CROWDFUNDING,
  APPROVE_TICKET_CROWDFUNDING,
  DELETE_USER_TICKET_CROWDFUNDING
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
  async [GET_USER_TICKETS_CROWDFUNDING] ({ state, commit }) {
    const { filters } = state;

    const { data } = await TicketsService.getTicketsCrowdfunding({
      filters
    });

    commit(SET_USER_TICKETS, data);
  },

  async [GET_EMPLOYEE_TICKETS_CROWDFUNDING] ({ state, commit }) {
    const { filters } = state;

    const f = Object.assign({}, filters, { statusId: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] });

    const { data } = await TicketsService.getEmployeeTicketsCrowdfunding({ filters: f });

    commit(SET_USER_TICKETS, data);
  },

  [REJECT_TICKET_CROWDFUNDING] (_, { id, reason }) {
    return TicketsService.rejectTicketCrowdfunding(id, reason);
  },

  [APPROVE_TICKET_CROWDFUNDING] (_, { id }) {
    return TicketsService.approveTicketCrowdfunding(id);
  },

  async [DELETE_USER_TICKET_CROWDFUNDING] ({ dispatch }, payload) {
    await TicketsService.deleteTicketCrowdfunding(payload);

    dispatch(GET_USER_TICKETS_CROWDFUNDING);
  }
};

const crowdfunding: Module<IUserTicketsState, TRootState> = {
  namespaced: true,
  state,
  mutations,
  actions
};

export default crowdfunding;
