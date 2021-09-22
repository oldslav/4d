import { ActionTree, GetterTree, Module, MutationTree } from "vuex";
import { TRootState } from "src/store/types/root";
import {
  GET_APARTMENTS_GEO,
  GET_COMMERCE_GEO,
  GET_IDEAS_GEO, GET_LIGHT_GEO,
  GET_PARKING_GEO,
  GET_TREES_GEO, GET_WAREHOUSE_GEO,
  TOGGLE_VISIBILITY_BY_LAYER
} from "src/store/constants/action-constants";
import {
  SET_CLUSTERING,
  SET_DRAW_TYPE,
  SET_EMPTY,
  SET_FEATURE_ID,
  SET_CESIUM,
  SET_GEODATA,
  SET_POINT_COORDS,
  SET_USER, SET_MAP_ENTITY_DISTANCE
} from "src/store/constants/mutation-constants";
import { GeoState } from "src/store/types/common";
import parking from "src/store/services/parking";
import apartments from "src/store/services/apartments";
import vacancy from "src/store/services/vacancy";
import trees from "src/store/services/trees";
import light from "src/store/services/light";
import ideas from "src/store/services/ideas";
import commerce from "src/store/services/commerce";
import estate from "src/store/services/estate";
import tourism from "src/store/services/tourism";
import warehouse from "src/store/services/warehouse";
import { cloneDeep } from "lodash";

const initialState = (): GeoState => {
  return {
    geoJson: null,
    pickedFeatureId: null,
    pointCoords: null,
    isDraw: null,
    cesiumInstance: null,
    clustering: true,
    entityDistance: null
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
  [SET_CLUSTERING]: (state, payload) => state.clustering = payload,
  [SET_MAP_ENTITY_DISTANCE]: (state, distance) => state.entityDistance = distance || 1000
};

const actions: ActionTree<GeoState, TRootState> = {
  async [GET_PARKING_GEO] ({ commit }) {
    const { data } = await this.service.services.parking.getParkingGeo();
    const { type, features } = data;

    const preparedData = {
      data: {
        type,
        features: features.map((i: any) => {
          if (i.properties.parking_places_type === "Обычное") {
            i.properties.layer = 1;
            i.properties.fill = "#84D197";
            if (!i.properties.free) {
              i.properties.layer = 3;
              i.properties.fill = "#FF6565";
            }
          } else if (i.properties.parking_places_type === "Льготное") {
            i.properties.layer = 2;
            i.properties.fill = "#298BAF";
            if (!i.properties.free) {
              i.properties.layer = 3;
              i.properties.fill = "#FF6565";
            }
          }

          i.properties.visibility = true;
          i.properties.type = "building";

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

  async [GET_IDEAS_GEO] ({ commit }) {
    // const { data } = await this.service.services.ideas.getIdeas({
    //   limit: 1000,
    //   offset: 0
    // });
    //
    // type Colors = {
    //   [key in string | number]: any;
    // };
    //
    // const colors: Colors = {
    //   1: "#84D197",
    //   2: "#FF6565"
    // };
    //
    // const preparedData = {
    //   data: data.items.map((item: any) => ({
    //     show: true,
    //     position: state.cesiumInstance.Cartesian3.fromDegrees(item.geometry.x, item.geometry.y, 0),
    //     color: colors[item.type.id],
    //     scaleByDistance: new state.cesiumInstance.NearFarScalar(1, 5, 3000, 1),
    //     heightReference: state.cesiumInstance.HeightReference.RELATIVE_TO_GROUND,
    //     ...item
    //   })),
    //   type: "pointPrimitive"
    // };

    const { data: { type, features } } = await this.service.services.ideas.getIdeasGeo();

    const preparedData = {
      data: {
        type,
        features: features.map((i: any) => ({
          ...i,
          properties: {
            ...i.properties,
            // TODO: Исправить ужас ниже
            image: i.properties.fill === "#FF6565" ? require("@/assets/png/problem.png") : require("@/assets/png/idea.png")
          }
        }))
      },
      type: "geoJson"
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
  },

  async [GET_WAREHOUSE_GEO] ({ commit }) {
    const { data: { type, features } } = await this.service.services.warehouse.getWarehouse();

    const preparedData = {
      data: {
        type,
        features
      },
      type: "geoJson"
    };
    // Временно по просьбе Саши, пока здание одно
    const { id } = preparedData.data.features[0];
    commit(SET_FEATURE_ID, id);
    commit(SET_GEODATA, preparedData);
  },

  async [GET_TREES_GEO] ({ state, commit }, coordinates) {
    const payload = coordinates ? coordinates : null;
    const { data } = await this.service.services.trees.getTrees(payload);
    const { features } = data;

    const preparedData = {
      data: features.map((item: any) => ({
        show: true,
        position: state.cesiumInstance.Cartesian3.fromDegrees(item.geometry.coordinates[0], item.geometry.coordinates[1], 0),
        color: "#84D197",
        pixelSize: 4,
        scaleByDistance: new state.cesiumInstance.NearFarScalar(1, 5, 3000, 1),
        heightReference: state.cesiumInstance.HeightReference.RELATIVE_TO_GROUND,
        ...item
      })),
      type: "pointPrimitive"
    };

    commit(SET_GEODATA, preparedData);
  },

  async [GET_LIGHT_GEO] ({ state, commit }, coordinates) {
    const payload = coordinates ? coordinates : null;
    const { data } = await this.service.services.light.getLightGeo(payload);
    const { features } = data;

    const preparedData = {
      data: features.map((item: any) => ({
        show: true,
        position: state.cesiumInstance.Cartesian3.fromDegrees(item.geometry.coordinates[0], item.geometry.coordinates[1], 0),
        color: "#84D197",
        pixelSize: 4,
        scaleByDistance: new state.cesiumInstance.NearFarScalar(1, 5, 3000, 1),
        heightReference: state.cesiumInstance.HeightReference.RELATIVE_TO_GROUND,
        ...item
      })),
      type: "pointPrimitive"
    };

    commit(SET_GEODATA, preparedData);
  },

  [TOGGLE_VISIBILITY_BY_LAYER] ({ state, commit }, { ids, visibility }) {
    if (state.geoJson) {
      const geoJson = cloneDeep(state.geoJson.data);

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      for (const feature of geoJson.features) {
        if (ids.includes(feature.properties.layer)) {
          feature.properties.visibility = visibility;
        }
      }

      commit(SET_GEODATA, { type: "geoJson", data: geoJson });
    }
  }
};

const getters: GetterTree<GeoState, TRootState> = {
  pickedFeature (state) {
    const pickedFeatureId = state.pickedFeatureId;
    const geoJson = state.geoJson;

    if (geoJson) {
      switch (geoJson.type) {
        case "geoJson":
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          // eslint-disable-next-line eqeqeq
          return geoJson.data.features.find((i: any) => i.id == pickedFeatureId);
        case "pointPrimitive":
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          // eslint-disable-next-line eqeqeq
          return geoJson.data.find((i: any) => i.id == pickedFeatureId);
      }
    }
  },
  getPickedFeatureId (state) {
    return state.pickedFeatureId;
  },
  getCesium (state) {
    return state.cesiumInstance;
  },
  getGeoJson (state) {
    return state.geoJson;
  },
  getEntityDistance (state) {
    return state.entityDistance;
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
    tourism,
    trees,
    light,
    warehouse
  }
};

export default services;
