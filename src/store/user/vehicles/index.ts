import { ActionContext, ActionTree, Module } from "vuex";
import { IDocumentsState } from "src/store/types/documents";
import { IRootState } from "src/store/types/root";
import { IVehiclesState } from "src/store/types/vehicles";

const API_AUTO = "https://api.auto.ria.com/categories/";

const state: IVehiclesState = {
  type: null,
  brand: null,
  model: null,
  plates: null,
  documents: {
    sts: null,
    pts: null
  }
};

const actions: ActionTree<IDocumentsState, IRootState> = {
  getVehicleTypes (ctx: ActionContext<IRootState, IRootState>) {
    return this.$axios.get(`${ API_AUTO }`);
  },
  getVehicleBrands (ctx: ActionContext<IRootState, IRootState>, typeId) {
    return this.$axios.get(`${ API_AUTO }/${ typeId }/marks`);
  },
  getVehicleModels (ctx: ActionContext<IRootState, IRootState>, { typeId, brandId }) {
    return this.$axios.get(`${ API_AUTO }/${ typeId }/marks/${ brandId }/models`);
  }
};

const vehiclesModule: Module<any, IRootState> = {
  namespaced: true,
  actions,
  state
};

export default vehiclesModule;
