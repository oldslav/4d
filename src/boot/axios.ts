// eslint-disable-next-line @typescript-eslint/ban-ts-comment
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { Store } from "vuex";
import { boot } from "quasar/wrappers";
import qs from "qs";
import { GET_ACCESS_TOKEN } from "src/store/constants/action-constants";
import { LocalStorage } from "quasar";
import { TRootState } from "../store/types/root";

axios.defaults.baseURL = process.env.SERVER_API_HOST;

const paramsSerializerInterceptor = [
    (config: AxiosRequestConfig) => {
    config.paramsSerializer = (params: any): string => qs.stringify(params, {
      skipNulls: true,
      allowDots: true,
      arrayFormat: "comma"
    });

    return config;
  },
    (error: any) => Promise.reject(error)
];

const responseStatusInterceptor = [
  undefined,
  (error: { code: any; response: { status: number; }; }) => {
    error.code = error.response.status || 0;
    return Promise.reject(error);
  }
];

declare module "vue/types/vue" {
  interface Vue {
    $axios: AxiosInstance
  }
}

declare module "vuex/types/index" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Store<S> {
    $local: LocalStorage
    $axios: AxiosInstance
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


export default boot(({ app }) => {
  const axiosInstance = axios.create();

  const authInterceptor = requestInterceptor(app.store as Store<TRootState>);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  axiosInstance.interceptors.request.use(...paramsSerializerInterceptor);
  axiosInstance.interceptors.request.use(authInterceptor);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  axiosInstance.interceptors.response.use(...responseStatusInterceptor);

  app.store!.$axios = axiosInstance;

  if (app.store) {
    app.store.$local = LocalStorage;
  }
});
