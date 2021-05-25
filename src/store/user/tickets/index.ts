import { ActionTree, Module, MutationTree } from "vuex";
import { IRootState } from "src/store/types/root";
import { IUserTicketsState } from "src/store/types/user/tickets";
import living from "src/store/user/tickets/living";
import parking from "src/store/user/tickets/parking";


const mutations: MutationTree<IUserTicketsState> = {

};

const actions: ActionTree<IUserTicketsState, IRootState> = {

};

const tickets: Module<IUserTicketsState, IRootState> = {
  namespaced: true,
  modules: {
    living,
    parking
  },
  mutations,
  actions
};

export default tickets;
