import { ActionTree, Module, MutationTree } from "vuex";
import { TRootState } from "src/store/types/root";
import { IUserTicketsState } from "src/store/types/user/tickets";
import { SET_USER_TICKETS } from "src/store/constants/mutation-constants";
import {
  ADD_USER_TICKET_FILE_PARKING,
  CREATE_USER_TICKET_PARKING,
  DELETE_USER_TICKET_PARKING,
  GET_USER_TICKETS_PARKING,
  GET_EMPLOYEE_TICKETS_PARKING,
  REJECT_TICKET_PARKING,
  APPROVE_TICKET_PARKING,
  GET_USER_TICKET_PARKING_PAYMENT_LINK
} from "src/store/constants/action-constants";
import { TicketsService } from "src/api/user/tickets/tickets";
import { BillsService } from "src/api/user/bills";

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
  async [GET_USER_TICKETS_PARKING] ({ state, commit }) {
    const { filters } = state;
    
    const { data } = await TicketsService.getTicketsParking({
      filters
    });
    
    commit(SET_USER_TICKETS, data);
  },

  async [GET_EMPLOYEE_TICKETS_PARKING] ({ state, commit }) {
    const { filters } = state;

    const f = Object.assign({}, filters, { statusId: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] });

    const { data } = await TicketsService.getEmployeeTicketsParking({ filters: f });

    commit(SET_USER_TICKETS, data);
  },

  [REJECT_TICKET_PARKING] (_, { id, reason }) {
    return TicketsService.rejectTicketParking(id, reason);
  },

  [APPROVE_TICKET_PARKING] (_, { id }) {
    return TicketsService.approveTicketParking(id);
  },
  
  async [DELETE_USER_TICKET_PARKING] ({ dispatch }, payload) {
    await TicketsService.deleteTicketLiving(payload);
    
    dispatch(GET_USER_TICKETS_PARKING);
  },
  
  async [CREATE_USER_TICKET_PARKING] (_, payload) {
    const { data } = await TicketsService.createTicketParking(payload);

    if (data.id) {
      return TicketsService.requestApprovalParking(data.id);
    }
    
    return data;
  },
  
  async [ADD_USER_TICKET_FILE_PARKING] (_, { id, payload }) {
    await TicketsService.addTicketLivingFile(id, payload);
  },
  
  async [GET_USER_TICKET_PARKING_PAYMENT_LINK] (_, id) {
    const { data } = await TicketsService.getParkingPayments({ paid:false });
    
    const paymentId = data.find((i: any) => i.id === id).id;
    return BillsService.getPaymentLink(paymentId);
  }
};

const parking: Module<IUserTicketsState, TRootState> = {
  namespaced: true,
  state,
  mutations,
  actions
};

export default parking;
