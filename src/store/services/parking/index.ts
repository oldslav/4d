import { ActionTree, Module, MutationTree } from "vuex";
import { IRootState } from "src/store/types/root";
import { GET_PARKING_GEO } from "src/store/constants/action-constants";
import { SET_EMPTY, SET_GEODATA, SET_USER } from "src/store/constants/mutation-constants";
import { IParkingGeoState } from "src/store/types/parking";
import { ParkingGeoService } from "src/api/services/parking";

const initialState = (): IParkingGeoState => {
  return {
    geoJson: null
  };
};

const state: () => IParkingGeoState = initialState;

const mutations: MutationTree<IParkingGeoState> = {
  [SET_USER]: (state, payload) => Object.assign(state, payload),
  [SET_EMPTY]: state => Object.assign(state, initialState()),
  [SET_GEODATA]: (state, payload) => state.geoJson = payload
};

const actions: ActionTree<IParkingGeoState, IRootState> = {
  async [GET_PARKING_GEO] ({ commit }) {
    const { data } = await ParkingGeoService.getParkingGeo();
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

const parking: Module<IParkingGeoState, IRootState> = {
  namespaced: true,
  state,
  mutations,
  actions
};

export default parking;
