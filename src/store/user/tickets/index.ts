import { ActionTree, Module, MutationTree } from "vuex";
import { TRootState } from "src/store/types/root";
import { IUserTicketsState } from "src/store/types/user/tickets";
import living from "src/store/user/tickets/living";
import parking from "src/store/user/tickets/parking";
import warehouse from "src/store/user/tickets/warehouse";
import vacancy from "src/store/user/tickets/vacancy";
import crowdfunding from "src/store/user/tickets/crowdfunding";


const mutations: MutationTree<IUserTicketsState> = {

};

const actions: ActionTree<IUserTicketsState, TRootState> = {

};

const tickets: Module<IUserTicketsState, TRootState> = {
  namespaced: true,
  modules: {
    living,
    parking,
    warehouse,
    vacancy,
    crowdfunding
  },
  mutations,
  actions
};

export default tickets;
