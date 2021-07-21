import { ActionTree, GetterTree, Module, MutationTree } from "vuex";
import { TRootState } from "src/store/types/root";
import { IUserVacancyState } from "src/store/types/user/tickets/vacancy";

import {
  EXPORT_USER_VACANCIES,
  FETCH_USER_VACANCY_BY_ID,
  GET_USER_VACANCY
} from "src/store/constants/action-constants";
import {
  SET_USER_VACANCIES,
  SET_USER_VACANCY,
  UPDATE_USER_VACANCY_PAGINATION
} from "src/store/constants/mutation-constants";

const state = () : IUserVacancyState => ({
  pagination: {
    limit: 10,
    offset: 1
  },
  data: null,
  entity: null
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
  }
};

const mutations: MutationTree<IUserVacancyState> = {
  [SET_USER_VACANCIES] (state, payload) {
    state.data = payload;
  },
  [UPDATE_USER_VACANCY_PAGINATION] (state, tablePagination) {
    if (tablePagination) {
      const page = tablePagination.page || 1;
      const rowsPerPage = tablePagination.rowsPerPage || 10;
      state.pagination = { limit: rowsPerPage, offset: page };
    }
  },
  [SET_USER_VACANCY] (state, vacancy) {
    state.entity = vacancy;
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
      this.service.services.vacancy.getForCurrentUser;

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
