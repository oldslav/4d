import { ActionTree, Module, MutationTree } from "vuex";
import { IRootState } from "src/store/types/root";
import { IUserTicketsState } from "src/store/types/user/tickets";
import { SET_USER_TICKETS } from "src/store/constants/mutation-constants";
import {
  ADD_USER_TICKET_FILE_PARKING,
  CREATE_USER_TICKET_PARKING,
  DELETE_USER_TICKET_PARKING,
  GET_USER_TICKETS_PARKING
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
  async [GET_USER_TICKETS_PARKING] ({ state, commit }) {
    const { filters } = state;
    
    const { data } = await TicketsService.getTicketsParking({
      filters
    });
    
    commit(SET_USER_TICKETS, data);
  },
  
  async [DELETE_USER_TICKET_PARKING] ({ dispatch }, payload) {
    await TicketsService.deleteTicketLiving(payload);
    
    dispatch(GET_USER_TICKETS_PARKING);
  },
  
  async [CREATE_USER_TICKET_PARKING] (_, payload) {
    const { data } = await TicketsService.createTicketLiving(payload);
    
    return data;
  },
  
  async [ADD_USER_TICKET_FILE_PARKING] (_, { id, payload }) {
    await TicketsService.addTicketLivingFile(id, payload);
  }
};

const parking: Module<IUserTicketsState, IRootState> = {
  namespaced: true,
  state,
  mutations,
  actions
};

export default parking;
