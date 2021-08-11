import { ActionTree, GetterTree, Module, MutationTree } from "vuex";
import { TRootState } from "src/store/types/root";
import { IServiceCommerceState } from "src/store/types/commerce";
import { SET_COMMERCE_PLACE } from "src/store/constants/mutation-constants";
import { GET_COMMERCE_PLACE } from "src/store/constants/action-constants";

const state = (): IServiceCommerceState => ({
  current: null
});

const mutations: MutationTree<IServiceCommerceState> = {
  [SET_COMMERCE_PLACE] (state, place) {
    state.current = place;
  }
};

const actions: ActionTree<IServiceCommerceState, TRootState> = {
  async [GET_COMMERCE_PLACE] ({ commit }, id: number) {
    const { data } = await this.service.services.commerce.getCommerceById(id);
    commit(SET_COMMERCE_PLACE, data);
  }
};

const getters: GetterTree<IServiceCommerceState, TRootState> = {
  getCurrentPlace: (state) => state.current
};

const commerce: Module<IServiceCommerceState, TRootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};

export default commerce;
