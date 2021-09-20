import { IServiceParkingState } from "src/store/types/parking";
import { ActionTree, GetterTree, Module, MutationTree } from "vuex";
import {
  SET_EMPTY,
  SET_PARKING_INFO,
  SET_PARKING_PLACE,
  SET_PARKING_PLACES
} from "src/store/constants/mutation-constants";
import { GET_PARKING_INFO, GET_PARKING_PLACES } from "src/store/constants/action-constants";
import { TRootState } from "src/store/types/root";

const initialState = (): IServiceParkingState => {
  return {
    parkingPlaces: null,
    pickedParkingPlace: null,
    parkingInfo: null
  };
};

const state = initialState;

const mutations: MutationTree<IServiceParkingState> = {
  [SET_EMPTY]: state => Object.assign(state, initialState()),
  [SET_PARKING_PLACE]: (state, payload) => state.pickedParkingPlace = payload,
  [SET_PARKING_PLACES]: (state, payload) => state.parkingPlaces = payload,
  [SET_PARKING_INFO]: (state, payload) => state.parkingInfo = payload
};

const actions: ActionTree<IServiceParkingState, TRootState> = {
  async [GET_PARKING_PLACES] ({ commit, rootState }) {
    const { data } = await this.service.services.parking.getParkingPlaces(rootState.services.pickedFeatureId as number);

    // const freePlaces = data.items.filter((item: any) => item.status.id === 1);
    const freePlaces = data.items;

    // commit(SET_PARKING_PLACES, freePlaces.map((place: any) => place.id));
    commit(SET_PARKING_PLACES, freePlaces);
  },

  async [GET_PARKING_INFO] ({ commit }, id: number) {
    const { data } = await this.service.services.parking.getParkingDetails(id);

    commit(SET_PARKING_INFO, data);
  }
};

const getters: GetterTree<IServiceParkingState, TRootState> = {
  getParkingInfo: (state) => state.parkingInfo
};

const parking: Module<IServiceParkingState, TRootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};

export default parking;
