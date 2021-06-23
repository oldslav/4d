import { GetterTree } from "vuex";

import { TRootState } from "../types/root";
import { IAccountState } from "./state";

const getters: GetterTree<IAccountState, TRootState> = {
  getAccessToken (state: IAccountState) {
    return state.accessToken;
  },

  isAuthenticated (state: IAccountState) {
    return state.account !== null;
  },

  getAccount (state: IAccountState) {
    return state.account;
  }
};

export default getters;
