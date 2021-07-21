import { ActionContext, ActionTree, GetterTree, Module, MutationTree } from "vuex";
import { INeighbor, INeighborsState } from "../../types/user/neighbors";
import { TRootState } from "src/store/types/root";
import {
  CREATE_NEIGHBOR_DOCUMENT,
  CREATE_USER_NEIGHBOR, DELETE_NEIGHBOR_DOCUMENT,
  DELETE_USER_NEIGHBOR, GET_USER_DOCUMENTS,
  STORE_USER_NEIGHBORS, UPDATE_NEIGHBOR_DOCUMENTS,
  UPDATE_USER_NEIGHBOR
} from "src/store/constants/action-constants";
import { CLEAR_DELETED_IDS, SET_DELETED_ID, SET_ITEMS } from "src/store/constants/mutation-constants";

const state = (): INeighborsState => ({
  items: [],
  deletedIds: []
});

const mutations: MutationTree<INeighborsState> = {
  [SET_ITEMS] (state: INeighborsState, payload: INeighbor[]) {
    state.items = payload;
  },
  [SET_DELETED_ID] (state, id) {
    state.deletedIds.push(id);
  },
  [CLEAR_DELETED_IDS] (state) {
    state.deletedIds = [];
  }
};

const actions: ActionTree<INeighborsState, TRootState> = {
  [CREATE_USER_NEIGHBOR] ({ dispatch }: ActionContext<INeighborsState, TRootState>, neighbor) {
    const { documents, ...payload } = neighbor;
    return this.service.user.neighbors.createNeighbor(payload)
      .then(({ data }) => {
        const { id } = data;
        return dispatch(UPDATE_NEIGHBOR_DOCUMENTS, { documents, id });
      })
      .then(() => dispatch(`user/documents/${ GET_USER_DOCUMENTS }`, null, { root: true }));
  },
  [UPDATE_USER_NEIGHBOR] ({ dispatch }: ActionContext<INeighborsState, TRootState>, neighbor) {
    const { documents, ...payload } = neighbor;
    return this.service.user.neighbors.updateNeighbor(payload)
      .then(({ data }) => {
        const { id } = data;
        return dispatch(UPDATE_NEIGHBOR_DOCUMENTS, { documents, id });
      })
      .then(() => dispatch(`user/documents/${ GET_USER_DOCUMENTS }`, null, { root: true }));
  },
  [DELETE_USER_NEIGHBOR] ({ dispatch }: ActionContext<INeighborsState, TRootState>, id) {
    return this.service.user.neighbors.deleteNeighbor(id)
      .then(() => dispatch(`user/documents/${ GET_USER_DOCUMENTS }`, null, { root: true }));
  },
  [CREATE_NEIGHBOR_DOCUMENT] (ctx, { payload, id }) {
    return this.service.user.neighbors.createNeighborFile(payload, id);
  },
  [DELETE_NEIGHBOR_DOCUMENT] (ctx, id) {
    return this.service.user.neighbors.deleteNeighborFile(id);
  },
  async [UPDATE_NEIGHBOR_DOCUMENTS] ({ commit, dispatch, state }, { documents, id }) {
    const { deletedIds } = state;
    const files = await dispatch("bundleFiles", documents, { root: true });
    await Promise.all(deletedIds.map((id) => dispatch(DELETE_NEIGHBOR_DOCUMENT, id)));
    commit(CLEAR_DELETED_IDS);
    await Promise.all(files.map((p: any) => dispatch(CREATE_NEIGHBOR_DOCUMENT, { payload: p, id })));
  },
  async [STORE_USER_NEIGHBORS] ({ commit }, neighbors) {
    const result: any = [];
    await Promise.all(neighbors.map(async (n: any) => {
      const documents: any = {
        inn: [],
        snils: [],
        passport: [],
        marriage: [],
        birth: [],
        children_registration: [],
        consent_processing_personal_data: []
      };
      const { id, name, images, neighborType } = n;
      await Promise.all(images.map(async (doc: any) => {
        const { imagePath, docType, fileName } = doc;
        const { data } = await this.service.common.getFile(imagePath);
        const file = new File([data], fileName, { type: data.type });
        documents[docType.name].push(file);
      }));
      result.push({ id, name, documents, neighborType });
    }));
    commit(SET_ITEMS, result);
  }
};

const getters: GetterTree<INeighborsState, TRootState> = {
  getNeighbors (state: INeighborsState) {
    return state.items;
  }
};

const neighbors: Module<INeighborsState, TRootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};

export default neighbors;
