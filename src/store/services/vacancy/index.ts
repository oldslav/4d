import { ActionTree, GetterTree, Module, MutationTree } from "vuex";
import { IServiceVacancyState, VacancyReferencesEnum } from "src/store/types/vacancy";
import { TRootState } from "src/store/types/root";
import { TVacancyReferencesResponse } from "src/api/services/vacancy";

import {
  GET_VACANCY_REFERENCES,
  CREATE_VACANCY,
  REJECT_VACANCY,
  UPDATE_VACANCY,
  CLOSE_VACANCY,
  PUBLISH_VACANCY,
  SEARCH_VACANCY,
  RESPOND_VACANCY,
  FETCH_VACANCY
} from "src/store/constants/action-constants";
import {
  SET_SEARCH_VACANCY_ERROR,
  SET_VACANCIES,
  SET_VACANCY,
  SET_VACANCY_REFERENCES
} from "src/store/constants/mutation-constants";

const initialState = (): IServiceVacancyState => {
  return {
    isExistsReferences: false,
    isFailedLastSearch: false,
    currentVacancy: null,
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

const state = initialState;

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
  },

  [SET_VACANCY] (state: IServiceVacancyState, vacancy) {
    state.currentVacancy = vacancy;
  },

  [SET_SEARCH_VACANCY_ERROR] (state: IServiceVacancyState, isError: boolean) {
    state.isFailedLastSearch = isError;
  }
};

const actions: ActionTree<IServiceVacancyState, TRootState> = {
  async [GET_VACANCY_REFERENCES] ({ commit, state }) {
    if (!state.isExistsReferences) {
      const { data } = await this.service.services.vacancy.getReferences();
      commit(SET_VACANCY_REFERENCES, data);
      commit("setExistsReferences");
    }
  },

  async [SEARCH_VACANCY] ({ commit }, query = {}) {
    const defaults = { limit: 15, offset: 0 };

    try {
      const { data } = await this.service.services.vacancy.search({ ...defaults, ...query });
      commit(SET_SEARCH_VACANCY_ERROR, false);
      commit(SET_VACANCIES, data);
    } catch (e) {
      commit(SET_SEARCH_VACANCY_ERROR, true);
    }
  },

  async [FETCH_VACANCY] ({ commit }, id) {
    const { data } = await this.service.services.vacancy.getVacancyById(id);

    commit(SET_VACANCY, data);
  },

  async [CREATE_VACANCY] (ctx, values) {
    const { data: vacancy } = await this.service.services.vacancy.createVacancy(values);
    return vacancy;
  },

  async [UPDATE_VACANCY] (ctx, { id, update }) {
    const { data: vacancy } = await this.service.services.vacancy.updateVacancy(id, update);
    return vacancy;
  },

  async [CLOSE_VACANCY] (ctx, { id, closeReasonId }) {
    const { data: vacancy } = await this.service.services.vacancy.closeVacancy(id, closeReasonId);
    return vacancy;
  },

  async [PUBLISH_VACANCY] (ctx, vacancyId) {
    const { data: vacancy } = await this.service.services.vacancy.publishVacancy(vacancyId);
    return vacancy;
  },

  async [REJECT_VACANCY] (ctx, vacancyId) {
    const { data: vacancy } = await this.service.services.vacancy.rejectVacancy(vacancyId);
    return vacancy;
  },

  async [RESPOND_VACANCY] (ctx, { id, payload }) {
    const { resumeFile } = payload;
    delete payload.resumeFile;

    const { data: respond } = await this.service.services.vacancy.respond(id, payload);

    if (resumeFile) {
      const formData = new FormData();
      formData.append("file", resumeFile);
      await this.service.services.vacancy.attachRespondFile(respond.id, formData);
    }

    return respond;
  }
};

const getters: GetterTree<IServiceVacancyState, TRootState> = {
  getVacancyReferences (state) {
    return state.references;
  },

  getVacancies (state) {
    return state.vacancies;
  },

  getCurrentVacancy (state){
    return state.currentVacancy;
  },

  isFailedLastSearch (state) {
    return state.isFailedLastSearch;
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
