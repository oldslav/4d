import { Module } from "vuex";

import { IRootState } from "../root/state";
import state, { IAccountState } from "./state";

import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

const accountModule: Module<IAccountState, IRootState> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
};

export default accountModule;
