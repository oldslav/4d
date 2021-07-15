// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { Store } from "vuex";
import { boot } from "quasar/wrappers";
import qs from "qs";
import { GET_ACCESS_TOKEN } from "src/store/constants/action-constants";
import { LocalStorage } from "quasar";
import { TRootState } from "../store/types/root";

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
  return async function (config: AxiosRequestConfig): Promise<AxiosRequestConfig> {
    if (config.skipAuth) {
      return config;
    }

    const accessToken = await store.dispatch(GET_ACCESS_TOKEN);

    if (accessToken !== null) {
      const headers = config.headers || {};

      return {
        ...config,
        headers: Object.assign({}, headers,{ Authorization : `Bearer ${ accessToken }` })
      };
    }

    return config;
  };
};


export default boot(({ app, ssrContext }) => {
  const interceptor = requestInterceptor(app.store as Store<TRootState>);

  const interceptorId = axios.interceptors.request.use(interceptor);

  if (app.store) {
    app.store.$local = LocalStorage;
  }

  if (process.env.SERVER) {
    ssrContext.res.on("finish", function () {
      axios.interceptors.request.eject(interceptorId);
    });
  }
});
