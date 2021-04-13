import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { Store } from "vuex";
import { boot } from "quasar/wrappers";
import { IRootState } from "src/store/root/state";

declare module "vue/types/vue" {
  interface Vue {
    $axios: AxiosInstance
  }
}

declare module "vuex/types/index" {
  interface Store<S> {
    $axios: AxiosInstance
    REFRESH_PROMISE: null | Promise<void>
  }
}

declare module "axios" {
  interface AxiosRequestConfig {
    skipAuth: boolean
  }
}

const requestInterceptor = (store: Store<IRootState>) => {
  return async (config: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
    if (config.skipAuth) {
      return config;
    }

    const headers = config.headers as {[key: string]: string};
    const accessToken = await store.dispatch("account/getAccessToken") as string | null;

    if (accessToken !== null) {
      headers.Authorization = `Bearer ${ accessToken }`;
    }

    return config;
  };
};

const createInstance = (store: Store<IRootState>) => {
  const instance = axios.create();

  instance.interceptors.request.use(requestInterceptor(store));

  if (process.env.SERVER) {
    instance.defaults.baseURL = process.env.SERVER ? process.env.SERVER_API_HOST : process.env.BROWSER_API_HOST;
  }

  return instance;
};

export default boot(({ app, Vue }) => {
  const instance = createInstance(app.store as Store<IRootState>);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  Vue.prototype.$axios = instance;

  if (app.store) {
    app.store.$axios = instance;
    app.store.REFRESH_PROMISE = null;
  }
});
