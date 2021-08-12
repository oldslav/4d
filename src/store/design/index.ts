import { ActionTree, GetterTree, Module, MutationTree } from "vuex";
import { GET_DESIGN_SECTION, GET_DESIGN_SECTIONS } from "src/store/constants/action-constants";
import { SET_DESIGN_SECTION, SET_DESIGN_SECTIONS } from "src/store/constants/mutation-constants";

const state: any = () => ({
  sections: [],
  currentSection: {}
});

const mutations: MutationTree<any> = {
  [SET_DESIGN_SECTIONS] (state, sections) {
    state.sections = sections;
  },
  [SET_DESIGN_SECTION] (state, section) {
    state.currentSection = section;
  }
};

const actions: ActionTree<any, any> = {
  async [GET_DESIGN_SECTIONS] ({ commit }) {
    const { data } = await this.service.design.getDesignCodeSections();
    commit(SET_DESIGN_SECTIONS, data);
  },
  async [GET_DESIGN_SECTION] ({ commit }, id) {
    const { data } = await this.service.design.getDesignCodeSectionById(id);
    commit(SET_DESIGN_SECTION, data);
  }
};

const getters: GetterTree<any, any> = {
  getDesignSections: (state) => state.sections,
  getCurrentSection: (state) => state.currentSection
};

const design: Module<any, any> = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};

export default design;
