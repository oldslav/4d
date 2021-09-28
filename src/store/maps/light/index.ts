import Vue from "vue";
import { cloneDeep, get } from "lodash";
import { ActionTree, GetterTree, Module, MutationTree } from "vuex";
import { TRootState } from "src/store/types/root";
import { IMapMenuLayer, IMapMenuSection } from "src/store/types/maps/common";
import { IMapLightState } from "src/store/types/maps/light";
import {
  FETCH_LIGHT_MENU,
  FETCH_LIGHT_SECTION_GEOJSON,
  SET_LIGHT_LAYERS_VISIBILITY
} from "src/store/constants/action-constants";
import { SET_GEODATA } from "src/store/constants/mutation-constants";

const initialState = (): IMapLightState => ({
  menu: null,
  geoJSON: {}
});

const state = initialState;

const mutations: MutationTree<IMapLightState> = {
  setMenu (state, menu) {
    state.menu = menu;
  },
  setSectionGeoJSON (state, { section, data }) {
    Vue.set(state.geoJSON, section, data);
  }
};

const actions: ActionTree<IMapLightState, TRootState> = {
  async [FETCH_LIGHT_MENU] ({ commit }) {
    const { data: menu } = await this.service.services.light.getMapMenu();
    commit("setMenu", menu);
  },

  async [FETCH_LIGHT_SECTION_GEOJSON] ({ getters, commit, rootState }, id){
    if (!getters.getGeoJSON[id]) {
      const section = getters.getMenu.subSections.find((x: IMapMenuSection) => x.id === id);

      const awaits = section.layers.map(
        (layer: IMapMenuLayer) => this.service.services.light.getMapLayerGeoJSON(layer.path)
      );

      const layers = await Promise.all(awaits);

      const data = {
        "type": "FeatureCollection",
        "features": layers.reduce(
          (res: any[], layer: any, i) => res.concat(
            layer.features.map((feature: any) => {
              feature.properties.layer = section.layers[i].id;
              feature.properties.id = feature.id;
              feature.properties.type = "light";
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

  [SET_LIGHT_LAYERS_VISIBILITY] ({ rootState, commit }, { ids, visibility }) {
    const geoJson = cloneDeep(rootState.services.geoJson);

    for (const feature of geoJson.data.features) {
      if (ids.includes(feature.properties.layer)) {
        feature.properties.visibility = visibility;
      }
    }

    commit(`services/${ SET_GEODATA }`, geoJson, { root: true });
  }
};

const getters: GetterTree<IMapLightState, TRootState> = {
  getMenu (state){
     return state.menu;
  },
  getGeoJSON (state){
    return state.geoJSON;
  }
};

const light: Module<IMapLightState, TRootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};

export default light;
