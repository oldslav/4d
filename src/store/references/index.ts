import { ActionTree, GetterTree, Module, MutationTree } from "vuex";
import ReferencesService from "src/api/references";
import { GET_REFERENCES } from "src/store/constants/action-constants";
import { SET_STATE } from "src/store/constants/mutation-constants";

const state: any = {};

const mutations: MutationTree<any> = {
  [SET_STATE] (state: any, payload) {
    Object.assign(state, payload);
  }
};

const actions: ActionTree<any, any> = {
  [GET_REFERENCES] ({ commit }) {
    const type = ["docTypes", "roles", "warehouseServices", "neighborTypes", "rentStatuses", "requestStatuses"].toString();
    return ReferencesService.getReferences(type)
      .then(({ data }) => {
        commit(SET_STATE, data);
      });
  }
};

const getters: GetterTree<any, any> = {
  getDocTypes (state: any) {
    return state.docTypes;
  },
  getDocTypeByName: (state: any) => (name: string) => {
    return state.docTypes.find((type: any) => type.name === name);
  }
};

const references: Module<any, any> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};

export default references;
