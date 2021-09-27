import { ActionContext, ActionTree, GetterTree, Module, MutationTree } from "vuex";
import { TRootState } from "../../types/root";
import { IDocumentsState } from "../../types/user/documents";
import {
  SET_STATE, CLEAR_DELETED_IDS, SET_STATE_DEFAULT, SET_DOCUMENTS, SET_DELETED_ID
} from "src/store/constants/mutation-constants";
import {
  CREATE_USER_DOCUMENT,
  DELETE_USER_DOCUMENT,
  GET_USER_DOCUMENTS, STORE_USER_DOCUMENTS, STORE_USER_NEIGHBORS, STORE_USER_VEHICLES,
  UPDATE_USER_DOCUMENTS
} from "src/store/constants/action-constants";

const initialState = (): IDocumentsState => {
  return {
    documents: {
      passport: [],
      snils: [],
      inn: [],
      job: []
    },
    deletedIds: []
  };
};

const defaultState = {};

const state = initialState;

const mutations: MutationTree<IDocumentsState> = {
  [SET_DOCUMENTS] (state: IDocumentsState, payload) {
    state.documents = { ...state.documents, ...payload };
  },
  [SET_STATE] (state: IDocumentsState, payload) {
    Object.assign(state, payload);
  },
  [SET_DELETED_ID] (state: IDocumentsState, id) {
    state.deletedIds.push(id);
  },
  [CLEAR_DELETED_IDS] (state: IDocumentsState) {
    state.deletedIds = [];
  },
  [SET_STATE_DEFAULT] (state) {
    Object.assign(state, defaultState);
  }
};

const actions: ActionTree<IDocumentsState, TRootState> = {
  async [UPDATE_USER_DOCUMENTS] ({ state, dispatch, commit }) {
    const { deletedIds, documents: { ...files } } = state;
    await Promise.all(deletedIds.map((id: number) => dispatch(DELETE_USER_DOCUMENT, id)));
    commit(CLEAR_DELETED_IDS);
    const awaitsCreate = await dispatch("bundleFiles", { files }, { root: true });
    await Promise.all(awaitsCreate.map((p: any) => dispatch(CREATE_USER_DOCUMENT, p)));
    dispatch(GET_USER_DOCUMENTS);
  },
  [CREATE_USER_DOCUMENT] (ctx: ActionContext<IDocumentsState, TRootState>, document) {
    return this.service.user.documents.createDocument(document);
  },
  [DELETE_USER_DOCUMENT] (ctx: ActionContext<IDocumentsState, TRootState>, id) {
    return this.service.user.documents.deleteDocument(id);
  },
  async [GET_USER_DOCUMENTS] ({ dispatch }) {
    const { data } = await this.service.user.documents.getDocuments();
    const { cars, neighbors, images } = data;
    await dispatch(STORE_USER_DOCUMENTS, images);
    dispatch(`user/vehicles/${ STORE_USER_VEHICLES }`, cars, { root: true });
    dispatch(`user/neighbors/${ STORE_USER_NEIGHBORS }`, neighbors, { root: true });
  },
  async [STORE_USER_DOCUMENTS] ({ commit, dispatch }, documents) {
    const result: any = initialState();
    const files = await dispatch("loadFiles", documents, { root: true });
    Object.assign(result.documents, files);
    Object.assign(defaultState, result);
    commit(SET_STATE, result);
  }
};

const getters: GetterTree<IDocumentsState, TRootState> = {
  isChanged (state: IDocumentsState) {
    return JSON.stringify(defaultState) !== JSON.stringify(state);
  },

  getDocuments (state: IDocumentsState) {
    return state.documents;
  }
};

const documents: Module<IDocumentsState, TRootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};

export default documents;
