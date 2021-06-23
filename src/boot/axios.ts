import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { Store } from "vuex";
import { boot } from "quasar/wrappers";
import { TRootState } from "../store/types/root";
import qs from "qs";
import { ACCESS_TOKEN_COOKIE, FETCH_ACCESS_TOKEN } from "src/store/constants/action-constants";
import { LocalStorage } from "quasar";

axios.defaults.baseURL = process.env.SERVER_API_HOST;
axios.interceptors.request.use(
  config => {
    config.paramsSerializer = (params: any): string => qs.stringify(params, {
      skipNulls: true,
      allowDots: true,
      arrayFormat: "comma"
    });

    return config;
  },

  error => Promise.reject(error)
);

declare module "vue/types/vue" {
  interface Vue {
    $axios: AxiosInstance
  }
}

declare module "vuex/types/index" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Store<S> {
    $axios: AxiosInstance
    REFRESH_PROMISE: null | Promise<void>
  }
}

declare module "vuex/types/index" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Store<S> {
    $local: LocalStorage
  }
}

declare module "axios" {
  interface AxiosRequestConfig {
    skipAuth?: boolean
  }
}

const requestInterceptor = (store: Store<any>) => {
  return async (config: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
    if (config.skipAuth) {
      return config;
    }

    const headers = config.headers as {[key: string]: string};
    const accessToken = store.getters.isAccessToken
      ? store.state.account.accessToken.token
      : store.$local.getItem(ACCESS_TOKEN_COOKIE);

    if (accessToken === null) {
      await store.dispatch(FETCH_ACCESS_TOKEN);
    }

    headers.Authorization = `Bearer ${ accessToken }`;

    return config;
  };
};

export default boot(({ app }) => {
  axios.interceptors.request.use(requestInterceptor(app.store as Store<TRootState>));
  if (app.store) {
    app.store.$local = LocalStorage;
  }
});
