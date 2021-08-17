import { ActionTree, Module, MutationTree } from "vuex";
import { TRootState } from "src/store/types/root";
import { IUserTicketsState } from "src/store/types/user/tickets";
import { SET_USER_TICKETS } from "src/store/constants/mutation-constants";
import {
  GET_USER_TICKETS_CROWDFUNDING,
  GET_EMPLOYEE_TICKETS_CROWDFUNDING,
  REJECT_TICKET_CROWDFUNDING,
  APPROVE_TICKET_CROWDFUNDING,
  DELETE_USER_TICKET_CROWDFUNDING,
  CREATE_USER_TICKET_CROWDFUNDING,
  ADD_USER_TICKET_CROWDFUNDING_COVER,
  ADD_USER_TICKET_CROWDFUNDING_FILES
} from "src/store/constants/action-constants";

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
  async [CREATE_USER_TICKET_CROWDFUNDING] ({ dispatch }, payload) {
    const { media, ...result } = payload;
    const params = { clean: true };
    const { data: { id } } = await this.service.user.tickets.createTicketCrowdfunding(params);
    if (id) {
      await this.service.user.tickets.updateTicketCrowdfunding(id, result);
      if (media && media.length > 0) await dispatch(ADD_USER_TICKET_CROWDFUNDING_FILES, { id, media });
      await this.service.user.tickets.publishTicketCrowdfunding(id);
    }
  },

  async [ADD_USER_TICKET_CROWDFUNDING_COVER] (_, { id, cover }) {
    const payload = new FormData();
    payload.append("file", cover);
    
    await this.service.user.tickets.addTicketCrowdfundingCover(id, payload);
  },

  async [ADD_USER_TICKET_CROWDFUNDING_FILES] (_, { id, media }) {
    await Promise.all(
      media.map(async (file: any) => {
        const payload = new FormData();
        payload.append("file", file);
        await this.service.user.tickets.addTicketCrowdfundingFile(id, payload);
      })
    );
  },

  async [GET_USER_TICKETS_CROWDFUNDING] ({ state, commit }) {
    const { filters } = state;

    const { data } = await this.service.user.tickets.getTicketsCrowdfunding({
      filters
    });

    commit(SET_USER_TICKETS, data);
  },

  async [GET_EMPLOYEE_TICKETS_CROWDFUNDING] ({ state, commit }) {
    const { filters } = state;

    const f = Object.assign({}, filters, { statusId: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] });

    const { data } = await this.service.user.tickets.getEmployeeTicketsCrowdfunding({ filters: f });

    commit(SET_USER_TICKETS, data);
  },

  [REJECT_TICKET_CROWDFUNDING] (_, { id, reason }) {
    return this.service.user.tickets.rejectTicketCrowdfunding(id, reason);
  },

  [APPROVE_TICKET_CROWDFUNDING] (_, { id }) {
    return this.service.user.tickets.approveTicketCrowdfunding(id);
  },

  async [DELETE_USER_TICKET_CROWDFUNDING] ({ dispatch }, payload) {
    await this.service.user.tickets.deleteTicketCrowdfunding(payload);

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
