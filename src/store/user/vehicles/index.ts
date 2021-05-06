import { ActionContext, ActionTree, GetterTree, Module, MutationTree } from "vuex";
import { IRootState } from "src/store/types/root";
import { IVehiclesState } from "src/store/types/user/vehicles";
import {
  CREATE_USER_VEHICLE,
  UPDATE_USER_VEHICLE,
  DELETE_USER_VEHICLE,
  UPDATE_VEHICLE_DOCUMENTS, DELETE_VEHICLE_DOCUMENT, CREATE_VEHICLE_DOCUMENT, GET_USER_DOCUMENTS, STORE_USER_VEHICLES
} from "src/store/constants/action-constants";
import { CLEAR_DELETED_IDS, SET_DELETED_ID, SET_ITEMS } from "src/store/constants/mutation-constants";
import { UserVehiclesService } from "src/api/user/vehicles";
import { DictionariesService } from "src/api/dictionaries";

const state: IVehiclesState = {
  items: [],
  deletedIds: []
};

const mutations: MutationTree<IVehiclesState> = {
  [SET_ITEMS] (state: IVehiclesState, payload) {
    state.items = payload;
  },
  [SET_DELETED_ID] (state, id) {
    state.deletedIds.push(id);
  },
  [CLEAR_DELETED_IDS] (state) {
    state.deletedIds = [];
  }
};

const actions: ActionTree<IVehiclesState, IRootState> = {
  getVehicleTypes () {
    return DictionariesService.getVehicleTypes();
  },
  getVehicleBrands (ctx: ActionContext<IRootState, IRootState>, typeId) {
    return DictionariesService.getVehicleBrands(typeId);
  },
  getVehicleModels (ctx: ActionContext<IRootState, IRootState>, { typeId, brandId }) {
    return DictionariesService.getVehicleModels(typeId, brandId);
  },
  [CREATE_USER_VEHICLE] ({ dispatch }: ActionContext<IVehiclesState, IRootState>, vehicle) {
    const { documents, ...payload } = vehicle;
    return UserVehiclesService.createVehicle(payload)
      .then(({ data }) => {
        const { id } = data;
        return dispatch(UPDATE_VEHICLE_DOCUMENTS, { documents, id });
      })
      .then(() => dispatch(`user/documents/${ GET_USER_DOCUMENTS }`, null, { root: true }));
  },
  [UPDATE_USER_VEHICLE] ({ dispatch }: ActionContext<IVehiclesState, IRootState>, vehicle) {
    const { documents, ...payload } = vehicle;
    return UserVehiclesService.updateVehicle(payload)
      .then(({ data }) => {
        const { id } = data;
        return dispatch(UPDATE_VEHICLE_DOCUMENTS, { documents, id });
      })
      .then(() => dispatch(`user/documents/${ GET_USER_DOCUMENTS }`, null, { root: true }));
  },
  [DELETE_USER_VEHICLE] ({ dispatch }: ActionContext<IVehiclesState, IRootState>, id) {
    return UserVehiclesService.deleteVehicle(id)
      .then(() => dispatch(`user/documents/${ GET_USER_DOCUMENTS }`, null, { root: true }));
  },
  [CREATE_VEHICLE_DOCUMENT] (ctx, { payload, id }) {
    return UserVehiclesService.createVehicleFile(payload, id);
  },
  [DELETE_VEHICLE_DOCUMENT] (ctx, id) {
    return UserVehiclesService.deleteVehicleFile(id);
  },
  [UPDATE_VEHICLE_DOCUMENTS] ({ dispatch, state, rootGetters, commit }, { documents, id }) {
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
    return Promise.all(deletedIds.map((id) => dispatch(DELETE_VEHICLE_DOCUMENT, id)))
      .then(() => {
        commit(CLEAR_DELETED_IDS);
        return Promise.all(awaitsCreate.map((p: any) => dispatch(CREATE_VEHICLE_DOCUMENT, { payload: p, id })));
      });
  },
  [STORE_USER_VEHICLES] ({ commit }, vehicles) {
    const result = vehicles.map((v: any) => {
      const documents = {
        sts: [],
        pts: []
      };
      const { id, model, brand, type, number, images } = v;
      images.forEach((doc: any) => {
        const { id, imagePath, docType } = doc;
        const file = {
          id,
          imagePath,
          name: imagePath
        };
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        documents[docType.name].push(file);
      });
      return { id, model, brand, type, number, documents };
    });
    commit(SET_ITEMS, result);
  }
};

const getters: GetterTree<IVehiclesState, IRootState> = {
  getVehicles (state: IVehiclesState) {
    return state.items;
  }
};

const vehicles: Module<IVehiclesState, IRootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};

export default vehicles;
