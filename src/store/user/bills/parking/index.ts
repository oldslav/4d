import { ActionTree, GetterTree, Module, MutationTree } from "vuex";
import { TRootState } from "src/store/types/root";
import { SET_DATA, SET_PAID, SET_TICKET_ID } from "src/store/constants/mutation-constants";
import { GET_DATA, GET_PAYMENT_LINK } from "src/store/constants/action-constants";
import { BillsService } from "src/api/user/bills";
import { IBillsState } from "src/store/types/user/bills";

const state = (): IBillsState => ({
  data: null,
  filters: {
    ticketId: null,
    paid: null
  }
});

const mutations: MutationTree<IBillsState> = {
  [SET_DATA] (state, payload) {
    state.data = payload;
  },
  [SET_TICKET_ID] (state, id) {
    state.filters.ticketId = id;
  },
  [SET_PAID] (state, paid) {
    state.filters.paid = paid;
  }
};

const actions: ActionTree<IBillsState, TRootState> = {
  async [GET_DATA] ({ commit, state }) {
    const { data } = await BillsService.getBillsParking(state.filters);

    commit(SET_DATA, {
      items: data
    });
  },

  [GET_PAYMENT_LINK] (_, id) {
    return BillsService.getPaymentLink(id);
  }
};

const getters: GetterTree<IBillsState, TRootState> = {
  getParkingBills: (state) => state.data
};

const parking: Module<IBillsState, TRootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};

export default parking;
