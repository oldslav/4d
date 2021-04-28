import { ActionContext, ActionTree } from "vuex";
import { IRootState } from "src/store/types/root";

const API_AUTO = "https://api.auto.ria.com/categories/";

const actions: ActionTree<IRootState, IRootState> = {
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

export default { namespaced: true, actions };
