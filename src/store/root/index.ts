import { TRootState } from "src/store/types/root";
import { ActionContext, ActionTree, MutationTree } from "vuex";
import {
  GET_ACCESS_TOKEN,
  GET_ACCOUNT,
  GET_REFERENCES,
  SERVER_INIT,
  DOWNLOAD_FILE
} from "src/store/constants/action-constants";

const state = (): TRootState => ({
  wait: process.env.SERVER ? {} : undefined
});

const mutations: MutationTree<TRootState> = {};

const actions: ActionTree<TRootState, TRootState> = {
  async [SERVER_INIT] ({ dispatch, rootGetters }: ActionContext<TRootState, TRootState>) {
    try {
      await dispatch(GET_ACCOUNT, null, { root: true });
    } catch (e) {
      // do nothing
    }

    if (rootGetters.isAuthenticated) {
      await dispatch(`references/${ GET_REFERENCES }`, null, { root: true });
    }
  },

  browserInit (/* context */) {
    // console.log('browserInit')
    // your code
  },

  bundleFiles ({ rootGetters }, { files, asNew = false }) {
    const result: any = [];
    Object.entries(files).forEach(([key, val]: any) => {
      val.forEach((file: any) => {
        const passed = !file.id || asNew;
        if (passed) {
          const type = rootGetters["references/getDocTypeByName"](key);
          const payload = new FormData();
          payload.append("file", file);
          payload.append("typeId", type.id);
          result.push(payload);
        }
      });
    });
    return Promise.resolve(result);
  },

  async loadFiles (_, documents: any[]) {
    const result: any = {};
    await Promise.all(documents.map(async (doc: any) => {
      const { imagePath, docType, fileName, id } = doc;
      const { data } = await this.service.common.getFile(imagePath);
      const file = new File([data], fileName, { type: data.type });
      Object.defineProperty(file, "id", {
        value: id,
        writable: true,
        enumerable: true,
        configurable: true
      });
      if (!result[docType.name]) {
        result[docType.name] = [];
      }
      result[docType.name].push(file);
    }));
    return Promise.resolve(result);
  },

  async [DOWNLOAD_FILE] ({ dispatch }, fileUrl) {
    const accessToken = await dispatch(GET_ACCESS_TOKEN, null, { root: true });

    const url = new URL(`${ process.env.SERVER_API_HOST }${ fileUrl }`);
    url.searchParams.append("access_token", accessToken);

    window.open(url.toString());
  }
};

export default { state, actions, mutations };
