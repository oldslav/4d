import { ActionTree, GetterTree, Module, MutationTree } from "vuex";
import { GET_DATA_MAIN_PAGE } from "src/store/constants/action-constants";
import { SET_DATA_MAIN_PAGE } from "src/store/constants/mutation-constants";
import { GET_DATA_OBJECTS } from "src/store/constants/action-constants";
import { SET_DATA_OBJECTS } from "src/store/constants/mutation-constants";

const state: any = () => ({
  mainPageData: {},
  objects: {}
});

const mutations: MutationTree<any> = {
  [SET_DATA_MAIN_PAGE] (state, data) {
    state.mainPageData = data;
  },
  [SET_DATA_OBJECTS] (state, data) {
    state.objects = data;
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
  }
};

const getters: GetterTree<any, any> = {
  getWeather: (state) => state.mainPageData.weather,
  //getNewObject: (state) => state.mainPageData.weather,
  getNewIdeas: (state) => state.mainPageData.newIdeas,
  getNewProblems: (state) => state.mainPageData.newProblems,
  getBicycleForRent: (state) => state.mainPageData.bicycleForRent,

  getObjectsInfo: (state) => state.objects
};

const data: Module<any, any> = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};

export default data;
