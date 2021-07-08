import { ActionTree, GetterTree, Module, MutationTree } from "vuex";
import { IServiceVacancyState, VacancyReferencesEnum } from "src/store/types/vacancy";
import { TRootState } from "src/store/types/root";
import { TVacancyReferencesResponse, VacancyService } from "src/api/user/vacancy";

import { GET_VACANCY_REFERENCES, CREATE_VACANCY } from "src/store/constants/action-constants";
import { SET_VACANCY_REFERENCES } from "src/store/constants/mutation-constants";


const initialState = (): IServiceVacancyState => {
  return {
    isExistsReferences: false,
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
  }
};

const actions: ActionTree<IServiceVacancyState, TRootState> = {
  async [GET_VACANCY_REFERENCES] ({ commit, state }) {
    if (!state.isExistsReferences) {
      const { data } = await VacancyService.getReferences();
      commit(SET_VACANCY_REFERENCES, data);
    }
  },

 async [CREATE_VACANCY] (ctx, values) {
    const { data: vacancy } = await VacancyService.createVacancy(values);
    return vacancy;
 }
};

const getters: GetterTree<IServiceVacancyState, TRootState> = {
  getVacancyReferences (state){
    return state.references;
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
