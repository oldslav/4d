import Vue from "vue";
import { cloneDeep } from "lodash";
import { ActionTree, GetterTree, Module, MutationTree } from "vuex";
import { TRootState } from "src/store/types/root";
import {
  FETCH_BUILDINGS_BUILDING,
  FETCH_BUILDINGS_MENU,
  FETCH_BUILDINGS_SECTION_GEOJSON,
  SET_ACTIVE_BUILDING,
  SET_BUILDINGS_SECTION_GEOJSON,
  TOGGLE_BUILDINGS_VISIBILITY_BY_LAYER,
  REMOVE_ACTIVE_BUILDING
} from "src/store/constants/action-constants";
import {
  SET_BUILDINGS_MENU,
  SET_BUILDINGS_GEOJSON,
  SET_BUILDINGS_MAP_BUILDING,
  SET_GEODATA
} from "src/store/constants/mutation-constants";
import { IMapMenuLayer, IMapMenuSection } from "src/store/types/maps/common";
import { IMapBuildingsState } from "src/store/types/maps/buildings";

const initialState = (): IMapBuildingsState => ({
  menu: null,
  geoJSON: {},
  building: null
});

const state = initialState;

const mutations: MutationTree<IMapBuildingsState> = {
  [SET_BUILDINGS_MENU] (state, menu) {
    state.menu = menu;
  },
  [SET_BUILDINGS_GEOJSON] (state, { section, data }) {
    Vue.set(state.geoJSON, section, data);
  },
  [SET_BUILDINGS_MAP_BUILDING] (state, data) {
    state.building = data;
  }
};

const actions: ActionTree<IMapBuildingsState, TRootState> = {
  async [FETCH_BUILDINGS_MENU] ({ commit }) {
    const { data } = await this.service.services.buildings.getMapMenu();

    commit(SET_BUILDINGS_MENU, data);
  },

  async [FETCH_BUILDINGS_SECTION_GEOJSON] ({ getters, commit }, id) {
    if (getters.getGeoJSON[id]) {
      return;
    }

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
            return feature;
          })
        ),
        []
      )
    };

    commit(SET_BUILDINGS_GEOJSON, { section: id, data });
  },

  async [FETCH_BUILDINGS_BUILDING] ({ getters, commit }, { layerId, id }) {
    const layer = getters.getLayerById(layerId);

    const { data } = await this.service.services.buildings.getBuilding(layer.path, id);

    commit(SET_BUILDINGS_MAP_BUILDING, { ...data, sectionId: getters.getSectionByLayerId(layer.id).id });
  },

  async [SET_BUILDINGS_SECTION_GEOJSON] ({ getters, commit }, id) {
    const geoJson = getters.getGeoJSON[id];

    commit(`services/${ SET_GEODATA }`, { type: "geoJson", data: geoJson }, { root: true });
  },

  async [TOGGLE_BUILDINGS_VISIBILITY_BY_LAYER] ({ rootState, commit }, { id, visibility }) {
    const geoJson = cloneDeep(rootState.services.geoJson.data);

    for (const feature of geoJson.features) {
      if (feature.properties.layer === id) {
        feature.properties.visibility = visibility;
      }
    }

    commit(`services/${ SET_GEODATA }`, { type: "geoJson", data: geoJson }, { root: true });
  },

  async [SET_ACTIVE_BUILDING] ({ rootState, commit }, id) {
    const geoJson = cloneDeep(rootState.services.geoJson.data);

    for (const feature of geoJson.features) {
      if (feature.id === id) {
        feature.properties.active = true;
      } else {
        feature.properties.active = false;
      }
    }

    commit(`services/${ SET_GEODATA }`, { type: "geoJson", data: geoJson }, { root: true });
  },

  async [REMOVE_ACTIVE_BUILDING] ({ rootState, commit }) {
    const geoJson = cloneDeep(rootState.services.geoJson.data);

    for (const feature of geoJson.features) {
      feature.properties.active = true;
    }

    commit(`services/${ SET_GEODATA }`, { type: "geoJson", data: geoJson }, { root: true });
  }
};

const getters: GetterTree<IMapBuildingsState, TRootState> = {
  getMenu (state: IMapBuildingsState) {
    return state.menu;
  },

  getLayerById: (state: IMapBuildingsState) => (id: number) => {
      const subSections = state.menu ? state.menu.subSections : [];

      const layers = subSections.reduce(
        (res, section) => res.concat(section.layers),
        [] as IMapMenuLayer[]
      );

      return layers.find(x => x.id === id);
    },

  getSectionByLayerId: (state: IMapBuildingsState) => (id: number) => {
      const subSections = state.menu ? state.menu.subSections : [];

      return subSections.find(
        subSection => subSection.layers.find(x => x.id === id)
      );
    },

  getGeoJSON: (state: IMapBuildingsState) => state.geoJSON,
  getBuilding: (state: IMapBuildingsState) => state.building
};

const buildings: Module<IMapBuildingsState, TRootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};

export default buildings;
