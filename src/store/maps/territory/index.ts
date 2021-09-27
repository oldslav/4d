import Vue from "vue";
import { cloneDeep, get } from "lodash";

import { ActionTree, GetterTree, Module, MutationTree } from "vuex";
import { TRootState } from "src/store/types/root";
import { IMapSecurityState } from "src/store/types/maps/security";
import { FETCH_TERRITORY_MENU, FETCH_TERRITORY_SECTION_GEOJSON } from "src/store/constants/action-constants";
import { SET_GEODATA, SET_TERRITORY_LAYERS_VISIBILITY } from "src/store/constants/mutation-constants";
import { IMapMenuLayer, IMapMenuSection } from "src/store/types/maps/common";
import { IMapTerritoryState } from "src/store/types/maps/territory";

const initialState = (): IMapTerritoryState => ({
  menu: null,
  geoJSON: {}
});

const state = initialState;

const mutations: MutationTree<IMapTerritoryState> = {
  setMenu (state, menu) {
    state.menu = menu;
  },
  setSectionGeoJSON (state, { section, data }) {
    Vue.set(state.geoJSON, section, data);
  }
};

const actions: ActionTree<IMapTerritoryState, TRootState> = {
  async [FETCH_TERRITORY_MENU] ({ commit }) {
    const { data: menu } = await this.service.services.territory.getMapMenu();
    commit("setMenu", menu);
  },

  async [FETCH_TERRITORY_SECTION_GEOJSON] ({ getters, commit, rootState }, id){
    if (!getters.getGeoJSON[id]) {
      const section = getters.getMenu.subSections.find((x: IMapMenuSection) => x.id === id);

      const awaits = section.layers.map(
        (layer: IMapMenuLayer) => this.service.services.engineering.getLayerGeoJSON(layer.path)
      );

      const layers = await Promise.all(awaits);

      const data = {
        "type": "FeatureCollection",
        "features": layers.reduce(
          (res: any[], layer: any, i) => res.concat(
            layer.features.map((feature: any) => {
              feature.properties.layer = section.layers[i].id;
              feature.properties.id = feature.id;
              feature.properties.type = feature.properties.type || "territory-feature";
              return feature;
            })
          ),
          []
        )
      };

      commit("setSectionGeoJSON", { section: id, data });
    }

    const geoJson = cloneDeep(rootState.services.geoJson);
    const currentId = get(geoJson,"section", null);

    if (currentId !== id) {
      commit(`services/${ SET_GEODATA }`, { type: "geoJson", data: getters.getGeoJSON[id], section: id }, { root: true });
    }
  },

  [SET_TERRITORY_LAYERS_VISIBILITY] ({ rootState, commit }, { ids, visibility }) {
    const geoJson = cloneDeep(rootState.services.geoJson);

    for (const feature of geoJson.data.features) {
      if (ids.includes(feature.properties.layer)) {
        feature.properties.visibility = visibility;
      }
    }

    commit(`services/${ SET_GEODATA }`, geoJson, { root: true });
  }
};

const getters: GetterTree<IMapSecurityState, TRootState> = {
  getMenu (state){
     return state.menu;
  },
  getGeoJSON (state){
    return state.geoJSON;
  }
};

const territory: Module<IMapSecurityState, TRootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};

export default territory;
