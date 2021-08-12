import { ActionTree, Module, MutationTree } from "vuex";
import { TRootState } from "src/store/types/root";
import { IServicesTourismState } from "../../types/tourism";

const initialState = (): IServicesTourismState => ({});

const state = initialState;

const mutations: MutationTree<IServicesTourismState> = {

};

const actions: ActionTree<IServicesTourismState, TRootState> = {

};

const tourism: Module<IServicesTourismState, TRootState> = {
  namespaced: true,
  state,
  mutations,
  actions
};

export default tourism;
