import { ActionContext, ActionTree, GetterTree, Module, MutationTree } from "vuex";
import { IRootState } from "../../types/root";
import { IDocumentsState } from "../../types/user/documents";
import {
  SET_PASSPORT,
  SET_INN,
  SET_SNILS,
  SET_JOB,
  SET_STATE, SET_DELETED_ID, CLEAR_DELETED_IDS, SET_STATE_DEFAULT
} from "src/store/constants/mutation-constants";
import {
  CREATE_USER_DOCUMENT,
  DELETE_USER_DOCUMENT,
  GET_USER_DOCUMENTS, STORE_USER_DOCUMENTS, STORE_USER_NEIGHBORS, STORE_USER_VEHICLES,
  UPDATE_USER_DOCUMENTS
} from "src/store/constants/action-constants";
import { UserDocumentsService } from "src/api/user/documents";

const initialState = (): IDocumentsState => {
  return {
    passport: [],
    snils: [],
    inn: [],
    job: [],
    deletedIds: []
  };
};

const defaultState = {};

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

const actions: ActionTree<IDocumentsState, IRootState> = {
  [UPDATE_USER_DOCUMENTS] ({ state, rootGetters, dispatch, commit }) {
    const awaitsCreate: any = [];
    const { deletedIds, ...files } = state;
    Object.entries(files).forEach(([key, val]) => {
      val.forEach((file: any) => {
        if (!file.id) {
          const { id } = rootGetters["references/getDocTypeByName"](key);
          const payload = new FormData();
          payload.append("file", file);
          payload.append("typeId", id);
          awaitsCreate.push(payload);
        }
      });
    });
    return Promise.all(deletedIds.map((id: number) => dispatch(DELETE_USER_DOCUMENT, id)))
      .then(() => {
        commit(CLEAR_DELETED_IDS);
        return Promise.all(awaitsCreate.map((p: any) => dispatch(CREATE_USER_DOCUMENT, p)));
      })
      .then(() => dispatch(GET_USER_DOCUMENTS));
  },
  [CREATE_USER_DOCUMENT] (ctx: ActionContext<IDocumentsState, IRootState>, document) {
    return UserDocumentsService.createDocument(document);
  },
  [DELETE_USER_DOCUMENT] (ctx: ActionContext<IDocumentsState, IRootState>, id) {
    return UserDocumentsService.deleteDocument(id);
  },
  async [GET_USER_DOCUMENTS] ({ dispatch }) {
    const { data } = await UserDocumentsService.getDocuments();
    const { cars, neighbors, images } = data;
    dispatch(STORE_USER_DOCUMENTS, images);
    dispatch(`user/vehicles/${ STORE_USER_VEHICLES }`, cars, { root: true });
    dispatch(`user/neighbors/${ STORE_USER_NEIGHBORS }`, neighbors, { root: true });
  },
  [STORE_USER_DOCUMENTS] ({ commit }, documents) {
    const result = initialState();
    documents.forEach((doc: any) => {
      const { id, imagePath, docType } = doc;
      const file = {
        id,
        imagePath,
        name: imagePath
      };
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      result[docType.name].push(file);
    });
    Object.assign(defaultState, result);
    commit(SET_STATE, result);
  }
};

const getters: GetterTree<IDocumentsState, IRootState> = {
  isChanged (state: IDocumentsState) {
    return JSON.stringify(defaultState) !== JSON.stringify(state);
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
