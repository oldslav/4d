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
  GET_COMPANY, SEND_VERIFY_COMPANY_REQUEST,
  UPDATE_COMPANY_BANK,
  UPDATE_COMPANY_CARD, UPDATE_COMPANY_LOGO,
  UPDATE_COMPANY_PROFILE
} from "src/store/constants/action-constants";

const state = (): ICompanyState => ({
  id: null,
  isVerify: null,
  profile: {
    address: null,
    description: null,
    logo: null,
    name: null,
    phone: null,
    site: null,
    workTime: null
  },
  card: {
    name: null,
    fullName: null,
    legalAddress: null,
    realAddress: null,
    documents: {},
    email: null,
    site: null,
    phones: [],
    okpo: null,
    okved: null
  },
  bankDetails: {
    account: null,
    bik: null,
    corAccount: null,
    inn: null,
    kpp: null,
    name: null,
    realAddress: null
  }
});

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
    return this.service.user.company.getCompany()
      .then(({ data }) => {
        const { id, isVerify, bankDetails, companyCard, companyProfile } = data;
        commit(SET_COMPANY_ID, id);
        commit(SET_COMPANY_VERIFY, isVerify);
        commit(SET_COMPANY_BANK, bankDetails);
        commit(SET_COMPANY_PROFILE, companyProfile);
        const { images, ...cardPayload } = companyCard;
        const documents: any = {
          partner_card: [],
          inn: [],
          ogrn: [],
          egrjul: []
        };
        if (images.length) {
          images.forEach((doc: any) => {
            const { id, imagePath, docType, fileName } = doc;
            const file = {
              id,
              imagePath,
              name: fileName
            };
            documents[docType.name].push(file);
          });
        }
        commit(SET_COMPANY_CARD, { ...cardPayload, documents });
      });
  },
  [UPDATE_COMPANY_PROFILE] ({ dispatch }, payload) {
    return this.service.user.company.updateCompanyProfile(payload)
      .then(() => dispatch(GET_COMPANY));
  },
  [UPDATE_COMPANY_LOGO] (_, payload) {
    const data = new FormData();
    data.append("file", payload);
    return this.service.user.company.updateCompanyLogo(data)
      .then(() => {
        // set logo
      });
  },
  [UPDATE_COMPANY_BANK] ({ dispatch }, payload) {
    return this.service.user.company.updateCompanyBank(payload)
      .then(() => dispatch(GET_COMPANY));
  },
  async [UPDATE_COMPANY_CARD] ({ dispatch }, { card, deletedIds }) {
    const { documents, ...payload } = card;
    await this.service.user.company.updateCompanyCard(payload);
    const files = await dispatch("bundleFiles", documents, { root: true });
    await Promise.all(deletedIds.map((id: number) => this.service.user.company.deleteCardFile(id)));
    await Promise.all(files.map((f: any) => this.service.user.company.uploadCardFile(f)));
    dispatch(GET_COMPANY);
  },

  async [SEND_VERIFY_COMPANY_REQUEST] (ctx, payload) {
    await this.service.user.company.sendVerifyRequest(payload);
    // console.log(data);
  }
};

const getters: GetterTree<ICompanyState, TRootState> = {
  getCompanyId (state) {
    return state.id;
  },
  isVerifyCompany (state) {
    return state.isVerify;
  },
  getCompanyProfile (state) {
    return state.profile;
  },
  getCompanyCard (state) {
    return state.card;
  },
  getCompanyBankDetails (state) {
    return state.bankDetails;
  },
  isServicesAvailable (state){
    return state.isVerify;
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
