import { ActionTree, Module, MutationTree } from "vuex";
import { IRootState } from "src/store/types/root";
import { IUserTicketsState } from "src/store/types/user/tickets";
import { SET_USER_TICKETS } from "src/store/constants/mutation-constants";
import { GET_USER_TICKETS } from "src/store/constants/action-constants";
import { TicketsService } from "src/api/user/tickets/tickets";

const state: IUserTicketsState = {
  filters: null,
  data: null
};

const mutations: MutationTree<IUserTicketsState> = {
  [SET_USER_TICKETS] (state, payload) {
    state.data = payload;
  }
};

const actions: ActionTree<IUserTicketsState, IRootState> = {
  [GET_USER_TICKETS] ({ commit, state }) {
    const response = TicketsService.getTicketsLiving({
      filters: {
        statusId: [124, 13, 1412]
      }
    });
    
    commit(SET_USER_TICKETS, response);
  }
};

const userTickets: Module<IUserTicketsState, IRootState> = {
  namespaced: true,
  state,
  mutations,
  actions
};

export default userTickets;
