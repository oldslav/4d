import { isEqual } from "lodash";
import { GetterTree, Module, MutationTree } from "vuex";
import { IRootState } from "../../types/root";
import { IDocumentsState } from "../../types/user/documents";
import { SET_PASSPORT, SET_INN, SET_SNILS, SET_WORK_CERTIFICATE } from "src/store/constants/mutation-constants";

const initialState = (): IDocumentsState => {
  return {
    passport: [],
    snils: [],
    inn: [],
    job: []
  };
};

const state: () => IDocumentsState = initialState;

const mutations: MutationTree<IDocumentsState> = {
  [SET_PASSPORT] (state: IDocumentsState, payload) {
    state.passport = payload;
  },
  [SET_SNILS] (state: IDocumentsState, payload) {
    state.snils = payload;
  },
  [SET_INN] (state: IDocumentsState, payload) {
    state.inn = payload;
  },
  [SET_WORK_CERTIFICATE] (state: IDocumentsState, payload) {
    state.job = payload;
  }
};

const getters: GetterTree<IDocumentsState, IRootState> = {
  isChanged (state: IDocumentsState) {
    return !isEqual(state, initialState());
  },
  getDocuments (state: IDocumentsState) {
    return state;
  }
};
const documents: Module<IDocumentsState, IRootState> = {
  namespaced: true,
  state,
  mutations,
  getters
};

export default documents;
