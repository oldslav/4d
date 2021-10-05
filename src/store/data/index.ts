import { ActionTree, GetterTree, Module, MutationTree } from "vuex";
import { GET_DATA_MAIN_PAGE } from "src/store/constants/action-constants";
import { SET_DATA_MAIN_PAGE } from "src/store/constants/mutation-constants";
import { GET_DATA_OBJECTS } from "src/store/constants/action-constants";
import { SET_DATA_OBJECTS } from "src/store/constants/mutation-constants";
import { GET_DATA_TRANSPORT } from "src/store/constants/action-constants";
import { SET_DATA_TRANSPORT } from "src/store/constants/mutation-constants";
import { GET_DATA_IMPROVEMENT } from "src/store/constants/action-constants";
import { SET_DATA_IMPROVEMENT } from "src/store/constants/mutation-constants";
import { GET_DATA_LIGHTING } from "src/store/constants/action-constants";
import { SET_DATA_LIGHTING } from "src/store/constants/mutation-constants";
import { GET_DATA_TOURISM } from "src/store/constants/action-constants";
import { SET_DATA_TOURISM } from "src/store/constants/mutation-constants";
import { GET_DATA_TERRITORY } from "src/store/constants/action-constants";
import { SET_DATA_TERRITORY } from "src/store/constants/mutation-constants";

const state: any = () => ({
  mainPageData: {},
  objects: {},
  transport: {},
  improvement: {},
  lighting: {},
  tourism: {},
  territory: {}
});

const mutations: MutationTree<any> = {
  [SET_DATA_MAIN_PAGE] (state, data) {
    state.mainPageData = data;
  },
  [SET_DATA_OBJECTS] (state, data) {
    state.objects = data;
  },
  [SET_DATA_TRANSPORT] (state, data) {
    state.transport = data;
  },
  [SET_DATA_IMPROVEMENT] (state, data) {
    state.improvement = data;
  },
  [SET_DATA_LIGHTING] (state, data) {
    state.lighting = data;
  },
  [SET_DATA_TOURISM] (state, data) {
    state.tourism = data;
  },
  [SET_DATA_TERRITORY] (state, data) {
    state.territory = data;
  }
};

const actions: ActionTree<any, any> = {
  async [GET_DATA_MAIN_PAGE] ({ commit }) {
    const { data } = await this.service.data.getMainPageInfo();
    commit(SET_DATA_MAIN_PAGE, data);
  },
  async [GET_DATA_OBJECTS] ({ commit }) {
    const { data } = await this.service.data.getObjects();
    commit(SET_DATA_OBJECTS, data);
  },
  async [GET_DATA_TRANSPORT] ({ commit }) {
    const { data } = await this.service.data.getTransport();
    commit(SET_DATA_TRANSPORT, data);
  },
  async [GET_DATA_IMPROVEMENT] ({ commit }) {
    const { data } = await this.service.data.getImprovement();
    commit(SET_DATA_IMPROVEMENT, data);
  },
  async [GET_DATA_LIGHTING] ({ commit }) {
    const { data } = await this.service.data.getLighting();
    commit(SET_DATA_LIGHTING, data);
  },
  async [GET_DATA_TOURISM] ({ commit }) {
    const { data } = await this.service.data.getTourism();
    commit(SET_DATA_TOURISM, data);
  },
  async [GET_DATA_TERRITORY] ({ commit }) {
    const { data } = await this.service.data.getTerritory();
    commit(SET_DATA_TERRITORY, data);
  }
};

const getters: GetterTree<any, any> = {
  getWeather: (state) => state.mainPageData.weather,
  //getNewObject: (state) => state.mainPageData.weather,
  getNewIdeas: (state) => state.mainPageData.newIdeas,
  getNewProblems: (state) => state.mainPageData.newProblems,
  getBicycleForRent: (state) => state.mainPageData.bicycleForRent,

  getObjectsInfo: (state) => state.objects,
  getTransport: (state) => state.transport,
  getImprovement: (state) => state.improvement,
  getLighting: (state) => state.lighting,
  getTourism: (state) => state.tourism,
  getTerritory: (state) => state.territory
};

const data: Module<any, any> = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};

export default data;
