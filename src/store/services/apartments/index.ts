import { IServiceParkingState } from "src/store/types/parking";
import { ActionTree, Module, MutationTree } from "vuex";
import { SET_EMPTY, SET_PARKING_PLACE, SET_PARKING_PLACES } from "src/store/constants/mutation-constants";
import { TRootState } from "src/store/types/root";

const initialState = (): IServiceParkingState => {
  return {
    parkingPlaces: null,
    pickedParkingPlace: null
  };
};

const state: () => IServiceParkingState = initialState;

const mutations: MutationTree<IServiceParkingState> = {
  [SET_EMPTY]: state => Object.assign(state, initialState()),
  [SET_PARKING_PLACE]: (state, payload) => state.pickedParkingPlace = payload,
  [SET_PARKING_PLACES]: (state, payload) => state.parkingPlaces = payload
};

const actions: ActionTree<IServiceParkingState, TRootState> = {

};

const apartments: Module<IServiceParkingState, TRootState> = {
  namespaced: true,
  state,
  mutations,
  actions
};

export default apartments;
