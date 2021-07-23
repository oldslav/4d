import Vue from "vue";
import { ActionTree, GetterTree, Module, MutationTree } from "vuex";
import { TRootState } from "src/store/types/root";
import { IUserVacancyState } from "src/store/types/user/tickets/vacancy";
import {
  CANDIDATE_INTERVIEW_PASSED,
  EXPORT_USER_VACANCIES,
  FETCH_USER_VACANCY_BY_ID,
  GET_USER_VACANCY,
  INVITE_VACANCY_CANDIDATE,
  REJECT_VACANCY_CANDIDATE,
  VIEW_RESPOND,
  SEND_CANDIDATE_JOB_OFFER,
  VIEW_RESPOND_AND_RELOAD_CANDIDATE,
  SEND_CANDIDATE_JOB_OFFER_AND_RELOAD,
  REJECT_AND_RELOAD_VACANCY_CANDIDATE,
  INVITE_AND_RELOAD_VACANCY_CANDIDATE,
  FETCH_VACANCY_RESPONDS_FOR_COMPANY,
  CANDIDATE_INTERVIEW_PASSED_AND_RELOAD
} from "src/store/constants/action-constants";
import {
  SET_USER_VACANCIES,
  SET_USER_VACANCY,
  UPDATE_USER_VACANCY_PAGINATION,
  SET_VACANCY_CANDIDATES,
  REFRESH_VACANCY_CANDIDATE,
  UPDATE_USER_VACANCY_CANDIDATES_PAGINATION
} from "src/store/constants/mutation-constants";

const state = () : IUserVacancyState => ({
  pagination: {
    limit: 10,
    offset: 1
  },
  data: null,
  entity: null,
  vacancyCandidatesData: null,
  vacancyCandidatesPagination: {
    limit: 10,
    offset: 1
  }
});

const getters: GetterTree<IUserVacancyState, TRootState> = {
  tableData (state) {
    const { data } = state;

    if (data) {
      return { items: data.items };
    }
  },

  tablePagination (state) {
    const { pagination, data } = state;

    if (data) {
      return {
        rowsPerPage: pagination.limit,
        page: pagination.offset,
        rowsNumber: data.count
      };
    }
  },

  getVacancy (state) {
    return state.entity;
  },

  getVacancyCandidatesTableData (state){
    return state.vacancyCandidatesData;
  },

  getVacancyCandidatesTablePagination (state){
    const { vacancyCandidatesPagination, vacancyCandidatesData } = state;

    if (vacancyCandidatesData) {
      return {
        rowsPerPage: vacancyCandidatesPagination.limit,
        page: vacancyCandidatesPagination.offset,
        rowsNumber: vacancyCandidatesData.count
      };
    }
  }
};

const mutations: MutationTree<IUserVacancyState> = {
  [SET_USER_VACANCIES] (state, payload) {
    state.data = payload;
  },

  [UPDATE_USER_VACANCY_PAGINATION] (state, pagination) {
    if (pagination) {
      const page = pagination.page || 1;
      const rowsPerPage = pagination.rowsPerPage || 10;
      state.pagination = { limit: rowsPerPage, offset: page };
    }
  },

  [SET_USER_VACANCY] (state, vacancy) {
    state.entity = vacancy;
  },

  [SET_VACANCY_CANDIDATES] (state, payload) {
    state.vacancyCandidatesData = payload;
  },

  [REFRESH_VACANCY_CANDIDATE] (state, { id, candidate }) {
    if (state.vacancyCandidatesData === null) {
      return;
    }

    const candidateIndex = state.vacancyCandidatesData.items.findIndex(x => x.id === id);

    if (candidateIndex !== -1) {
      Vue.set(state.vacancyCandidatesData.items, candidateIndex, candidate);
    }
  },

  [UPDATE_USER_VACANCY_CANDIDATES_PAGINATION] (state, pagination) {
    if (pagination) {
      const page = pagination.page || 1;
      const rowsPerPage = pagination.rowsPerPage || 10;
      state.vacancyCandidatesPagination = { limit: rowsPerPage, offset: page };
    }
  }
};

const actions: ActionTree<IUserVacancyState, TRootState> = {
  async [GET_USER_VACANCY] ({ commit, state, rootGetters }, { pagination, query } = {}) {
    commit(UPDATE_USER_VACANCY_PAGINATION, pagination);

    const params = {
      limit: state.pagination.limit,
      offset: state.pagination.offset - 1,
      ...query || {}
    };

    const getter = rootGetters.isUserLegal ?
      this.service.services.vacancy.getForCompany :
      rootGetters.isUserNature ? this.service.services.vacancy.getUserResponds :
      this.service.services.vacancy.getForEmployee;

    const { data } = await getter.call(this.service.services.vacancy, params);

    commit(SET_USER_VACANCIES, data);
  },


  async [EXPORT_USER_VACANCIES] ({ state }, query) {
    const params = {
      limit: state.pagination.limit,
      offset: state.pagination.offset - 1,
      ...query || {}
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { data } = await this.service.services.vacancy.exportVacancies(params);

    // console.log(data);
  },

  async [FETCH_USER_VACANCY_BY_ID] ({ commit }, id) {
    const { data } = await this.service.services.vacancy.getVacancyById(id);

    commit(SET_USER_VACANCY, data);
  },

  async [FETCH_VACANCY_RESPONDS_FOR_COMPANY] ({ commit, state }, { id, query, pagination }) {
    commit(UPDATE_USER_VACANCY_CANDIDATES_PAGINATION, pagination);

    const params = {
      limit: state.vacancyCandidatesPagination.limit,
      offset: state.vacancyCandidatesPagination.offset - 1,
      ...query || {}
    };

    const { data } = await this.service.services.vacancy.getVacancyRespondsForCompany(id, params);
    commit(SET_VACANCY_CANDIDATES, data);
  },

  async [VIEW_RESPOND_AND_RELOAD_CANDIDATE] ({ dispatch, commit }, id) {
    const candidate = await dispatch(`services/vacancy/${ VIEW_RESPOND }`, id, { root :true });
    commit(REFRESH_VACANCY_CANDIDATE,{ id, candidate });
  },

  async [REJECT_AND_RELOAD_VACANCY_CANDIDATE] ({ dispatch, commit }, { id, reason }) {
    const candidate = await dispatch(`services/vacancy/${ REJECT_VACANCY_CANDIDATE }`, { id, reason }, { root :true });
    commit(REFRESH_VACANCY_CANDIDATE, { id, candidate });
  },

  async [INVITE_AND_RELOAD_VACANCY_CANDIDATE] ({ dispatch, commit }, { id, text }) {
    const candidate = await dispatch(`services/vacancy/${ INVITE_VACANCY_CANDIDATE }`, { id, text }, { root :true });
    commit(REFRESH_VACANCY_CANDIDATE, { id, candidate });
  },

  async [CANDIDATE_INTERVIEW_PASSED_AND_RELOAD] ({ dispatch, commit }, id) {
    const candidate = await dispatch(`services/vacancy/${ CANDIDATE_INTERVIEW_PASSED }`, id, { root :true });
    commit(REFRESH_VACANCY_CANDIDATE, { id, candidate });
  },

  async [SEND_CANDIDATE_JOB_OFFER_AND_RELOAD] ({ dispatch, commit }, id) {
    const candidate = await dispatch(`services/vacancy/${ SEND_CANDIDATE_JOB_OFFER }`, id, { root :true });
    commit(REFRESH_VACANCY_CANDIDATE, { id, candidate });
  }
};

const vacancy: Module<IUserVacancyState, TRootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};

export default vacancy;
