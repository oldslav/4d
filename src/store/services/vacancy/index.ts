import { ActionTree, GetterTree, Module, MutationTree } from "vuex";
import { IServiceVacancyState, VacancyReferencesEnum } from "src/store/types/vacancy";
import { TRootState } from "src/store/types/root";
import { TVacancyReferencesResponse, VacancyService } from "src/api/services/vacancy";

import {
  GET_VACANCY_REFERENCES,
  CREATE_VACANCY,
  REJECT_VACANCY,
  UPDATE_VACANCY,
  CLOSE_VACANCY,
  PUBLISH_VACANCY, SEARCH_VACANCY
} from "src/store/constants/action-constants";
import { SET_VACANCIES, SET_VACANCY_REFERENCES } from "src/store/constants/mutation-constants";

const initialState = (): IServiceVacancyState => {
  return {
    isExistsReferences: false,
    vacancies: {
      count: 0,
      items: []
    },
    references: {
      [VacancyReferencesEnum.closureReason]: [],
      [VacancyReferencesEnum.employmentType]: [],
      [VacancyReferencesEnum.experience]: [],
      [VacancyReferencesEnum.profIndustry]: [],
      [VacancyReferencesEnum.respondStatus]: [],
      [VacancyReferencesEnum.vacancyStatus]: [],
      [VacancyReferencesEnum.workSchedule]: []
    }
  };
};

const state: () => IServiceVacancyState = initialState;

const mutations: MutationTree<IServiceVacancyState> = {
  // non constant, private setter
  setExistsReferences (state: IServiceVacancyState, isExists) {
    state.isExistsReferences = isExists;
  },

  [SET_VACANCY_REFERENCES] (state: IServiceVacancyState, references: TVacancyReferencesResponse) {
    state.references = references;
  },

  [SET_VACANCIES] (state: IServiceVacancyState, vacancies) {
    state.vacancies = vacancies;
  }
};

const actions: ActionTree<IServiceVacancyState, TRootState> = {
  async [GET_VACANCY_REFERENCES] ({ commit, state }) {
    if (!state.isExistsReferences) {
      const { data } = await VacancyService.getReferences();
      commit(SET_VACANCY_REFERENCES, data);
      commit("setExistsReferences");
    }
  },

  async [SEARCH_VACANCY] ({ commit }, query = {}) {
    const defaults = { limit: 15, offset: 0 };

    const { data } = await VacancyService.search({ ...query, ...defaults });
    commit(SET_VACANCIES, data);
  },

  async [CREATE_VACANCY] (ctx, values) {
    const { data: vacancy } = await VacancyService.createVacancy(values);
    return vacancy;
  },

  async [UPDATE_VACANCY] (ctx, { id, update }) {
    const { data: vacancy } = await VacancyService.updateVacancy(id, update);
    return vacancy;
  },

  async [CLOSE_VACANCY] (ctx, { id, closeReasonId }) {
    const { data: vacancy } = await VacancyService.closeVacancy(id, closeReasonId);
    return vacancy;
  },

  async [PUBLISH_VACANCY] (ctx, vacancyId) {
    const { data: vacancy } = await VacancyService.publishVacancy(vacancyId);
    return vacancy;
  },

  async [REJECT_VACANCY] (ctx, vacancyId) {
    const { data: vacancy } = await VacancyService.rejectVacancy(vacancyId);
    return vacancy;
  }
};

const getters: GetterTree<IServiceVacancyState, TRootState> = {
  getVacancyReferences (state) {
    return state.references;
  },

  getVacancies (state) {
    return state.vacancies;
  }
};

const vacancy: Module<IServiceVacancyState, TRootState> = {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
};

export default vacancy;
