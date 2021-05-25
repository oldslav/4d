import { ActionTree, Module, MutationTree } from "vuex";
import { IRootState } from "src/store/types/root";
import { IUserTicketsState } from "src/store/types/user/tickets";
import { SET_USER_TICKETS } from "src/store/constants/mutation-constants";
import {
  ADD_USER_TICKET_FILE_LIVING,
  CREATE_USER_TICKET_LIVING,
  DELETE_USER_TICKET_LIVING,
  GET_USER_TICKETS_LIVING
} from "src/store/constants/action-constants";
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
  async [GET_USER_TICKETS_LIVING] ({ state, commit }) {
    const { filters } = state;
    
    const { data } = await TicketsService.getTicketsLiving({
      filters
    });
    
    commit(SET_USER_TICKETS, data);
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
  }
};

const living: Module<IUserTicketsState, IRootState> = {
  namespaced: true,
  state,
  mutations,
  actions
};

export default living;
