import { ActionContext, ActionTree, GetterTree, Module, MutationTree } from "vuex";
import { TRootState } from "src/store/types/root";
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
import { Service } from "src/api/common";

const state = () : IVehiclesState => ({
  items: [],
  deletedIds: []
});

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

const actions: ActionTree<IVehiclesState, TRootState> = {
  getVehicleTypes () {
    return DictionariesService.getVehicleTypes();
  },
  getVehicleBrands (ctx: ActionContext<TRootState, TRootState>, typeId) {
    return DictionariesService.getVehicleBrands(typeId);
  },
  getVehicleModels (ctx: ActionContext<TRootState, TRootState>, { typeId, brandId }) {
    return DictionariesService.getVehicleModels(typeId, brandId);
  },
  [CREATE_USER_VEHICLE] ({ dispatch }: ActionContext<IVehiclesState, TRootState>, vehicle) {
    const { documents, ...payload } = vehicle;
    return UserVehiclesService.createVehicle(payload)
      .then(({ data }) => {
        const { id } = data;
        return dispatch(UPDATE_VEHICLE_DOCUMENTS, { documents, id });
      })
      .then(() => dispatch(`user/documents/${ GET_USER_DOCUMENTS }`, null, { root: true }));
  },
  [UPDATE_USER_VEHICLE] ({ dispatch }: ActionContext<IVehiclesState, TRootState>, vehicle) {
    const { documents, ...payload } = vehicle;
    return UserVehiclesService.updateVehicle(payload)
      .then(({ data }) => {
        const { id } = data;
        return dispatch(UPDATE_VEHICLE_DOCUMENTS, { documents, id });
      })
      .then(() => dispatch(`user/documents/${ GET_USER_DOCUMENTS }`, null, { root: true }));
  },
  [DELETE_USER_VEHICLE] ({ dispatch }: ActionContext<IVehiclesState, TRootState>, id) {
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
  async [STORE_USER_VEHICLES] ({ commit }, vehicles) {
    const result: any = [];
    await Promise.all(vehicles.map(async (v: any) => {
      const documents: any = {
        sts: [],
        pts: []
      };
      const { id, model, brand, type, number, images } = v;
      await Promise.all(images.map(async (doc: any) => {
        const { imagePath, docType, fileName } = doc;
        const { data } = await Service.getFile(imagePath);
        const file = new File([data], fileName, { type: data.type });
        documents[docType.name].push(file);
      }));
      result.push({ id, model, brand, type, number, documents });
    }));
    commit(SET_ITEMS, result);
  }
};

const getters: GetterTree<IVehiclesState, TRootState> = {
  getVehicles (state: IVehiclesState) {
    return state.items;
  }
};

const vehicles: Module<IVehiclesState, TRootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};

export default vehicles;
