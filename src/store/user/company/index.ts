import { ActionTree, GetterTree, Module, MutationTree } from "vuex";
import {
  SET_COMPANY_BANK,
  SET_COMPANY_PROFILE,
  SET_COMPANY_CARD,
  SET_COMPANY_LOGO,
  SET_COMPANY_ID,
  SET_COMPANY_VERIFY
} from "src/store/constants/mutation-constants";
import { ICompanyState } from "src/store/types/user/company";
import { TRootState } from "src/store/types/root";
import {
  GET_COMPANY,
  UPDATE_COMPANY_BANK,
  UPDATE_COMPANY_CARD, UPDATE_COMPANY_LOGO,
  UPDATE_COMPANY_PROFILE
} from "src/store/constants/action-constants";
import { UserCompanyService } from "src/api/user/company";

const state: ICompanyState = {
  id: null,
  isVerify: null,
  profile: {
    address: "",
    description: "",
    logo: "",
    name: "",
    phone: "",
    site: "",
    workTime: ""
  },
  card: {
    name: "",
    fullName: "",
    legalAddress: "",
    realAddress: "",
    inn: "",
    ogrnip: "",
    okpo: "",
    okved: "",
    email: "",
    site: "",
    phone: []
  },
  bankDetails: {
    account: "",
    bik: "",
    corAccount: "",
    inn: "",
    kpp: "",
    name: "",
    realAddress: ""
  }
};

const mutations: MutationTree<ICompanyState> = {
  [SET_COMPANY_ID] (state, id) {
    state.id = id;
  },
  [SET_COMPANY_VERIFY] (state, verified) {
    state.isVerify = verified;
  },
  [SET_COMPANY_PROFILE] (state, payload) {
    Object.assign(state.profile, payload);
  },
  [SET_COMPANY_CARD] (state, payload) {
    Object.assign(state.card, payload);
  },
  [SET_COMPANY_BANK] (state, payload) {
    Object.assign(state.bankDetails, payload);
  },
  [SET_COMPANY_LOGO] (state, payload) {
    state.profile.logo = payload;
  }
};

const actions: ActionTree<ICompanyState, TRootState> = {
  [GET_COMPANY] ({ commit }) {
    return UserCompanyService.getCompany()
      .then(({ data }) => {
        // eslint-disable-next-line no-console
        console.log(data);
        const { id, isVerify, bankDetails, companyCard, companyProfile } = data;
        commit(SET_COMPANY_ID, id);
        commit(SET_COMPANY_VERIFY, isVerify);
        commit(SET_COMPANY_BANK, bankDetails);
        commit(SET_COMPANY_PROFILE, companyProfile);
        commit(SET_COMPANY_CARD, companyCard);
      });
  },
  [UPDATE_COMPANY_PROFILE] ({ dispatch }, payload) {
    return UserCompanyService.updateCompanyProfile(payload)
      .then(() => dispatch(GET_COMPANY));
  },
  [UPDATE_COMPANY_LOGO] (_, payload) {
    const data = new FormData();
    data.append("file", payload);
    return UserCompanyService.updateCompanyLogo(data)
      .then(() => {
        // set logo
      });
  },
  [UPDATE_COMPANY_BANK] ({ dispatch }, payload) {
    return UserCompanyService.updateCompanyBank(payload)
      .then(() => dispatch(GET_COMPANY));
  },
  [UPDATE_COMPANY_CARD] ({ commit }, payload) {
    return UserCompanyService.updateCompanyCard(payload)
      .then(({ data }) => {
        commit(SET_COMPANY_CARD, data);
      });
  }
};

const getters: GetterTree<ICompanyState, TRootState> = {
  getCompanyId (state) {
    return state.id;
  },
  getCompanyProfile (state) {
    return state.profile;
  },
  getCompanyCard (state) {
    return state.card;
  },
  getCompanyBankDetails (state) {
    return state.bankDetails;
  }
};

const company: Module<ICompanyState, TRootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};

export default company;
