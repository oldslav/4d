import { ActionContext, ActionTree, GetterTree, Module, MutationTree } from "vuex";
import { IRootState } from "src/store/types/root";
import { IVehicle, IVehiclesEntry, IVehiclesState } from "src/store/types/user/vehicles";
import { SET_VEHICLE_ITEM, CREATE_VEHICLE_ITEM } from "src/store/constants/mutation-constants";
import { CREATE_USER_VEHICLE, UPDATE_USER_VEHICLE, DELETE_USER_VEHICLE } from "src/store/constants/action-constants";
import { UserVehiclesService } from "../../../api/user/vehicles";

const API_AUTO = "https://api.auto.ria.com/categories/";

const replaceValues = (data: any) => {
  return data.map((item: any) => {
    const { name, value } = item;
    return {
      name,
      id: value.toString()
    };
  });
};

const state: IVehiclesState = {
  //STUB
  items: [
    {
      id: 1,
      type: {
        name: "Легковые",
        id: "1"
      },
      brand: {
        name: "Acura",
        id: "98"
      },
      model: {
        name: "EL",
        id: "30098"
      },
      number: "123",
      sts: null,
      pts: null
    },
    {
      id: 2,
      type: {
        name: "Мото",
        id: "2"
      },
      brand: {
        name: "Acxa",
        id: "2282"
      },
      model: {
        name: "ATB",
        id: "31849"
      },
      number: "777",
      sts: null,
      pts: null
    }
  ]
};

const mutations: MutationTree<IVehiclesState> = {
  [SET_VEHICLE_ITEM] (state: IVehiclesState, { payload, index }: IVehiclesEntry) {
    state.items[index] = payload;
  },
  [CREATE_VEHICLE_ITEM] (state: IVehiclesState, payload: IVehicle) {
    state.items.push(payload);
  }
};

const actions: ActionTree<IVehiclesState, IRootState> = {
  getVehicleTypes () {
    return this.$axios.get(`${ API_AUTO }`)
      .then(({ data }) => replaceValues(data));
  },
  // перенести в dictionary
  getVehicleBrands (ctx: ActionContext<IRootState, IRootState>, typeId) {
    return this.$axios.get(`${ API_AUTO }/${ typeId }/marks`)
      .then(({ data }) => replaceValues(data));
  },
  getVehicleModels (ctx: ActionContext<IRootState, IRootState>, { typeId, brandId }) {
    return this.$axios.get(`${ API_AUTO }/${ typeId }/marks/${ brandId }/models`)
      .then(({ data }) => replaceValues(data));
  },
  [CREATE_USER_VEHICLE] (ctx: ActionContext<IVehiclesState, IRootState>, vehicle) {
    const { sts, pts, ...payload } = vehicle;
    return UserVehiclesService.createVehicle(payload);
  },
  [UPDATE_USER_VEHICLE] (ctx: ActionContext<IVehiclesState, IRootState>, vehicle) {
    const { sts, pts, ...payload } = vehicle;
    return UserVehiclesService.updateVehicle(payload);
  },
  [DELETE_USER_VEHICLE] (ctx: ActionContext<IVehiclesState, IRootState>, id) {
    return UserVehiclesService.deleteVehicle(id);
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
