import { ActionTree, GetterTree, Module, MutationTree } from "vuex";
import { TRootState } from "src/store/types/root";
import { SET_DATA, SET_PAID, SET_TICKET_ID } from "src/store/constants/mutation-constants";
import { GET_DATA, GET_PAYMENT_LINK } from "src/store/constants/action-constants";
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
    const { data } = await this.service.user.bills.getBillsApartments(state.filters);

    commit(SET_DATA, {
      items: data
    });
  },

  [GET_PAYMENT_LINK] (_, id) {
    return this.service.user.bills.getPaymentLink(id);
  }
};

const getters: GetterTree<IBillsState, TRootState> = {
  getApartmentsBills: (state) => state.data
};

const apartments: Module<IBillsState, TRootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};

export default apartments;
