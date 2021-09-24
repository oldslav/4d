import Vue from "vue";
import { ActionTree, GetterTree, Module, MutationTree } from "vuex";
import { cloneDeep, get } from "lodash";
import { TRootState } from "src/store/types/root";
import { IMapTransportState } from "src/store/types/maps/transport";
import { IMapMenuLayer, IMapMenuSection } from "src/store/types/maps/common";

import {
  FETCH_TRANSPORT_ITEM,
  FETCH_TRANSPORT_MENU,
  FETCH_TRANSPORT_SECTION_GEOJSON,
  REMOVE_ACTIVE_TRANSPORT_ITEM,
  SET_ACTIVE_TRANSPORT_ITEM,
  TOGGLE_TRANSPORT_VISIBILITY_BY_LAYER
} from "src/store/constants/action-constants";
import { SET_GEODATA } from "src/store/constants/mutation-constants";

const initialState = (): IMapTransportState => ({
  menu: null,
  feature: null,
  geoJSON: {}
});

const state = initialState;

const mutations: MutationTree<IMapTransportState> = {
  setMenu (state, menu) {
    state.menu = menu;
  },
  setGeoJson (state, { section, data }) {
    Vue.set(state.geoJSON, section, data);
  },
  setFeature (state, feature){
    feature.geometry = undefined;
    state.feature = feature;
  }
};

const actions: ActionTree<IMapTransportState, TRootState> = {
  async [FETCH_TRANSPORT_MENU] ({ commit }) {
    const { data } = await this.service.services.transport.getMapMenu();

    commit("setMenu", data);
  },

  async [FETCH_TRANSPORT_ITEM] ({ commit, getters }, { layerId, id }) {
    const layer = getters.getLayerById(layerId);
    const { data } = await this.service.services.transport.getFeature(layer.path, id);

    commit("setFeature", data);
  },

  async [FETCH_TRANSPORT_SECTION_GEOJSON] ({ getters, commit, rootState }, id) {
    if (!getters.getGeoJSON[id]) {
      const section = getters.getMenu.subSections.find((x: IMapMenuSection) => x.id === id);

      const awaits = section.layers.map(
        (layer: IMapMenuLayer) => this.service.services.buildings.getLayerGeoJSON(layer.path)
      );

      const layers = await Promise.all(awaits);

      const data = {
        "type": "FeatureCollection",
        "features": layers.reduce(
          (res: any[], layer: any, i) => res.concat(
            layer.features.map((feature: any) => {
              feature.properties.layer = section.layers[i].id;
              feature.properties.type = "transport";
              feature.properties.id = feature.id;
              feature.id = `${ section.layers[i].id }-${ feature.id }`;
              return feature;
            })
          ),
          []
        )
      };

      commit("setGeoJson", { section: id, data });
    }

    const sectionId = get(rootState.services.geoJson, "sectionId", null);

    if (sectionId !== id) {
      commit(`services/${ SET_GEODATA }`, { type: "geoJson", data: getters.getGeoJSON[id], sectionId: id }, { root: true });
    }
  },

  async [TOGGLE_TRANSPORT_VISIBILITY_BY_LAYER] ({ rootState, commit }, { ids, visibility }) {
    const geoJson = cloneDeep(rootState.services.geoJson);
    const idsSet = new Set(ids);

    for (const feature of geoJson.data.features) {
      if (idsSet.has(feature.properties.layer)) {
        feature.properties.visibility = visibility;
      }
    }

    commit(`services/${ SET_GEODATA }`, geoJson, { root: true });
  },

  async [SET_ACTIVE_TRANSPORT_ITEM] ({ rootState, commit }, id) {
    const geoJson = cloneDeep(rootState.services.geoJson);

    for (const feature of geoJson.data.features) {
      if (feature.id === id) {
        feature.properties.active = true;
        feature.properties.extended = true;
      } else {
        feature.properties.active = false;
        feature.properties.extended = false;
      }
    }

    commit(`services/${ SET_GEODATA }`, geoJson, { root: true });
  },

  async [REMOVE_ACTIVE_TRANSPORT_ITEM] ({ rootState, commit }) {
    const geoJson = cloneDeep(rootState.services.geoJson);

    for (const feature of geoJson.data.features) {
      feature.properties.active = true;
      feature.properties.extended = false;
    }

    commit(`services/${ SET_GEODATA }`, geoJson, { root: true });
  }
};

const getters: GetterTree<IMapTransportState, TRootState> = {
  getMenu: (state: IMapTransportState) => state.menu,
  getFeature: (state: IMapTransportState) => state.feature,
  getGeoJSON: (state: IMapTransportState) => state.geoJSON,
  getLayerById: (state: IMapTransportState) => (id: number) => {
    const subSections = state.menu ? state.menu.subSections : [];

    const layers = subSections.reduce(
      (res, section) => res.concat(section.layers),
      [] as IMapMenuLayer[]
    );

    return layers.find(x => x.id === id);
  },
  getSectionByLayerId: (state: IMapTransportState) => (id: number) => {
    const subSections = state.menu ? state.menu.subSections : [];

    return subSections.find(
      subSection => subSection.layers.find(x => x.id === id)
    );
  }
};

const transport: Module<IMapTransportState, TRootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};

export default transport;
