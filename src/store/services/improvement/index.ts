import { ActionTree, GetterTree, Module, MutationTree } from "vuex";
import { TRootState } from "src/store/types/root";
import { IUserTicketsState } from "src/store/types/user/tickets";
import park from "src/store/services/improvement/park";
import flower from "src/store/services/improvement/flower";
import trees from "src/store/services/improvement/trees";
import art from "src/store/services/improvement/art";
import square from "src/store/services/improvement/square";

const initialState = (): any => ({});

const state = initialState;

const mutations: MutationTree<IUserTicketsState> = {};

const actions: ActionTree<IUserTicketsState, TRootState> = {};

const getters: GetterTree<IUserTicketsState, TRootState> = {};

const improvement: Module<IUserTicketsState, TRootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
  modules: {
    park,
    trees,
    flower,
    art,
    square
  }
};

export default improvement;
