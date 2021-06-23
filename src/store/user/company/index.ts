import { ActionTree, GetterTree, Module, MutationTree } from "vuex";
import {
  SET_COMPANY_BANK,
  SET_COMPANY_PROFILE,
  SET_COMPANY_CARD,
  SET_COMPANY_LOGO
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
    profile_address: "",
    profile_description: "",
    profile_logo: "",
    profile_name: "",
    profile_phone: "",
    profile_site: "",
    profile_work_time: ""
  },
  card: {
    name: "",
    full_name: "",
    legal_address: "",
    real_address: "",
    inn: "",
    ogrnip: "",
    okpo: "",
    okved: "",
    email: "",
    site: "",
    phone: []
  },
  bankDetails: {
    bank_account: "",
    bank_bik: "",
    bank_cor_account: "",
    bank_inn: "",
    bank_kpp: "",
    bank_name: "",
    bank_real_address: ""
  }
};

const mutations: MutationTree<ICompanyState> = {
  [SET_COMPANY_PROFILE] (state, payload) {
    state.profile = payload;
  },
  [SET_COMPANY_CARD] (state, payload) {
    state.card = payload;
  },
  [SET_COMPANY_BANK] (state, payload) {
    state.bankDetails = payload;
  },
  [SET_COMPANY_LOGO] (state, payload) {
    state.profile.profile_logo = payload;
  }
};

const actions: ActionTree<ICompanyState, TRootState> = {
  [GET_COMPANY] () {
    return UserCompanyService.getCompany()
      .then(() => {
        // set state
      });
  },
  [UPDATE_COMPANY_PROFILE] (_ , payload) {
    return UserCompanyService.updateCompanyProfile(payload)
      .then(() => {
        // set profile
      });
  },
  [UPDATE_COMPANY_LOGO] (_ , payload) {
    const data = new FormData();
    data.append("file", payload);
    return UserCompanyService.updateCompanyLogo(data)
      .then(() => {
        // set logo
      });
  },
  [UPDATE_COMPANY_BANK] (_ , payload) {
    return UserCompanyService.updateCompanyBank(payload)
      .then(() => {
        // set bank
      });
  },
  [UPDATE_COMPANY_CARD] (_ , payload) {
    return UserCompanyService.updateCompanyCard(payload)
      .then(() => {
        // set card
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
