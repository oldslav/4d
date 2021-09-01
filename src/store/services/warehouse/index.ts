import { GetterTree, Module, MutationTree } from "vuex";
import { SET_CREATE_TICKET } from "src/store/constants/mutation-constants";

const state = (): any => ({
  createTicket: null
});

const mutations: MutationTree<any> = {
  [SET_CREATE_TICKET] (state, ticketType) {
    state.createTicket = ticketType;
  }
};

const getters: GetterTree<any, any> = {
  getCreateTicket: (state) => state.createTicket
};

const warehouse: Module<any, any> = {
  namespaced: true,
  state,
  getters,
  mutations
};

export default warehouse;
