import { ActionTree, Module, MutationTree } from "vuex";
import { TRootState } from "src/store/types/root";
import { SET_DATA } from "src/store/constants/mutation-constants";
import { GET_DATA, GET_PAYMENT_LINK } from "src/store/constants/action-constants";
import { BillsService } from "src/api/user/bills";
import { IBillsState } from "src/store/types/user/bills";

const state: IBillsState = {
  data: null
};

const mutations: MutationTree<IBillsState> = {
  [SET_DATA] (state, payload) {
    state.data = payload;
  }
};

const actions: ActionTree<IBillsState, TRootState> = {
  async [GET_DATA] ({ commit }) {
    const { data } = await BillsService.getBillsApartments();
    
    commit(SET_DATA, {
      items: data
    });
  },
  
  async [GET_PAYMENT_LINK] (_, id) {
    return BillsService.getPaymentLink(id);
  }
};

const apartments: Module<IBillsState, TRootState> = {
  namespaced: true,
  state,
  mutations,
  actions
};

export default apartments;
