import { isEqual } from "lodash";
import { ActionContext, ActionTree, GetterTree, Module, MutationTree } from "vuex";
import { IRootState } from "../../types/root";
import { IDocumentsState } from "../../types/user/documents";
import { SET_PASSPORT, SET_INN, SET_SNILS, SET_JOB } from "src/store/constants/mutation-constants";
import { CREATE_USER_DOCUMENT, DELETE_USER_DOCUMENT } from "src/store/constants/action-constants";
import { UserDocumentsService } from "src/api/user/documents";

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
  [SET_JOB] (state: IDocumentsState, payload) {
    state.job = payload;
  }
};

const actions: ActionTree<IDocumentsState, IRootState> = {
  [CREATE_USER_DOCUMENT] (ctx: ActionContext<IDocumentsState, IRootState>, document) {
    return UserDocumentsService.createDocument(document);
  },
  [DELETE_USER_DOCUMENT] (ctx: ActionContext<IDocumentsState, IRootState>, id) {
    return UserDocumentsService.deleteDocument(id);
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
  actions,
  getters
};

export default documents;
