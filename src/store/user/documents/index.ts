import { ActionContext, ActionTree, Module } from "vuex";
import { IRootState } from "src/store/types/root";
import { IDocumentsState } from "src/store/types/documents";

const state: IDocumentsState = {
  passport: null,
  snils: null,
  inn: null,
  workCertificate: null
};

const userDocuments: Module<IDocumentsState, IRootState> = {
  namespaced: true,
  state
};

export default userDocuments;
