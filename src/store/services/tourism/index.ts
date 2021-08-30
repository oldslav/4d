import { ActionTree, GetterTree, Module, MutationTree } from "vuex";
import { cloneDeep } from "lodash";

import { TRootState } from "src/store/types/root";
import {
  FETCH_TOURISM_MENU,
  FETCH_LAYER_GEOJSON,
  FETCH_TOURISM_ENTITY,
  OFFER_TOURISM_ROUTE,
  SET_ACTIVE_TOURISM_FEATURE,
  REMOVE_ACTIVE_TOURISM_FEATURE,
  PUT_LAYER_GEOJSON
} from "src/store/constants/action-constants";
import {
  SET_GEODATA,
  SET_TOURISM_MENU,
  SET_LAYER_GEOJSON,
  SET_TOURISM_ENTITY,
  SET_TOURISM_CURRENT_LAYER
} from "src/store/constants/mutation-constants";

import { IOfferRouteParams, IServicesTourismState, TourismGeoJSONEntities } from "../../types/tourism";

const initialState = (): IServicesTourismState => ({
  serviceMenu: null,
  layersGeoJSON: {},
  currentGeoJSONLayer: null,
  entity: null
});

const state = initialState;

const mutations: MutationTree<IServicesTourismState> = {
  [SET_TOURISM_MENU] (state, menu) {
    state.serviceMenu = menu;
  },
  [SET_LAYER_GEOJSON] (state, { path, geoJson }) {
    state.layersGeoJSON[path] = geoJson;
  },
  [SET_TOURISM_ENTITY] (state, entity) {
    state.entity = entity;
  },
  [SET_TOURISM_CURRENT_LAYER] (state, currentLayer) {
    state.currentGeoJSONLayer = currentLayer;
  }
};

// Private methods
const findFeature = (geoJson: any, id: number) => {
  const data = geoJson || {};
  // eslint-disable-next-line eqeqeq
  return (data.features || []).find((x: { id:number }) => x.id == id);
};

const eachFeatures = (geoJson: any, cb: (e: any) => void) => {
  const data = geoJson || {};
  return (data.features || []).forEach(cb);
};

const setActiveEntity = (geoJson: any, id: string) => {
  eachFeatures(geoJson, (entity: any) => {
    // eslint-disable-next-line eqeqeq
    if (entity.id == id) {
      entity.properties.$extended = true;
      // eslint-disable-next-line eqeqeq
    } else if (entity.properties.type === TourismGeoJSONEntities.stop && entity.properties.routeId == id) {
      entity.properties.$visible = true;
    } else {
      entity.properties.$visible = false;
    }
  });
};

const removeActiveEntity = (geoJson: any, id: string) => {
  eachFeatures(geoJson, (entity: any) => {
    // eslint-disable-next-line eqeqeq
    if (entity.id == id) {
      entity.properties.$extended = false;
    } else if (entity.properties.type === TourismGeoJSONEntities.stop) {
      entity.properties.$visible = false;
    } else {
      entity.properties.$visible = true;
    }
  });
};

const setActivePlace = (geoJson: any, id: string) => {
  eachFeatures(geoJson, (entity: any) => {
    // eslint-disable-next-line eqeqeq
    const isTarget = entity.id == id;
    entity.properties.$extended = isTarget;
    entity.properties.$foreground = !isTarget;
  });
};

const removeActivePlace = (geoJson: any) => {
  eachFeatures(geoJson, (entity: any) => {
    entity.properties.$extended = false;
    entity.properties.$foreground = false;
  });
};

const actions: ActionTree<IServicesTourismState, TRootState> = {
  async [FETCH_TOURISM_MENU] ({ commit }) {
    const { data } = await this.service.services.tourism.getMenu();
    commit(SET_TOURISM_MENU, data);
  },

  async [FETCH_LAYER_GEOJSON] ({ commit, getters }, path) {

    if (!getters.getLayersGeoJSON[path]) {
      const geoJson = await this.service.services.tourism.getGeoJSONByPath(path);
      commit(SET_LAYER_GEOJSON, { path, geoJson });
    }

    return getters.getLayersGeoJSON[path];
  },

  async [FETCH_TOURISM_ENTITY] ({ commit }, { path, layerId, id }) {
    const isRoutes = path.includes("route");

    const { data } = await (
      isRoutes ?
        this.service.services.tourism.getRoute :
        this.service.services.tourism.getPlace
    ).call(this.service.services.tourism, layerId, id);

    commit(SET_TOURISM_ENTITY, data);
  },

  async [OFFER_TOURISM_ROUTE] (ctx, payload: IOfferRouteParams) {
    const { description } = payload;

    const { data: route } = await this.service.services.tourism.offerRoute(description);

    try {
      const awaits = payload.images.map(
        image => this.service.services.tourism.uploadRouteFile(route.id, image, true)
      );

      awaits.push(
        this.service.services.tourism.uploadRouteFile(route.id, payload.route, false)
      );

      await Promise.all(awaits);
    } catch (e) {
      // Do nothing
    }

    return route;
  },

  [PUT_LAYER_GEOJSON] ({ commit, getters }, path) {
    if (getters.getCurrentGeoJsonLayer !== path) {
      const geoJSON = getters.getLayersGeoJSON[path];

      commit(`services/${ SET_GEODATA }`, geoJSON ? { type: "geoJson", data: geoJSON } : null, { root: true });
      commit(SET_TOURISM_CURRENT_LAYER, path);
    }
  },

  [SET_ACTIVE_TOURISM_FEATURE] ({ commit, getters }, { layer, id }) {
    const geoJson = cloneDeep(getters.getLayersGeoJSON[layer]);
    const feature = findFeature(geoJson, id);

    if (feature.properties.type === TourismGeoJSONEntities.place) {
      setActivePlace(geoJson, id);
    } else {
      setActiveEntity(geoJson, id);
    }

    commit(`services/${ SET_GEODATA }`, { type: "geoJson", data: geoJson }, { root: true });
  },

  [REMOVE_ACTIVE_TOURISM_FEATURE] ({ commit, getters }, { id, layer }) {
    const geoJson = cloneDeep(getters.getLayersGeoJSON[layer]);
    const feature = findFeature(geoJson, id);

    if (feature.properties.type === TourismGeoJSONEntities.place) {
      removeActivePlace(geoJson);
    } else {
      removeActiveEntity(geoJson, id);
    }

    commit(`services/${ SET_GEODATA }`, { type: "geoJson", data: geoJson }, { root: true });
  }
};

const getters: GetterTree<IServicesTourismState, TRootState> = {
  getServiceMenu (state) {
    return state.serviceMenu;
  },

  getLayersGeoJSON (state) {
    return state.layersGeoJSON;
  },

  getCurrentGeoJsonLayer (state) {
    return state.currentGeoJSONLayer;
  },

  getEntity (state) {
    return state.entity;
  }
};

const tourism: Module<IServicesTourismState, TRootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};

export default tourism;
