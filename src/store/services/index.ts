import { ActionTree, GetterTree, Module, MutationTree } from "vuex";
import { TRootState } from "src/store/types/root";
import {
  GET_APARTMENTS_GEO,
  GET_COMMERCE_GEO,
  GET_IDEAS_GEO,
  GET_PARKING_GEO
} from "src/store/constants/action-constants";
import {
  SET_EMPTY,
  SET_FEATURE_ID,
  SET_GEODATA,
  SET_POINT_COORDS,
  SET_USER
} from "src/store/constants/mutation-constants";
import { GeoState } from "src/store/types/common";
import parking from "src/store/services/parking";
import apartments from "src/store/services/apartments";
import vacancy from "src/store/services/vacancy";
import ideas from "src/store/services/ideas";
import commerce from "src/store/services/commerce";
import estate from "src/store/services/estate";

const initialState = (): GeoState => {
  return {
    geoJson: null,
    pickedFeatureId: null,
    pointCoords: null
  };
};

const state = initialState;

const mutations: MutationTree<GeoState> = {
  [SET_USER]: (state, payload) => Object.assign(state, payload),
  [SET_EMPTY]: state => Object.assign(state, initialState()),
  [SET_GEODATA]: (state, payload) => state.geoJson = payload,
  [SET_FEATURE_ID]: (state, payload) => state.pickedFeatureId = payload,
  [SET_POINT_COORDS]: (state, payload) => state.pointCoords = payload
};

const actions: ActionTree<GeoState, TRootState> = {
  async [GET_PARKING_GEO] ({ commit }) {
    const { data } = await this.service.services.parking.getParkingGeo();
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
  },

  async [GET_APARTMENTS_GEO] ({ commit }, ticketId) {
    // TODO: Это не гео, но здесь должен быть гео в будущем
    const { data } = await this.service.services.apartments.getBuildings({ ticketId });
    const { type, features } = data;

    const preparedData = {
      type,
      features
    };

    commit(SET_GEODATA, preparedData);
  },

  async [GET_IDEAS_GEO] ({ commit }) {
    const { data } = await this.service.services.ideas.getIdeas();
    // const { type, features } = data;

    // const preparedData = {
    //   type,
    //   features
    // };

    const preparedData = {
      type: "FeatureCollection",
      features: data.items.map(({ geometry, title, id }: any) => ({
        type: "Feature",
        geometry: {
          coordinates: [
            geometry.x,
            geometry.y
          ],
          type: "Point"
        },
        id,
        properties: {
          title
        }
      }))
    };

    commit(SET_GEODATA, preparedData);
  },

  async [GET_COMMERCE_GEO] ({ commit }) {
    const { data: { type, features } } = await this.service.services.commerce.getCommerce();
    const preparedData = {
      type,
      features
    };
    commit(SET_GEODATA, preparedData);
  }
};

const getters: GetterTree<GeoState, TRootState> = {
  pickedFeature (state) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return state.geoJson && state.geoJson.features.find(i => Number(i.id) === Number(state.pickedFeatureId));
  },
  getPickedFeatureId (state) {
    return state.pickedFeatureId;
  }
};

const services: Module<GeoState, TRootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
  modules: {
    parking,
    apartments,
    vacancy,
    ideas,
    commerce,
    estate
  }
};

export default services;
