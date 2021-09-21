import { cloneDeep } from "lodash";
import { ActionTree, GetterTree, Module, MutationTree } from "vuex";
import { TRootState } from "src/store/types/root";
import { IMapEngineeringState } from "src/store/types/maps/engineering";
import {
  FETCH_ENGINEERING_MENU,
  FETCH_ENGINEERING_SECTION_GEOJSON,
  TOGGLE_ENGINEERING_VISIBILITY_BY_LAYER,
  SET_ACTIVE_ENGINEERING_ITEM,
  REMOVE_ACTIVE_ENGINEERING_ITEM,
  FETCH_ENGINEERING_ITEM
} from "src/store/constants/action-constants";
import { IMapMenuLayer, IMapMenuSection } from "src/store/types/maps/common";
import { SET_GEODATA } from "src/store/constants/mutation-constants";
import Vue from "vue";

const initialState = (): IMapEngineeringState => ({
  menu: null,
  geoJSON: {},
  currentSectionId: null,
  feature: null
});

const state = initialState;

const mutations: MutationTree<IMapEngineeringState> = {
  setMenu (state, menu){
    state.menu = menu;
  },
  setSectionGeoJSON (state, { section, data }) {
    Vue.set(state.geoJSON, section, data);
  },
  setCurrentSectionId (state, val) {
    state.currentSectionId = val;
  },
  setFeature (state, feature) {
    state.feature = feature;
  }
};

const actions: ActionTree<IMapEngineeringState, TRootState> = {
  async [FETCH_ENGINEERING_MENU] ({ commit }) {
    const { data: menu } = await this.service.services.engineering.getMenu();
    commit("setMenu", menu);
  },

  async [FETCH_ENGINEERING_SECTION_GEOJSON] ({ state, getters, commit }, id) {
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
              feature.id = `${ feature.id }_${ section.layers[i].id }`;
              return feature;
            })
          ),
          []
        )
      };

      commit("setSectionGeoJSON", { section: id, data });
    }

    if (state.currentSectionId !== id) {
      commit(`services/${ SET_GEODATA }`, { type: "geoJson", data: getters.getGeoJSON[id] }, { root: true });
      commit("setCurrentSectionId", id);
    }
  },

  async [TOGGLE_ENGINEERING_VISIBILITY_BY_LAYER] ({ rootState, commit }, { ids, visibility }) {
    const geoJson = cloneDeep(rootState.services.geoJson.data);
    const idsSet = new Set(ids);

    for (const feature of geoJson.features) {
      if (idsSet.has(feature.properties.layer)) {
        feature.properties.visibility = visibility;
      }
    }

    commit(`services/${ SET_GEODATA }`, { type: "geoJson", data: geoJson }, { root: true });
  },

  [SET_ACTIVE_ENGINEERING_ITEM] ({ rootState, commit }, id) {
    const geoJson = cloneDeep(rootState.services.geoJson.data);

    for (const feature of geoJson.features) {
      if (feature.id === id) {
        feature.properties.active = true;
        feature.properties.extended = true;
      } else {
        feature.properties.active = false;
        feature.properties.extended = false;
      }
    }

    commit(`services/${ SET_GEODATA }`, { type: "geoJson", data: geoJson }, { root: true });
  },

  [REMOVE_ACTIVE_ENGINEERING_ITEM] ({ rootState, commit }) {
    const geoJson = cloneDeep(rootState.services.geoJson.data);

    for (const feature of geoJson.features) {
      feature.properties.active = true;
      feature.properties.extended = false;
    }

    commit(`services/${ SET_GEODATA }`, { type: "geoJson", data: geoJson }, { root: true });
  },

  async [FETCH_ENGINEERING_ITEM] ({ commit, getters }, { layerId, id }) {
    const layer = getters.getLayerById(layerId);
    const { data } = await this.service.services.engineering.getFeature(layer.path, id);

    commit("setFeature", data);
  }
};

const getters: GetterTree<IMapEngineeringState, TRootState> = {
  getMenu (state: IMapEngineeringState) {
    return state.menu;
  },

  getGeoJSON (state: IMapEngineeringState) {
    return state.geoJSON;
  },

  getLayerById: (state: IMapEngineeringState) => (id: number) => {
    const subSections = state.menu ? state.menu.subSections : [];

    const layers = subSections.reduce(
      (res, section) => res.concat(section.layers),
      [] as IMapMenuLayer[]
    );

    return layers.find(x => x.id === id);
  },

  getSectionByLayerId: (state: IMapEngineeringState) => (id: number) => {
    const subSections = state.menu ? state.menu.subSections : [];

    return subSections.find(
      subSection => subSection.layers.find(x => x.id === id)
    );
  },

  getFeature (state){
    return state.feature;
  }
};

const engineering: Module<IMapEngineeringState, TRootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};

export default engineering;
