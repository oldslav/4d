import { ActionContext, ActionTree, GetterTree, Module, MutationTree } from "vuex";
import { TRootState } from "src/store/types/root";
import {
  ACCOUNT_CREATE,
  ACCOUNT_LOGIN,
  FETCH_ACCESS_TOKEN,
  GET_ACCOUNT
} from "src/store/constants/action-constants";
import { SET_ACCESS_TOKEN, SET_ACCOUNT, SET_EMPTY, SET_REFRESH_TOKEN } from "src/store/constants/mutation-constants";
import AuthService from "src/api/auth";
import { IAccountState } from "src/store/account/state";

const ACCESS_TOKEN_COOKIE = "access_token";
const REFRESH_TOKEN_COOKIE = "refresh_token";

const formUrlEncoded = (x: { [key: string]: string | number; }) =>
  Object.keys(x).reduce((p, c) => p + `&${ c }=${ encodeURIComponent(x[c]) }`, "");

// const initialState = (): IAccountState => {
//   return {
//     account: {
//       name: {
//         first: null,
//         last: null,
//         patronymic: null,
//         full: null
//       },
//       email: null,
//       phones: null,
//       telegram: null,
//       uid: null,
//       login: null,
//       createdAt: null,
//       updatedAt: null,
//       roles: null
//     },
//     accessToken: null,
//     refreshToken: null
//   };
// };
const initialState = (): IAccountState => {
  return {
    account: {
      name: {
        first: null,
        last: null,
        patronymic: null,
        full: null
      },
      jobPosition: null,
      contacts: {
        email: null,
        phone: null,
        telegramAlias: null,
        pcm: {
          email: false,
          phone: false,
          telegram: false,
          whatsApp: false
        }
      },
      id: null,
      created: null,
      updated: null,
      roles: []
    },
    accessToken: null,
    refreshToken: null
  };
};

const state: () => IAccountState = initialState;

const mutations: MutationTree<IAccountState> = {
  [SET_ACCOUNT]: (state, payload) => state.account = payload,
  [SET_ACCESS_TOKEN]: (state, payload) => state.accessToken = payload,
  [SET_REFRESH_TOKEN]: (state, payload) => state.refreshToken = payload,
  [SET_EMPTY]: state => Object.assign(state, initialState())
};

const actions: ActionTree<IAccountState, TRootState> = {
  [ACCOUNT_CREATE] (ctx, payload) {
    return AuthService.registration(payload);
  },

  async [ACCOUNT_LOGIN] ({ commit, dispatch }, payload = {
    username: "user",
    password: "user",
    grant_type: "password"
  }) {
    const { data } = await AuthService.login(formUrlEncoded(payload));

    commit(SET_ACCESS_TOKEN, {
      token: data.access_token,
      expiresIn: data.expires_in
    });

    commit(SET_REFRESH_TOKEN, {
      token: data.refresh_token,
      expiresIn: data.expires_in
    });

    this.$local.set(ACCESS_TOKEN_COOKIE, data.access_token);
    this.$local.set(REFRESH_TOKEN_COOKIE, data.refresh_token);

    await dispatch(GET_ACCOUNT);
  },

  async [GET_ACCOUNT] ({ commit }) {
    const { data } = await AuthService.getAccount();
    commit(SET_ACCOUNT, data);
  },

  async getAccessToken ({ getters, dispatch }: ActionContext<IAccountState, TRootState>) {
    if (getters.getAccessToken !== null && getters.getAccessToken.expiresIn > Date.now() + 3600) {
      return getters.getAccessToken.token;
    }

    try {
      await dispatch(FETCH_ACCESS_TOKEN);
      return getters.getAccessToken ? getters.getAccessToken.token : null;
    } catch (e) {
      return null;
    }
  },

  async [FETCH_ACCESS_TOKEN] ({ commit }: ActionContext<IAccountState, TRootState>) {
    const refreshToken = this.$cookies.get(REFRESH_TOKEN_COOKIE);
    const accessToken = this.$cookies.get(ACCESS_TOKEN_COOKIE);

    if (!accessToken && refreshToken) {
      const payload = formUrlEncoded({
        refresh_token: refreshToken,
        grant_type: "refresh_token"
      });

      const { data } = await AuthService.login(payload, { skipAuth: true });

      commit(SET_ACCESS_TOKEN, {
        token: data.access_token,
        expiresIn: data.expires_in
      });

      commit(SET_REFRESH_TOKEN, {
        token: data.refresh_token,
        expiresIn: data.expires_in
      });

      this.$local.set(ACCESS_TOKEN_COOKIE, data.access_token);
      this.$local.set(REFRESH_TOKEN_COOKIE, data.refresh_token);
    }
  }
};

const getters: GetterTree<IAccountState, TRootState> = {
  getAccessToken (state: IAccountState) {
    return state.accessToken;
  },

  isAccessToken (state: IAccountState) {
    return state.accessToken !== null && state.accessToken.expiresIn > Date.now() + 3600;
  },

  isAuthenticated (state: IAccountState) {
    return state.account !== null;
  },

  getAccount (state: IAccountState) {
    return state.account;
  },

  getUserRolesNames (state) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return state.account.roles.map((role) => role.name);
  },

  isUserNature (state) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return state.account.roles.some(role => role.name === "ROLE_USER");
  },

  isUserLegal (state) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return state.account.roles.some(role => role.name === "ROLE_USER_JURISTIC");
  },

  isEmployee (state) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return state.account.roles.some(role => role.name.startsWith("ROLE_EMPLOYEE"));
  }
};

const account: Module<IAccountState, TRootState> = {
  state,
  mutations,
  actions,
  getters
};

export default account;
