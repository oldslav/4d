import { ActionTree, GetterTree, Module, MutationTree } from "vuex";
import { TRootState } from "src/store/types/root";
import { GET_PARKING_GEO } from "src/store/constants/action-constants";
import { SET_EMPTY, SET_FEATURE_ID, SET_GEODATA, SET_USER } from "src/store/constants/mutation-constants";
import { GeoState } from "src/store/types/common";
import { ParkingService } from "src/api/services/parking";
import parking from "src/store/services/parking";

const initialState = (): GeoState => {
  return {
    geoJson: null,
    pickedFeatureId: null
  };
};

const state: () => GeoState = initialState;

const mutations: MutationTree<GeoState> = {
  [SET_USER]: (state, payload) => Object.assign(state, payload),
  [SET_EMPTY]: state => Object.assign(state, initialState()),
  [SET_GEODATA]: (state, payload) => state.geoJson = payload,
  [SET_FEATURE_ID]: (state, payload) => state.pickedFeatureId = payload
};

const actions: ActionTree<GeoState, TRootState> = {
  async [GET_PARKING_GEO] ({ commit }) {
    const { data } = await ParkingService.getParkingGeo();
    const { type, features } = data;
    
    const preparedData = {
      type,
      features: features.map((i: any) => {
        if (!i.properties.free) {
          i.properties.fill = "#FF6565";
        } else if (i.properties.parking_places_type === "Обычное") {
          i.properties.fill = "#84D197";
        } else if (i.properties.parking_places_type === "Льготное") {
          i.properties.fill = "#298BAF";
        }
        
        Object.assign(i.properties, {
          stroke: "#333333"
        });
        
        return i;
      })
    };
    
    commit(SET_GEODATA, preparedData);
  }
};

const getters: GetterTree<GeoState, TRootState> = {
  pickedFeature (state) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return state.geoJson && state.geoJson.features.find(i => Number(i.id) === Number(state.pickedFeatureId));
  }
};

const services: Module<GeoState, TRootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
  modules: {
    parking
  }
};

export default services;
