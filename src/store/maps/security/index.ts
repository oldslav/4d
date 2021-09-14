import { ActionTree, GetterTree, Module, MutationTree } from "vuex";
import { TRootState } from "src/store/types/root";
import { IMapSecurityState } from "src/store/types/maps/security";
import { FETCH_SECURITY_MENU, FETCH_SECURITY_MAP } from "src/store/constants/action-constants";
import {
  SET_GEODATA,
  SET_SECURITY_GEOJSON,
  SET_SECURITY_LAYERS_VISIBILITY,
  SET_SECURITY_MENU
} from "src/store/constants/mutation-constants";
import { IMapMenuLayer, IMapMenuSection } from "src/store/types/maps/common";
import { cloneDeep } from "lodash";

const initialState = (): IMapSecurityState => ({
  menu: null,
  geoJSON: {}
});

const state = initialState;

const mutations: MutationTree<IMapSecurityState> = {
  [SET_SECURITY_MENU] (state, menu) {
    state.menu = menu;
  },
  [SET_SECURITY_GEOJSON] (state, geoJSON) {
    state.geoJSON = geoJSON;
  }
};

const actions: ActionTree<IMapSecurityState, TRootState> = {
  async [FETCH_SECURITY_MAP] ({ getters, commit, dispatch }){
    await dispatch(FETCH_SECURITY_MENU);

    const layers = getters.getMenu.subSections.reduce(
      (res: IMapMenuLayer[], subSection: IMapMenuSection) => res.concat(subSection.layers),
      [] as IMapMenuLayer[]
    );

    const awaits = layers.map((x: IMapMenuLayer) => this.service.services.security.getLayerGeoJSON(x.path));

    const data = await Promise.all(awaits);

    const geoJSON = data.reduce((res: any, collection: any, i) => {
      const layer = layers[i];
      const features = collection.features.map((feature: any) => {
        feature.properties.layer = layer.id;
        feature.properties.type = "camera";
        return feature;
      });

      res.features.push(...features);
      return res;
    },{ features: [], type: "FeatureCollection" });

    commit(SET_SECURITY_GEOJSON, geoJSON);
    commit(`services/${ SET_GEODATA }`, { type: "geoJson", data: geoJSON }, { root: true });
  },

  async [FETCH_SECURITY_MENU] ({ commit }) {
    const { data: menu } = await this.service.services.security.getMapMenu();
    commit(SET_SECURITY_MENU, menu);
  },

  [SET_SECURITY_LAYERS_VISIBILITY] ({ rootState, commit }, { ids, visibility }) {
    const geoJson = cloneDeep(rootState.services.geoJson.data);

    for (const feature of geoJson.features) {
      if (ids.includes(feature.properties.layer)) {
        feature.properties.visibility = visibility;
      }
    }

    commit(`services/${ SET_GEODATA }`, { type: "geoJson", data: geoJson }, { root: true });
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

const security: Module<IMapSecurityState, TRootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};

export default security;
