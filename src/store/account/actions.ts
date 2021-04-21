import { ActionContext, ActionTree } from "vuex";

import { IRootState } from "../types/root";
import { IAccountState } from "./state";
import { ILoginPayload, ILoginResponse, IAccount, IAccessToken } from "./models";

const REFRESH_TOKEN_COOKIE = "session";

const atob = (value: string) => process.env.SERVER ? Buffer.from(value, "base64").toString("binary") : window.atob(value);

const formUrlEncoded = (x: { [key: string]: string | number; }) =>
  Object.keys(x).reduce((p, c) => p + `&${ c }=${ encodeURIComponent(x[c]) }`, "");

const actions: ActionTree<IAccountState, IRootState> = {
  setAccessToken ({ commit }: ActionContext<IAccountState, IRootState>, data: ILoginResponse) {
    commit("setAccessToken", data);

    try {
      const payload = atob(data.refresh_token.split(".")[1]);
      const { exp } = JSON.parse(payload) as {exp: number};

      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      this.$cookies.set(REFRESH_TOKEN_COOKIE, data.refresh_token, {
        path: "/",
        expires: new Date(exp * 1000)
      });
    } catch (e) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      this.$cookies.remove(REFRESH_TOKEN_COOKIE);
    }
  },

  clearAccount ({ commit }: ActionContext<IAccountState, IRootState>) {
    this.$cookies.remove(REFRESH_TOKEN_COOKIE);
    commit("clearAccount");
  },

  async localLogin ({ dispatch }: ActionContext<IAccountState, IRootState>, { username, password }: ILoginPayload) {
    const { data } = await this.$axios.post<ILoginResponse>(
      "/oauth/token",
      formUrlEncoded({
        username,
        password,
        grant_type: "password"
      }),
      { skipAuth: true }
    );

    return dispatch("setAccessToken", data)
      .then(() => dispatch("fetchAccount"));
  },

  refreshToken ({ dispatch }: ActionContext<IAccountState, IRootState>) {
    const refreshToken = this.$cookies.get(REFRESH_TOKEN_COOKIE);

    if (refreshToken && this.REFRESH_PROMISE === null) {
      this.REFRESH_PROMISE = this.$axios.post<ILoginResponse>(
        "/oauth/token",
        formUrlEncoded({ refresh_token: refreshToken, grant_type: "refresh_token" }),
        { skipAuth: true }
      )
        .then((res) => dispatch("setAccessToken", res.data))
        .catch(() => dispatch("clearAccount"))
        .finally(() => {
          this.REFRESH_PROMISE = null;
        });

      return this.REFRESH_PROMISE;
    } else if (this.REFRESH_PROMISE !== null) {
      return this.REFRESH_PROMISE;
    } else {
      return dispatch("clearAccount");
    }
  },

  async getAccessToken ({ getters, dispatch }: ActionContext<IAccountState, IRootState>) {
    const _getters = getters as {getAccessToken: IAccessToken};

    if (_getters.getAccessToken !== null && _getters.getAccessToken.expiresIn > Date.now() + 3600) {
      return _getters.getAccessToken.token;
    }

    try {
      await dispatch("refreshToken");
      return _getters.getAccessToken ? _getters.getAccessToken.token : null;
    } catch (e) {
      return null;
    }
  },

  getAccount () {
    return this.$axios.get<IAccount>("/api/v1/account")
      .then((res) => res.data);
  },

  async fetchAccount ({ dispatch, commit }: ActionContext<IAccountState, IRootState>) {
    try {
      commit("setAccount", await dispatch("getAccount"));
    } catch (e) {
      // Do nothing
    }
  }
};

export default actions;
