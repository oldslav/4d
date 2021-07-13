import { ActionTree, GetterTree, Module, MutationTree } from "vuex";
import { IBillsState } from "src/store/types/user/bills";
import { TRootState } from "src/store/types/root";
import { GET_DATA, GET_PAYMENT_LINK } from "src/store/constants/action-constants";
import { SET_DATA } from "src/store/constants/mutation-constants";
import { BillsService } from "src/api/user/bills";

const state: IBillsState = {
  data: null
};

const mutations: MutationTree<IBillsState> = {
  [SET_DATA] (state, data) {
    state.data = data;
  }
};

const actions: ActionTree<IBillsState, TRootState> = {
  async [GET_DATA] ({ commit }) {
    const { data } = await BillsService.getBillsWarehouse({});
    commit(SET_DATA, { items: data });
  },

  [GET_PAYMENT_LINK] (_, id) {
    return BillsService.getPaymentLink(id);
  }
};

const getters: GetterTree<IBillsState, TRootState> = {
  getWarehouseBills: (state) => state.data
};

const warehouse: Module<IBillsState, TRootState> = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};

export default warehouse;
