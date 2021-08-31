import { ActionTree, GetterTree, Module, MutationTree } from "vuex";
import { TRootState } from "src/store/types/root";
import {
  GET_APARTMENTS_GEO,
  GET_COMMERCE_GEO,
  GET_IDEAS_GEO,
  GET_PARKING_GEO
} from "src/store/constants/action-constants";
import {
  SET_CESIUM, SET_CLUSTERING,
  SET_DRAW_TYPE,
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
import tourism from "src/store/services/tourism";

const initialState = (): GeoState => {
  return {
    geoJson: null,
    pickedFeatureId: null,
    pointCoords: null,
    isDraw: null,
    cesiumInstance: null,
    clustering: true
  };
};

const state = initialState;

const mutations: MutationTree<GeoState> = {
  [SET_USER]: (state, payload) => Object.assign(state, payload),
  [SET_EMPTY]: state => Object.assign(state, initialState()),
  [SET_GEODATA]: (state, payload) => state.geoJson = payload,
  [SET_FEATURE_ID]: (state, payload) => state.pickedFeatureId = payload,
  [SET_POINT_COORDS]: (state, payload) => state.pointCoords = payload,
  [SET_DRAW_TYPE]: (state, payload) => state.isDraw = payload,
  [SET_CESIUM]: (state, payload) => state.cesiumInstance = payload,
  [SET_CLUSTERING]: (state, payload) => state.clustering = payload
};

const actions: ActionTree<GeoState, TRootState> = {
  async [GET_PARKING_GEO] ({ commit }) {
    const { data } = await this.service.services.parking.getParkingGeo();
    const { type, features } = data;

    const preparedData = {
      data: {
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
      },
      type: "geoJson"
    };

    commit(SET_GEODATA, preparedData);
  },

  async [GET_APARTMENTS_GEO] ({ commit }, ticketId) {
    // TODO: Это не гео, но здесь должен быть гео в будущем
    const { data } = await this.service.services.apartments.getBuildings({ ticketId });
    const { type, features } = data;

    const preparedData = {
      data: {
        type,
        features
      },
      type: "geoJson"
    };

    commit(SET_GEODATA, preparedData);
  },

  async [GET_IDEAS_GEO] ({ state, commit }) {
    const { data } = await this.service.services.ideas.getIdeas({
      limit: 1000,
      offset: 0
    });

    type Colors = {
      [key in string | number]: any;
    };

    const colors: Colors = {
      1: "#84D197",
      2: "#FF6565"
    };

    const preparedData = {
      data: data.items.map((item: any) => ({
        show: true,
        position: state.cesiumInstance.Cartesian3.fromDegrees(item.geometry.x, item.geometry.y, 0),
        color: colors[item.type.id],
        scaleByDistance: new state.cesiumInstance.NearFarScalar(1, 5, 3000, 1),
        heightReference : state.cesiumInstance.HeightReference.RELATIVE_TO_GROUND,
        ...item
      })),
      type: "pointPrimitive"
    };

    commit(SET_GEODATA, preparedData);
  },

  async [GET_COMMERCE_GEO] ({ commit }) {
    const { data: { type, features } } = await this.service.services.commerce.getCommerce();

    const preparedData = {
      data: {
        type,
        features
      },
      type: "geoJson"
    };

    commit(SET_GEODATA, preparedData);
  }
};

const getters: GetterTree<GeoState, TRootState> = {
  pickedFeature (state) {
    if (state.geoJson) {
      switch (state.geoJson.type) {
        case "geoJson":
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          return state.geoJson.data.features.find((i: any) => Number(i.id) === Number(state.pickedFeatureId));
        case "pointPrimitive":
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          return state.geoJson.data.find((i: any) => Number(i.id) === Number(state.pickedFeatureId));
      }
    }
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
    estate,
    tourism
  }
};

export default services;
