import { ActionContext, ActionTree, GetterTree, Module, MutationTree } from "vuex";
import { INeighbor, INeighborsState } from "../../types/user/neighbors";
import { IRootState } from "src/store/types/root";
import {
  CREATE_NEIGHBOR_DOCUMENT,
  CREATE_USER_NEIGHBOR, DELETE_NEIGHBOR_DOCUMENT,
  DELETE_USER_NEIGHBOR, GET_USER_DOCUMENTS,
  STORE_USER_NEIGHBORS, UPDATE_NEIGHBOR_DOCUMENTS,
  UPDATE_USER_NEIGHBOR
} from "src/store/constants/action-constants";
import { UserNeighborsService } from "src/api/user/neighbors";
import { CLEAR_DELETED_IDS, SET_DELETED_ID, SET_ITEMS } from "src/store/constants/mutation-constants";

const state: INeighborsState = {
  items: [],
  deletedIds: []
};

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

const actions: ActionTree<INeighborsState, IRootState> = {
  [CREATE_USER_NEIGHBOR] ({ dispatch }: ActionContext<INeighborsState, IRootState>, neighbor) {
    const { documents, ...payload } = neighbor;
    return UserNeighborsService.createNeighbor(payload)
      .then(({ data }) => {
        const { id } = data;
        return dispatch(UPDATE_NEIGHBOR_DOCUMENTS, { documents, id });
      })
      .then(() => dispatch(`user/documents/${ GET_USER_DOCUMENTS }`, null, { root: true }));
  },
  [UPDATE_USER_NEIGHBOR] ({ dispatch }: ActionContext<INeighborsState, IRootState>, neighbor) {
    const { documents, ...payload } = neighbor;
    return UserNeighborsService.updateNeighbor(payload)
      .then(({ data }) => {
        const { id } = data;
        return dispatch(UPDATE_NEIGHBOR_DOCUMENTS, { documents, id });
      })
      .then(() => dispatch(`user/documents/${ GET_USER_DOCUMENTS }`, null, { root: true }));
  },
  [DELETE_USER_NEIGHBOR] ({ dispatch }: ActionContext<INeighborsState, IRootState>, id) {
    return UserNeighborsService.deleteNeighbor(id)
      .then(() => dispatch(`user/documents/${ GET_USER_DOCUMENTS }`, null, { root: true }));
  },
  [CREATE_NEIGHBOR_DOCUMENT] (ctx, { payload, id }) {
    return UserNeighborsService.createNeighborFile(payload, id);
  },
  [DELETE_NEIGHBOR_DOCUMENT] (ctx, id) {
    return UserNeighborsService.deleteNeighborFile(id);
  },
  [UPDATE_NEIGHBOR_DOCUMENTS] ({ commit, dispatch, state, rootGetters }, { documents, id }) {
    const { deletedIds } = state;
    const awaitsCreate: any = [];
    Object.entries(documents).forEach(([key, val]: any) => {
      val.forEach((file: any) => {
        if (!file.id) {
          const type = rootGetters["references/getDocTypeByName"](key);
          const payload = new FormData();
          payload.append("file", file);
          payload.append("typeId", type.id);
          awaitsCreate.push(payload);
        }
      });
    });
    return Promise.all(deletedIds.map((id) => dispatch(DELETE_NEIGHBOR_DOCUMENT, id)))
      .then(() => {
        commit(CLEAR_DELETED_IDS);
        return Promise.all(awaitsCreate.map((p: any) => dispatch(CREATE_NEIGHBOR_DOCUMENT, { payload: p, id })));
      });
  },
  [STORE_USER_NEIGHBORS] ({ commit }, neighbors) {
    const result = neighbors.map((n: any) => {
      const documents = {
        inn: [],
        snils: [],
        passport: [],
        marriage: [],
        birth: [],
        children_registration: [],
        consent_processing_personal_data: []
      };
      const { id, name, images, neighborType } = n;
      images.forEach((doc: any) => {
        const { id, imagePath, docType, fileName } = doc;
        const file = {
          id,
          imagePath,
          name: fileName
        };
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        documents[docType.name].push(file);
      });
      return { id, name, documents, neighborType };
    });
    commit(SET_ITEMS, result);
  }
};

const getters: GetterTree<INeighborsState, IRootState> = {
  getNeighbors (state: INeighborsState) {
    return state.items;
  }
};

const neighbors: Module<INeighborsState, IRootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};

export default neighbors;