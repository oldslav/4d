import { ActionTree, GetterTree, Module, MutationTree } from "vuex";
import { TRootState } from "src/store/types/root";
import { IUserTicketsState } from "src/store/types/user/tickets";
import trobjects from "src/store/services/transport/trobjects";
import parking from "src/store/services/transport/parking";
import navigation from "src/store/services/transport/navigation";
import highway from "src/store/services/transport/highway";
import crosswalk from "src/store/services/transport/crosswalk";
import plan from "src/store/services/transport/plan";

const initialState = (): any => ({});

const state = initialState;

const mutations: MutationTree<IUserTicketsState> = {};

const actions: ActionTree<IUserTicketsState, TRootState> = {};

const getters: GetterTree<IUserTicketsState, TRootState> = {};

const transport: Module<IUserTicketsState, TRootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
  modules: {
    trobjects,
    parking,
    crosswalk,
    highway,
    plan,
    navigation
  }
};

export default transport;
