import { IServiceParkingState } from "src/store/types/parking";
import { ActionTree, Module, MutationTree } from "vuex";
import { SET_EMPTY, SET_PARKING_PLACE, SET_PARKING_PLACES } from "src/store/constants/mutation-constants";
import { GET_PARKING_PLACES } from "src/store/constants/action-constants";
import { ParkingService } from "src/api/services/parking";
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
  async [GET_PARKING_PLACES] ({ commit, rootState }) {
    const { data } = await ParkingService.getParkingPlaces(rootState.services.pickedFeatureId as number);

    const freePlaces = data.items.filter((item: any) => item.status.id === 1);
    
    commit(SET_PARKING_PLACES, freePlaces.map((place: any) => place.id));
  }
};

const parking: Module<IServiceParkingState, TRootState> = {
  namespaced: true,
  state,
  mutations,
  actions
};

export default parking;
