import { ActionContext, ActionTree, GetterTree, Module, MutationTree } from "vuex";
import { TRootState } from "src/store/types/root";
import {
  ACCOUNT_CREATE,
  ACCOUNT_LOGIN,
  FETCH_ACCESS_TOKEN,
  GET_ACCOUNT,
  ACCOUNT_LOGOUT,
  GET_ACCESS_TOKEN,
  SET_OAUTH_TOKENS
} from "src/store/constants/action-constants";
import { SET_ACCOUNT, SET_EMPTY } from "src/store/constants/mutation-constants";
import { IAccountState } from "src/store/account/state";

const REFRESH_TOKEN_COOKIE = "PHPSESSID";
const ACCESS_TOKEN_COOKIE = "PHPSESS2ID";

const formUrlEncoded = (x: { [key: string]: string | number; }) =>
  Object.keys(x).reduce((p, c) => p + `&${ c }=${ encodeURIComponent(x[c]) }`, "");

const fromBase64 = (value: string) =>
  process.env.SERVER ? Buffer.from(value, "base64").toString() : atob(value);

const initialState = (): IAccountState => {
  return {
    accessTokenAwait: null,
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
    }
  };
};

const state = initialState;

const mutations: MutationTree<IAccountState> = {
  [SET_ACCOUNT]: (state, payload) => state.account = payload,
  [SET_EMPTY]: state => Object.assign(state, initialState()),
  // private mutation
  setAccessTokenAwait: (state, accessTokenAwait) => state.accessTokenAwait = accessTokenAwait
};

const actions: ActionTree<IAccountState, TRootState> = {
  [ACCOUNT_LOGOUT] ({ commit }) {
    commit(SET_EMPTY);
    this.$cookies.remove(ACCESS_TOKEN_COOKIE);
    this.$cookies.remove(REFRESH_TOKEN_COOKIE);
  },

  [ACCOUNT_CREATE] (ctx, payload) {
    return this.service.auth.registration(payload);
  },

  async [ACCOUNT_LOGIN] ({ dispatch }, payload = {
    username: "user",
    password: "user",
    grant_type: "password"
  }) {
    const { data } = await this.service.auth.login(formUrlEncoded(payload));

    dispatch(SET_OAUTH_TOKENS, data);
    await dispatch(GET_ACCOUNT);
  },

  async [GET_ACCOUNT] ({ commit }) {
    const { data } = await this.service.auth.getAccount();
    commit(SET_ACCOUNT, data);
  },

  [SET_OAUTH_TOKENS] (ctx, data) {
    this.$cookies.set(ACCESS_TOKEN_COOKIE, data.access_token, {
      expires: new Date(Date.now() + (data.expires_in - 10) * 1000),
      path: "/"
    });

    try {
      const parsedRefresh = JSON.parse(
        fromBase64(data.refresh_token.split(".")[1])
      );

      this.$cookies.set(REFRESH_TOKEN_COOKIE, data.refresh_token, {
        expires: new Date(parsedRefresh.exp * 1000),
        path: "/"
      });
    } catch (e) {
      // Do nothing
    }
  },

  async [GET_ACCESS_TOKEN] ({ dispatch, state, commit }: ActionContext<IAccountState, TRootState>) {
    const accessToken = this.$cookies.get(ACCESS_TOKEN_COOKIE);

    if (accessToken) {
      return accessToken;
    }

    try {
      if (!state.accessTokenAwait) {
        const accessTokenAwait = dispatch(FETCH_ACCESS_TOKEN);
        commit("setAccessTokenAwait", accessTokenAwait);
        await accessTokenAwait;
        commit("setAccessTokenAwait", null);
      } else {
        await state.accessTokenAwait;
      }

      return this.$cookies.get(ACCESS_TOKEN_COOKIE) || null;
    } catch (e) {
      return null;
    }
  },

  async [FETCH_ACCESS_TOKEN] ({ dispatch }: ActionContext<IAccountState, TRootState>) {
    const refreshToken = this.$cookies.get(REFRESH_TOKEN_COOKIE);
    const accessToken = this.$cookies.get(ACCESS_TOKEN_COOKIE);

    if (!accessToken && refreshToken) {
      const payload = formUrlEncoded({
        refresh_token: refreshToken,
        grant_type: "refresh_token"
      });

      const { data } = await this.service.auth.login(payload, { skipAuth: true });

      await dispatch(SET_OAUTH_TOKENS, data);
    }
  }
};

const getters: GetterTree<any, TRootState> = {
  isAuthenticated (state: IAccountState) {
    return state.account !== null && state.account.id !== null;
  },

  isDev () {
    return process.env.ENV === "development";
  },

  getAccount (state: IAccountState) {
    return state.account;
  },

  getUserRolesNames (state) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return state.account.roles.map((role) => role.name);
  },

  getUserId (state: IAccountState) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return state.account.id;
  },

  isUserNature (state) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return state.account.roles.some(role => role.name === "ROLE_USER");
  },

  isUserGIS (state) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return state.account.roles.some(role => role.name === "ROLE_QGIS");
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
  },

  isUserAdmin (state) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return state.account.roles.some(role => role.name.startsWith("ROLE_ADMIN"));
  },

  isEmployeeParking (state, getters) {
    return getters.getUserRolesNames.includes("ROLE_EMPLOYEE_PARKING");
  },
  isEmployeeLiving (state, getters) {
    return getters.getUserRolesNames.includes("ROLE_EMPLOYEE_LIVING");
  },
  isEmployeeIdea (state, getters) {
    return getters.getUserRolesNames.includes("ROLE_EMPLOYEE_IDEA");
  },
  isEmployeeWarehouse (state, getters) {
    return getters.getUserRolesNames.includes("ROLE_EMPLOYEE_WAREHOUSE");
  },
  isEmployeeEmploymentCenter (state, getters) {
    return getters.getUserRolesNames.includes("ROLE_EMPLOYEE_EMPLOYMENT_CENTER");
  },
  isEmployeeLight (state, getters) {
    return getters.getUserRolesNames.includes("ROLE_EMPLOYEE_LIGHT");
  },
  isEmployeeTrees (state, getters) {
    return getters.getUserRolesNames.includes("ROLE_EMPLOYEE_TREES");
  },
  isEmployeeCommerce (state, getters) {
    return getters.getUserRolesNames.includes("ROLE_EMPLOYEE_COMMERCE");
  },
  isEmployeeCrowdfunding (state, getters) {
    return getters.getUserRolesNames.includes("ROLE_EMPLOYEE_CITY_PROJECT");
  }
};

const account: Module<IAccountState, TRootState> = {
  state,
  mutations,
  actions,
  getters
};

export default account;
