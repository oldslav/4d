import { ActionContext, ActionTree, GetterTree, Module, MutationTree } from "vuex";
import { TRootState } from "src/store/types/root";
import { IVehiclesState } from "src/store/types/user/vehicles";
import {
  CREATE_USER_VEHICLE,
  UPDATE_USER_VEHICLE,
  DELETE_USER_VEHICLE,
  UPDATE_VEHICLE_DOCUMENTS,
  DELETE_VEHICLE_DOCUMENT,
  CREATE_VEHICLE_DOCUMENT,
  GET_USER_DOCUMENTS,
  STORE_USER_VEHICLES
} from "src/store/constants/action-constants";
import { CLEAR_DELETED_IDS, SET_DELETED_ID, SET_ITEMS } from "src/store/constants/mutation-constants";

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
    return this.service.dictionaries.getVehicleTypes();
  },
  getVehicleBrands (ctx: ActionContext<TRootState, TRootState>, typeId) {
    return this.service.dictionaries.getVehicleBrands(typeId);
  },
  getVehicleModels (ctx: ActionContext<TRootState, TRootState>, { typeId, brandId }) {
    return this.service.dictionaries.getVehicleModels(typeId, brandId);
  },
  [CREATE_USER_VEHICLE] ({ dispatch }: ActionContext<IVehiclesState, TRootState>, vehicle) {
    const { documents, ...payload } = vehicle;
    return this.service.user.vehicles.createVehicle(payload)
      .then(({ data }) => {
        const { id } = data;
        return dispatch(UPDATE_VEHICLE_DOCUMENTS, { documents, id });
      })
      .then(() => dispatch(`user/documents/${ GET_USER_DOCUMENTS }`, null, { root: true }));
  },
  [UPDATE_USER_VEHICLE] ({ dispatch }: ActionContext<IVehiclesState, TRootState>, vehicle) {
    const { documents, ...payload } = vehicle;
    return this.service.user.vehicles.updateVehicle(payload)
      .then(({ data }) => {
        const { id } = data;
        return dispatch(UPDATE_VEHICLE_DOCUMENTS, { documents, id });
      })
      .then(() => dispatch(`user/documents/${ GET_USER_DOCUMENTS }`, null, { root: true }));
  },
  [DELETE_USER_VEHICLE] ({ dispatch }: ActionContext<IVehiclesState, TRootState>, id) {
    return this.service.user.vehicles.deleteVehicle(id)
      .then(() => dispatch(`user/documents/${ GET_USER_DOCUMENTS }`, null, { root: true }));
  },
  [CREATE_VEHICLE_DOCUMENT] (ctx, { payload, id }) {
    return this.service.user.vehicles.createVehicleFile(payload, id);
  },
  [DELETE_VEHICLE_DOCUMENT] (ctx, id) {
    return this.service.user.vehicles.deleteVehicleFile(id);
  },
  async [UPDATE_VEHICLE_DOCUMENTS] ({ dispatch, state, commit }, { documents, id }) {
    const { deletedIds } = state;
    const files = await dispatch("bundleFiles", { files: documents }, { root: true });
    await Promise.all(deletedIds.map((id) => dispatch(DELETE_VEHICLE_DOCUMENT, id)));
    commit(CLEAR_DELETED_IDS);
    await Promise.all(files.map((p: any) => dispatch(CREATE_VEHICLE_DOCUMENT, { payload: p, id })));
  },
  async [STORE_USER_VEHICLES] ({ commit, dispatch }, vehicles) {
    const result: any = [];
    await Promise.all(vehicles.map(async (v: any) => {
      const documents: any = {
        sts: []
      };
      const { id, model, brand, type, number, images } = v;
      const files = await dispatch("loadFiles", images, { root: true });
      Object.assign(documents, files);
      result.push({ id, model, brand, type, number, documents });
    }));
    commit(SET_ITEMS, result.sort((a: any, b: any) => a.id - b.id)); // чтобы не скакали вкладки
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
