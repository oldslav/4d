import { ActionTree, GetterTree, Module, MutationTree } from "vuex";
import { TRootState } from "src/store/types/root";
import { IUserVacancyState } from "src/store/types/user/tickets/vacancy";
import { VacancyService } from "src/api/user/vacancy";
import { GET_USER_VACANCY } from "src/store/constants/action-constants";
import { SET_USER_VACANCIES, UPDATE_USER_VACANCY_PAGINATION } from "src/store/constants/mutation-constants";

const state: IUserVacancyState = {
  pagination: {
    limit: 10,
    offset: 1
  },
  data: null
};

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
  }
};

const mutations: MutationTree<IUserVacancyState> = {
  [SET_USER_VACANCIES] (state, payload) {
    state.data = payload;
  },
  [UPDATE_USER_VACANCY_PAGINATION] (state, tablePagination = {}) {
    const page = tablePagination.page || 1;
    const rowsPerPage = tablePagination.rowsPerPage || 10;
    state.pagination = { limit: rowsPerPage, offset: page };
  }
};

const actions: ActionTree<IUserVacancyState, TRootState> = {
  async [GET_USER_VACANCY] ({ commit, state, rootGetters }, { pagination, ...query } = {}) {
    commit(UPDATE_USER_VACANCY_PAGINATION, pagination);

    const params = { ...query || {}, limit: state.pagination.limit, offset: state.pagination.offset - 1 };

    const getter = rootGetters.isUserLegal ? VacancyService.getForCompany : VacancyService.getForCurrentUser;

    const { data } = await getter.call(VacancyService, params);

    commit(SET_USER_VACANCIES, data);
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
